import axios from "axios";
import history from "./history";

const { VITE_TMDB_API_TOKEN, VITE_API_URL } = import.meta.env;

const instanceTmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${VITE_TMDB_API_TOKEN}`,
  },
});

export const instanceAPI = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

instanceAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      history.replace(`/?expired`);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instanceTmdb;
