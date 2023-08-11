import Axios from "axios";
//Endpoints

export const BASE_URL = "https://vod-api.superminds.dev/v1/";
export const appsApi = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

appsApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
