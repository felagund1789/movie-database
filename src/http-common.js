import axios from "axios";
import authHeader from "./auth-header";

export default axios.create({
  headers: Object.assign(
    {
      "Content-type": "application/json"
    },
    authHeader()
  )
});

export const httpUriList = axios.create({
  headers: Object.assign(
    {
      "Content-type": "text/uri-list"
    },
    authHeader()
  )
});
