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
      return Promise.reject(error.response?.data); 
    }

    return Promise.reject('Internal server error'); 
  }
);

export default apiService;
