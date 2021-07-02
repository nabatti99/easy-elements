import axios from "axios";

const instance = axios.create({
  baseURL: "https://learning-easy-661d1.firebaseio.com/",
  timeout: 180000,
  headers: {
    "crossDomain": true,
    "Content-Type": "application/json"
  }
});

export default instance;