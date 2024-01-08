import axios, { AxiosError, AxiosResponse } from "axios";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3000/api/v1";
} else {
  baseURL = "https://boolmung-api-v1-hs.koyeb.app/api/v1";
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<any>) => {
    console.log(error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
