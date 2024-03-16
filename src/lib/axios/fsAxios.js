import axios from "axios";
import { fsSecretKey } from "../../consts";
const fsAxios = axios.create({
  baseURL: import.meta.env.VITE_FS_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: fsSecretKey(),
  },
});

export default fsAxios;
