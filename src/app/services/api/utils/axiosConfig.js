import axios from "axios";

// console.log(`API URL: ${import.meta.env.VITE_API_URL}`);

// Use the VITE_API_URL from the environment variables
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Automatically reads the environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

//GET request function
export const getRequest = () => {
  return axiosInstance.get('/todos');
};

//POST request function
export const postRequest = async (url,requestedData) => {
  return await axiosInstance.post(url, requestedData );
}

//PUT request function
export const putRequest = async (url,todo) => {
  return await axiosInstance.put(url,todo);
}

//DELETE request function
export const deleteRequest = async (id) => {
  return await axiosInstance.delete(id);
}

export default axiosInstance;


