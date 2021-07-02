import axios from "axios";

const instance = axios.create({
  baseURL: "https://cors-anywhere-server-nabatti99.herokuapp.com/https://artlist.io/api/",
  timeout: 180000,
  headers: {
    "x-requested-with": "*",
    "permit-by-nabatti99": "true"
  }
});

export default instance;