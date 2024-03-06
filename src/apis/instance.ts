import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_DOMAIN
    : process.env.REACT_APP_PROD_DOMAIN;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<any>) => {
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

export const axiosPublic = axios.create({
  baseURL,
});

axiosPublic.interceptors.response.use(
  (res: AxiosResponse) => {
    const responseBody = res.data;
    const requestUrl = res.config.url;

    // console.log('Request URL:', requestUrl);
    // console.log('Response Body:', responseBody);
    return res;
  },
  (error: AxiosError<unknown>) => {
    return Promise.reject(error);
  },
);
