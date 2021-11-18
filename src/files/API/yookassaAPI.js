import axios from "axios";

export default class yookassaAPI {
  static paymentStatus(paymentId) {
    return axios.get("https://api.yookassa.ru/v3/payments/" + paymentId, {
      // withCredentials: true,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Access-Control-Allow-Credentials": false,
        // "Origin": "http://yandex.ru"
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        'Access-Control-Allow-Headers': 'application/x-www-form-urlencoded'
      },
      // "crossdomain": true,
      // proxy: {
      //   host: '104.236.174.88',
      //   port: 3128
      // },
      auth: {
        username: "54401",
        password: "test_Fh8hUAVVBGUGbjmlzba6TB0iyUbos_lueTHE-axOwM0",
      },
    });
  }
}
