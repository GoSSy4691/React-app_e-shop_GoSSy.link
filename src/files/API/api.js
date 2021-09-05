import axios from "axios";

export function authByPass(login, password) {
  return axios.post("https://zloi.space/restaurant/api/auth/password", {
    login: login,
    password: password,
  });
}

export function getMenuData() {
  return axios.get("https://zloi.space/restaurant/api/shops");
}
