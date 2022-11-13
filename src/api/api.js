import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.response.use(
  function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log("Hola soy el error:",error)

    if (error.response.status == 401 || error.response.status == 403) {
        console.log("Lo lees:?")
      localStorage.clear();
      window.location.href="/login"
    }
    return Promise.reject(error);
  }
);
