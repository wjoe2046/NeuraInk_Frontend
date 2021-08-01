import axios from "axios";

export const generateImage = async (filePath, filename) => {
  console.log("filepath: ", filePath);
  console.log("filename: ", filename);
  try {
    const response = await axios.post(
      "http://52.86.138.150:8000/process",
      {
        file_path: filePath,
        file_name: filename,
        bucket_name: "selene-amplify14031-staging",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (response.status === 200) {
      return {
        status: "success",
        data: response.data.data.object_url,
      };
    } else {
      return {
        return: "fail",
      };
    }
  } catch (err) {
    return {
      return: "fail",
    };
  }
};
