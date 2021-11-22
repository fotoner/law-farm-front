import axios from "axios";

const URL = "https://api.fotone.moe/v1" //.env로 바꾸기

const instance = axios.create({
  baseURL: `${URL}`,
  headers: { "Cache-Control": "no-cache" },
});

export default instance;
