import s from "./login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import zloiAPI from "../../../files/API/zloiAPI.js";

import eye_show from "../../../files/img/visible_show.png";
import eye_hide from "../../../files/img/visible_hide.png";

export default function ByPass() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPassWrong, setPassWrong] = useState(false);
  const [isPassShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { t } = useTranslation();

  function getAnswerPass() {
    dispatch({
      type: "SHOW_MESSAGE",
      payload: t("Loading"),
      color: "green",
    });
    zloiAPI
      .authByPassword(login, password)
      .then((res) => {
        console.log("You token is " + res.data.token);
        dispatch({
          type: "SHOW_MESSAGE",
          payload: t("Log in confirmed"),
          color: "green",
        });
        cookies.set("Token", res.data.token, { path: "/" });
        dispatch({ type: "PROFILE_DIALOG_SHOW" });
        dispatch({ type: "LOAD_PROFILE" });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: "SHOW_MESSAGE",
          payload: t("login / password don't match"),
          color: "red",
        });
      });
  }

  function loginValidation(event) {
    setPassWrong(false);
    setLogin(event);
  }

  function passwordValidation(event) {
    setPassWrong(false);
    setPassword(event);
  }

  return (
    <div className={s.afterName}>
      <div className={s.firstLine}>
        <input
          name={"Login"}
          className={s.loginInput}
          style={isPassWrong ? { color: "red" } : null}
          autoFocus
          placeholder={t("Login")}
          value={login}
          onChange={(e) => loginValidation(e.target.value)}
          onKeyPress={(e) => e.nativeEvent.key === "Enter" && getAnswerPass()}
        />
      </div>
      <div className={s.passwordLine}>
        <input
          name={"Password"}
          className={s.passwordInput}
          style={isPassWrong ? { color: "red" } : null}
          placeholder={t("Password")}
          type={isPassShow ? "text" : "password"}
          value={password}
          onChange={(e) => passwordValidation(e.target.value)}
          onKeyPress={(e) => e.nativeEvent.key === "Enter" && getAnswerPass()}
        />
        <button tabIndex="-1">
          <img
            alt={"showHideEye"}
            src={isPassShow ? eye_show : eye_hide}
            className={s.eyeInput}
            onMouseDown={() => setPassShow(true)}
            onMouseUp={() => setPassShow(false)}
            draggable="false"
          />
        </button>
      </div>
      <button
        className={`${s.loginBtn} ${s.loginBtnPass}`}
        onClick={getAnswerPass}
      >
        {t("Sign in")}
      </button>
      <button
        className={s.loginByPassLink}
        onClick={() =>
          dispatch({ type: "PROFILE_DIALOG_STATE", payload: "byPhone" })
        }
      >
        {t("Sign in by phone")}
      </button>
    </div>
  );
}
