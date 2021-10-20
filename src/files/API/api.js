import axios from "axios";

export default class API {
  constructor() {
    this._phone = "";
  }

  static getPoints() {
    return axios.get("https://zloi.space/restaurant/api/point");
  }

  static getCategory(id_point) {
    let localToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsImlhdCI6MTYzNDc1NTE4NSwiZXhwIjoxNjM1NjE5MTg1fQ.ecNPT9XnwDwXParo2ElflxCmu_r5n-nLLwtk0Nr6jHs";
    return axios.get("https://zloi.space/restaurant/api/menu/category", {
      headers: { Authorization: `Bearer ${localToken}` },
      params: { id_point: id_point },
    });
  }

  static getMenu(page, per_page, id_point) {
    return axios.get("https://zloi.space/restaurant/api/menu", {
      params: { page: page, "per-page": per_page, id_point: id_point },
    });
  }

  static authByPassword(login, password) {
    return axios.post(`https://zloi.space/restaurant/api/auth/password`, {
      login: login,
      password: password,
    });
  }

  static authByPhone(phone) {
    this._phone = phone;
    return axios.post("https://zloi.space/restaurant/api/auth/phone", {
      phone: phone,
    });
  }

  static authByCode(code) {
    return axios.post("https://zloi.space/restaurant/api/auth/code", {
      phone: this._phone,
      code: code,
    });
  }

  static authByOAuth(method) {
    window.open(
      `https://zloi.space/restaurant/api/oauth?method=${method}&device=web`,
      "",
      "width=700,height=500,left=200,top=200"
    );
  }

  static getProfile(token) {
    return axios.get("https://zloi.space/restaurant/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
