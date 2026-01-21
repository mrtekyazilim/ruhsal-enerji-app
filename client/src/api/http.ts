import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api", // kernel URL
  withCredentials: true,
});

export default http;
