import axios from "axios";

export default class API {
  constructor() {
    this._phone = ""
  }

  static async getShops() {
    let res = await axios.get('https://zloi.space/restaurant/api/shops');
    if (res.status !== 200) {
      throw new Error('Ошибка получения меню')
    }
    return res
  }

  static async authByPassword(login, password) {
    let res = await axios.post(`https://zloi.space/restaurant/api/auth/password`, {
      login: login,
      password: password,
    });
    if (res.status !== 200) {
      throw new Error('Неверная пара логин/пароль')
    }
    return res
  }

  static async authByPhone(phone) {
    this._phone = phone
    let res = axios.post("https://zloi.space/restaurant/api/auth/phone", {
      phone: phone,
    });
    if (res.status !== 200) {
      throw new Error('Неудалось отправить СМС-код')
    }
    return res
  }

  static async authByCode(code) {
    return axios.post("https://zloi.space/restaurant/api/auth/code", {
      phone: this._phone,
      code: code,
    });
  }

  static authByOAuth(method) {
    window.open(`https://zloi.space/restaurant/api/oauth?method=${method}&device=web`, "", "width=700,height=500,left=200,top=200");
  }
}






