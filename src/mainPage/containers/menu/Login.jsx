import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authorization } from "../../../files/API/api.js";
import vkIco from "../../../files/img/token/vk.png";
import yandexIco from "../../../files/img/token/ya.png";
import googleIco from "../../../files/img/token/gog.png";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState("Phone");
  const dispatch = useDispatch();

  function getAnswer() {
    authorization(login, password)
      .then((data) => dispatch({ type: "LOGIN_CONFIRM", payload: data }))
      .catch((error) =>
        console.log(error.response.status + " " + error.response.statusText)
      );
  }

  switch (loginForm) {
    case "Phone":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
            <div className={s.loginDialog}>
              <div className={s.naming}>Вход в учетную запись</div>
              <div className={s.afterName}>
                <div className={s.flexbox}>
                  <input
                    name={"Phone"}
                    placeholder=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <button
                    className={s.loginBtn}
                    onClick={() => console.log("not work yet")}
                  >
                    Login
                  </button>
                </div>
                <button
                  className={s.loginByPassLink}
                  onClick={() => setLoginForm("Password")}
                >
                  Sign in by password
                </button>
                <div className={s.loginByToken}>Sign in with:</div>
                <div className={s.tokenImg}>
                  <div>
                    <img src={vkIco} alt={"Vk"} />
                  </div>
                  <div>
                    <img src={yandexIco} alt={"Yandex"} />
                  </div>
                  <div>
                    <img src={googleIco} alt={"Google"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "Password":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
            <div className={s.loginDialog}>
              <div className={s.naming}>Вход в учетную запись</div>
              <div className={s.afterName}>
                <div className={s.flexbox}>
                  <input
                    name={"Phone"}
                    placeholder=""
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <button className={s.loginBtn} onClick={() => getAnswer()}>
                    Login
                  </button>
                </div>
                <input
                  className={s.passwordInput}
                  name={"Phone"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={s.loginByPassLink}
                  onClick={() => setLoginForm("Phone")}
                >
                  Sign in by phone
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <span>How did you get this?</span>;
  }
}
