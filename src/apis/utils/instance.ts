import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_DOMAIN
    : process.env.REACT_APP_DEV_DOMAIN;
console.log(baseURL,'url------------')
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<any>) => {
    console.log(error);

    return Promise.reject(error);
  },
);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
