import axios from "axios";
const axiosClient = axios.create({
  baseURL: `http://localhost:4000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["X-JWT-auth-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
      window.location.href = "/login";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
