import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';

class Http {

    static baseUrl = ''

    async request(url: string, config: Object, loadingTip?:string, baseUrl?:string) {
        config = Object.assign({
            headers: {}
        }, config);


        url = (baseUrl?baseUrl:Http.baseUrl) + url;
        const response = await fetch(url, config).catch(err => console.warn(err));
        var res = await this.parseResult(response, baseUrl?.includes("3.92.49.14"));
        return res
    }
    timeout(time = 60) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 500
                })
            }, time * 1000)
        })
    }
    async parseResult(response: any, print=false) {
        
        
        if (response?.status != 200) return this.handleError();
        
        const contentType = response.headers.get('Content-Type');

        if (contentType.indexOf('application/json') != -1) {
            let ret = await response.json();
            if (ret.errorNo === 0) {
                return ret;
            } else {
                return this.handleError(ret);
            }
        } else {
            return await response.text();
        }
    }
    handleError(errRes?: any) {
        let errorNo = errRes?.errorNo || 500;
        let errorDesc = errRes?.errorDesc || errRes?.message || 'System is busy';
        
        console.error(errorDesc);
        
        return { errorNo, errorDesc }
    }
    get(url: string, data?: object, baseUrl?:string) {
        if (data) {
            url = `${url}?${qs.stringify(data)}`;
        }
        return this.request(url, {}, undefined, baseUrl);
    }
    post(url: string, data?: object, loadingTip?: string, baseUrl?:string) {
        return this.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
        }, loadingTip, baseUrl)
    }
    postForm(url: string, data?: object, loadingTip?: string, baseUrl?:string) {
        return this.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data ? qs.stringify(data) : null,
        }, loadingTip, baseUrl)
    }
    put(url: string, data?: object, loadingTip?: string) {
        return this.request(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? qs.stringify(data) : null,
        }, loadingTip);
    }
    delete(url: string, data: object | undefined, loadingTip?: string) {
        return this.request(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? qs.stringify(data) : null,
        }, loadingTip);
    }
}
export default new Http();