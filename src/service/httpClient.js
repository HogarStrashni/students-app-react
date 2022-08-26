import axios from "axios";
import { authInterceptor } from "./auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL_PATH}`,
});

axiosInstance.interceptors.request.use(authInterceptor, (error) =>
  Promise.reject(error)
);

export default axiosInstance;
