import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {

    console.log("Hola soy el error:",error)

    if (error.response.status === 401 || error.response.status === 403) {
        console.log("Lo lees:?")
      localStorage.clear();
      window.location.href="/login"
    }
    return Promise.reject(error);
  }
);
