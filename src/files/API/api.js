import axios from "axios";

export default class API {
  constructor() {
    this._phone = "";
  }

  static getShops() {
    return axios.get("https://zloi.space/restaurant/api/shops");
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
