import axios from "axios";

const URL = "http://api.fotone.moe:8000/v1" //.env로 바꾸기

const instance = axios.create({
  baseURL: `${URL}`,
})

export default instance;