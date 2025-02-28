import axios from "axios";

// console.log(`API URL: ${import.meta.env.VITE_API_URL}`);

// Use the VITE_API_URL from the environment variables
const axiosInstance = axios.create({
  // Automatically reads the environment variable
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceAlbum = axios.create({
  baseURL:
    import.meta.env.VITE_ALBUM_API_URL ||
    "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceFile = axios.create({
  baseURL: import.meta.env.VITE_FILE_API_URL || "http://localhost:4000",
});
// //GET request function
// export const getRequest = (url) => {
//   return axiosInstance.get(url);
// };

// //POST request function
// export const postRequest = async (url,requestedData) => {
//   return await axiosInstance.post(url, requestedData );
// }

// //PUT request function
// export const putRequest = async (url,todo) => {
//   return await axiosInstance.put(url,todo);
// }

// //DELETE request function
// export const deleteRequest = async (id) => {
//   return await axiosInstance.delete(id);
// }

const apiFile = {
  post: async (url, file) => {
    const response = await axiosInstanceFile.post(url, file);
    return response.data;
  },
};

const apiAlbum = {
  get: async (url) => await axiosInstanceAlbum.get(url),
};

const api = {
  get: async (url) => await axiosInstance.get(url),
  post: async (url, data) => await axiosInstance.post(url, data),
  put: async (url, data) => await axiosInstance.put(url, data),
  delete: async (url) => {
    // console.error(url);
    return await axiosInstance.delete(url);
  },
};

// export default axiosInstance;
export default api;

export { apiAlbum, apiFile };
