import axios from 'axios';

const axiosServices = axios.create({
  // separate for development and production environments
  baseURL: import.meta.env.VITE_BASE_URL,
});

//Intercept all the requests to enter updated token
axiosServices.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('serviceToken')) {
      config.headers.Authorization = localStorage.getItem('serviceToken');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Intercept all the responses to handle errors
// axiosServices.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     return error;
//   }
// );

export default axiosServices;
