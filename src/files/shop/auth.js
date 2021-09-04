import axios from "axios";

let answer = "";

export default async function auth(login, password) {
  if (answer.length === 0) {
    await axios
      .post("https://zloi.space/restaurant/api/auth/password", {
        login: login,
        password: password,
      })
      .then((res) => {
        answer = res.data;
        return answer;
      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response.status);
          // console.log(error.response.statusText);
          return error.response.status + " " + error.response.statusText;
        }
      });
  }
  return answer;
}
