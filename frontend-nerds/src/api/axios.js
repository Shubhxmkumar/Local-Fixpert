import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  withCredentials: true, // send cookies for JWT auth
});

export default api;
