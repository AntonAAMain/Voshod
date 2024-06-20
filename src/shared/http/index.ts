import axios from "axios";

export const apiBase = axios.create({
  baseURL: "https://test.taxivoshod.ru/api/test/",
});
