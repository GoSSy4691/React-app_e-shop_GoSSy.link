import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authByPass } from "../../../files/API/api.js";
import vkIco from "../../../files/img/token/vk.png";
import yandexIco from "../../../files/img/token/ya.png";
import googleIco from "../../../files/img/token/gog.png";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState("byPhone");
  const dispatch = useDispatch();

  function getAnswerPass() {
    authByPass(login, password)
      .then((data) => dispatch({ type: "LOGIN_CONFIRM", payload: data }))
      .catch((error) => {
        let answer = error.response.status + " " + error.response.statusText;
        dispatch({ type: "ERROR", payload: answer });
        setTimeout(() => {
          dispatch({ type: "ERROR_CLEAN" });
        }, 4000);
      });
  }

  function getAnswerPhone() {
    dispatch({
      type: "ERROR",
      payload: "Not work yet. Try log in by password",
    });
    setTimeout(() => {
      dispatch({ type: "ERROR_CLEAN" });
    }, 4000);
  }

  function getAnswerToken() {
    dispatch({
      type: "ERROR",
      payload: "Not work yet. Try log in by password",
    });
    setTimeout(() => {
      dispatch({ type: "ERROR_CLEAN" });
    }, 4000);
  }

  switch (loginForm) {
    case "byPhone":
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
                  <button className={s.loginBtn} onClick={getAnswerPhone}>
                    Login
                  </button>
                </div>
                <button
                  className={s.loginByPassLink}
                  onClick={() => setLoginForm("byPassword")}
                >
                  Sign in by password
                </button>
                <div className={s.loginByToken}>Sign in with:</div>
                <div className={s.tokenImg}>
                  <div>
                    <img src={vkIco} alt={"Vk"} onClick={getAnswerToken} />
                  </div>
                  <div>
                    <img
                      src={yandexIco}
                      alt={"Yandex"}
                      onClick={getAnswerToken}
                    />
                  </div>
                  <div>
                    <img
                      src={googleIco}
                      alt={"Google"}
                      onClick={getAnswerToken}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "byPassword":
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
                  <button className={s.loginBtn} onClick={getAnswerPass}>
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
                  onClick={() => setLoginForm("byPhone")}
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
