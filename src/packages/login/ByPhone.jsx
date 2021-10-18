import s from "./login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import API from "../../files/API/api.js";
import InputPhone from "./InputPhone.jsx";
import InputCode from "./InputCode.jsx";

import vkIco from "../../files/img/token/vk.png";
import yandexIco from "../../files/img/token/ya.png";
import googleIco from "../../files/img/token/gog.png";

export default function ByPhone(props) {
  const [phone, setPhone] = useState("8(___)___-__-__");
  const [code, setCode] = useState("____");
  // move isPhoneWrong and isCodeWrong in child component
  const [isPhoneWrong, setPhoneWrong] = useState(false);
  const [isCodeWrong, setCodeWrong] = useState(false);
  const [inputType, setInputType] = useState("Phone");
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function sendPhoneNumber() {
    if (phone.indexOf("_") !== -1) {
      setPhoneWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: "Wrong phone number" });
    } else {
      let preparedPhone = phone.split("").filter((e) => !isNaN(Number(e)));
      preparedPhone = "+7" + preparedPhone.join("").slice(1);
      dispatch({ type: "SUCCESS_MESSAGE", payload: "Checking phone" });
      API.authByPhone(preparedPhone)
        .then((res) => {
          setInputType("Code");
          dispatch({ type: "SUCCESS_MESSAGE", payload: "Code sent" });
        })
        .catch((err) => {
          dispatch({ type: "ERROR_MESSAGE", payload: err.message });
        });
    }
  }

  function sendCode() {
    if (code.indexOf("_") !== -1) {
      setCodeWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: "Wrong code" });
    } else {
      API.authByCode(code)
        .then((res) => {
          console.log("Your token is " + res.data.token);
          dispatch({ type: "LOAD_PROFILE" });
          dispatch({ type: "SUCCESS_MESSAGE", payload: "Code confirmed" });
          props.setShowLogin(false);
        })
        .catch((err) => {
          setCodeWrong(true);
          dispatch({ type: "ERROR_MESSAGE", payload: err.message });
        });
    }
  }

  function getAnswerToken(method) {
    API.authByOAuth(method);
    props.setLoginForm("Wait");
  }

  return (
    <div className={s.afterName}>
      <div className={s.firstLine}>
        <div className={s.numberOrCodeBox}>
          {inputType === "Phone" ? (
            <InputPhone
              phone={phone}
              setPhone={setPhone}
              isPhoneWrong={isPhoneWrong}
              setPhoneWrong={setPhoneWrong}
              sendPhoneNumber={sendPhoneNumber}
            />
          ) : (
            <InputCode
              code={code}
              setCode={setCode}
              isCodeWrong={isCodeWrong}
              setCodeWrong={setCodeWrong}
              sendCode={sendCode}
            />
          )}
        </div>
        <p
          className={s.loginBtn}
          onClick={inputType === "Phone" ? sendPhoneNumber : sendCode}
        >
          Next
        </p>
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
