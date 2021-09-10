import s from "./login.module.css";
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
import InputPhone from "./InputPhone.jsx";
import InputCode from "./InputCode.jsx";

export default function ByPhone(props) {
  const [phone, setPhone] = useState("8(___)___-__-__");
  const [code, setCode] = useState("____");
  const [isCodeWrong, setCodeWrong] = useState(false);
  const [inputType, setInputType] = useState("Phone");
  const dispatch = useDispatch();
  const popupDispatch = useDispatchPopup();

  function getAnswerPhone() {
    if (phone.length > 4) {
      authByPhone(phone)
        .then((data) => {
          dispatch({ type: "LOGIN_CONFIRM", payload: data });
          popupDispatch({ type: "POPUP", payload: "Code sent" });
          setInputType("Code");
          setPhone("");
        })
        .catch((error) => {
          let answer = error.response.status + " " + error.response.statusText;
          popupDispatch({ type: "ERROR", payload: answer });
        });
    }
    if (phone.length <= 4) {
      authPhoneCode(phone, code)
        .then((data) => {
          dispatch({ type: "LOGIN_CONFIRM", payload: data });
          popupDispatch({ type: "POPUP", payload: "code confirmed" });
        })
        .catch((error) => {
          let answer = error.response.status + " " + error.response.statusText;
          popupDispatch({ type: "ERROR", payload: answer });
          setCodeWrong(true);
        });
    }
  }

  function getAnswerToken(method) {
    dispatch({ type: "SET_METHOD_TOKEN", payload: method });
    authByToken(method);
    props.setLoginForm("Wait");
  }

  return (
    <div className={s.afterName}>
      <div className={s.flexbox}>
        <div className={s.numberOrCodeBox}>
          {inputType === "Phone" ? (
            <InputPhone
              phone={phone}
              setPhone={setPhone}
              getAnswerPhone={getAnswerPhone}
            />
          ) : (
            <InputCode
              code={code}
              setCode={setCode}
              isCodeWrong={isCodeWrong}
              setCodeWrong={setCodeWrong}
              getAnswerPhone={getAnswerPhone}
            />
          )}
        </div>
        <button className={s.loginBtn} onClick={getAnswerPhone}>
          Next
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
          <img src={vkIco} alt={"Vk"} onClick={() => getAnswerToken("vk")} />
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
  );
}
