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
export const postRequest = (requestedData) => {
  return axiosInstance.post("/todos", requestedData );
}

//PUT request function
export const putRequest = (todo) => {
  return axiosInstance.put(`/todos/${todo.id}`, todo );
}

//DELETE request function
export const deleteRequest = (id) => {
  return axiosInstance.delete(`/todos/${id}`);
}

export default axiosInstance;


