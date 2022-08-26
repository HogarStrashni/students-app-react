import axiosInstance from "./httpClient";

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
    .catch((err) => console.log(err.message));
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
    .catch((err) => console.log(err.message));
};

export const logoutUser = () => (token = null);

export const authInterceptor = (req) => {
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
};
