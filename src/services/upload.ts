import http from './http';

export async function convertPic(data: any) {
  // Example data:
  // {
  //   "file_path": "testphotos/",
  //   "file_name": "IMG_3667.JPG",
  //   "bucket_name": "amplify-amplifyeea5c332afdb4-staging-14031-deployment"
  // }
  return await http.post('/process', data)

  // example result
  // {
  //   "message": "CycleGan Success",
  //   "error": false,
  //   "success": true,
  //   "data": {
  //       "s3_url": "s3://neurainkapp/result/IMG_9059_real.png",
  //       "object_url": "https://neurainkapp.s3.amazonaws.com/result/IMG_9059_real.png"
  //   }
  // }
}
