import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  authByPhone,
  authPhoneCode,
  authByToken,
} from "../../files/API/api.js";
import useDispatchPopup from "../popup/dispatchPopup.js";
import vkIco from "../../files/img/token/vk.png";
import yandexIco from "../../files/img/token/ya.png";
import googleIco from "../../files/img/token/gog.png";

export default function ByPhone(props) {
  const [phoneCode, setPhoneCode] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [placeholderPhone, setPlaceholderPhone] = useState("Phone");
  const dispatch = useDispatch();
  const popupDispatch = useDispatchPopup();

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
    dispatch({ type: "SET_METHOD_TOKEN", payload: method });
    authByToken(method);
    props.setLoginForm("Wait");
  }

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
                type={"tel"}
                onChange={(e) => setPhoneCode(e.target.value)}
              />
              <button className={s.loginBtn} onClick={getAnswerPhone}>
                Login
              </button>
            </div>
            <button
              className={s.loginByPassLink}
              onClick={() => props.setLoginForm("byPass")}
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
}
