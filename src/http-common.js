import axios from "axios";

export default axios.create({
  headers: Object.assign({ "Content-type": "application/json" })
});

export const httpUriList = axios.create({
  headers: Object.assign({ "Content-type": "text/uri-list" })
});
