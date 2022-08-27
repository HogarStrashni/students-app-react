import axios from "axios";
import { getAuthToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL_PATH}`,
});

const authInterceptor = (req) => {
  const token = getAuthToken();
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
};

axiosInstance.interceptors.request.use(authInterceptor, (error) =>
  Promise.reject(error)
);

export default axiosInstance;
