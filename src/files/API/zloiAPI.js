import axios from "axios";

export default class zloiAPI {
  constructor() {
    this._phone = "";
  }

  static getPoints() {
    return axios.get("https://zloi.space/restaurant/api/point");
  }

  static getCategory(id_point) {
    return axios.get("https://zloi.space/restaurant/api/menu/category", {
      params: { id_point: id_point },
    });
  }

  static getMenu(page, per_page, id_point) {
    return axios.get("https://zloi.space/restaurant/api/menu", {
      params: {
        page: page,
        "per-page": per_page,
        expand: "category",
        "category.id_point": id_point,
      },
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

  static getUsers(token) {
    return axios.get("https://zloi.space/restaurant/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static getOrders(token) {
    return axios.get("https://zloi.space/restaurant/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
      params: { expand: "user,content,content.menu,payments" },
    });
  }

  static deleteOrder(token, order_id) {
    return axios.delete(
      "https://zloi.space/restaurant/api/orders/" + order_id,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static createOrder(token, order) {
    return axios.post("https://zloi.space/restaurant/api/orders", order, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}
