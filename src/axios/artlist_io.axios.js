import axios from "axios";

const instance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://artlist.io/api",
  timeout: 10000,
  headers: {
    "crossDomain": true,
    "Content-Type": "application/json"
  }
});

export default instance;