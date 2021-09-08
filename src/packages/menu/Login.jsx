import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  authByPass,
  authByPhone,
  authPhoneCode,
  authByToken,
} from "../../files/API/api.js";
import { useDispatchPopup } from "../popup/dispatchPopup.js";
import vkIco from "../../files/img/token/vk.png";
import yandexIco from "../../files/img/token/ya.png";
import googleIco from "../../files/img/token/gog.png";

export default function Login() {
  const [phoneCode, setPhoneCode] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [placeholderPhone, setPlaceholderPhone] = useState("Phone");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState("byPhone");
  const dispatch = useDispatch();
  const popupDispatch = useDispatchPopup();

  function getAnswerPass() {
    authByPass(login, password)
      .then((data) => {
        dispatch({ type: "LOGIN_CONFIRM", payload: data });
        popupDispatch({ type: "POPUP", payload: "log in confirmed" });
      })
      .catch((error) => {
        let answer = error.response.status + " " + error.response.statusText;
        popupDispatch({ type: "ERROR", payload: answer });
      });
  }

  function getAnswerPhone() {
    if (phoneCode.length > 4) {
      setSavedPhone(phoneCode);
      authByPhone(savedPhone)
        .then((data) => {
          dispatch({ type: "LOGIN_CONFIRM", payload: data });
          popupDispatch({ type: "POPUP", payload: "Code sent" });
          setPlaceholderPhone("Code");
          setPhoneCode("");
        })
        .catch((error) => {
          let answer = error.response.status + " " + error.response.statusText;
          popupDispatch({ type: "ERROR", payload: answer });
        });
    }
    if (phoneCode.length <= 4) {
      authPhoneCode(savedPhone, phoneCode)
        .then((data) => {
          dispatch({ type: "LOGIN_CONFIRM", payload: data });
          popupDispatch({ type: "POPUP", payload: "code confirmed" });
        })
        .catch((error) => {
          let answer = error.response.status + " " + error.response.statusText;
          popupDispatch({ type: "ERROR", payload: answer });
        });
    }
  }

  function getAnswerToken(method) {
    // authByToken(method).then((data) => console.log(data));
    let url =
      "https://zloi.space/restaurant/api/oauth?method=" +
      method +
      "&device=web";
    window.open(url, "", "width=700,height=500,left=200,top=200");
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
                    placeholder={placeholderPhone}
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
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
                    <img
                      src={vkIco}
                      alt={"Vk"}
                      onClick={() => getAnswerToken("vk")}
                    />
                  </div>
                  <div>
                    <img
                      src={yandexIco}
                      alt={"Yandex"}
                      onClick={() => getAnswerToken("yandex")}
                    />
                  </div>
                  <div>
                    <img
                      src={googleIco}
                      alt={"Google"}
                      onClick={() => getAnswerToken("google")}
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
                    name={"Login"}
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <button className={s.loginBtn} onClick={getAnswerPass}>
                    Login
                  </button>
                </div>
                <input
                  className={s.passwordInput}
                  name={"Password"}
                  placeholder="Password"
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
