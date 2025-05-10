import axios from "axios";

const apiService = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return Promise.reject(error); 
  }
);

export default apiService;
