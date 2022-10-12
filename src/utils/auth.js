import axiosInstance from "../service/httpClient";

let token;

export const loginUser = (payload) => {
  return axiosInstance
    .post("/login", payload)
    .then((response) => {
      const logUser = response.data;
      token = logUser.token;
      delete logUser.token;
      return logUser;
    })
    .catch((error) => {
      console.log(error.message);
      return Promise.reject(error);
    });
};

export const registerUser = (payload) => {
  return axiosInstance
    .post("/register", payload)
    .then((response) => {
      const regUser = response.data;
      token = regUser.token;
      delete regUser.token;
      return regUser;
    })
    .catch((error) => {
      console.log(error.message);
      return Promise.reject(error);
    });
};

export const logoutUser = () => (token = null);

export const getAuthToken = () => token;
