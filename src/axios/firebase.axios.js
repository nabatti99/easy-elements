import axios from "axios";

const instance = axios.create({
  baseURL: "https://easy-elements-default-rtdb.asia-southeast1.firebasedatabase.app/",
  timeout: 180000,
  headers: {
    "crossDomain": true,
    "Content-Type": "application/json"
  }
});

export default instance;