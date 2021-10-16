import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../useDetectClickOut.js";
import API from "../../files/API/api.js";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";

export default function Login(props) {
  const token = useSelector((state) => state.user.token);
  const [loginForm, setLoginForm] = useState(token ? "Logout" : "byPhone");
  const refLogin = useDetectClickOut(props.isShowLogin, props.setShowLogin);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function logoutBtn() {
    dispatch({ type: "SUCCESS_MESSAGE", payload: "log out confirmed" });
    dispatch({ type: "LOGOUT_CONFIRM" });
    props.setShowLogin(false);
  }

  function closeAndRefresh() {
    if (cookies.get("Token") !== undefined) {
      dispatch({ type: "LOGIN_CONFIRM", payload: cookies.get("Token") });
      props.setShowLogin(false);
    } else {
      setLoginForm("byPhone");
    }
  }

  // if (token.length > 0) {
  //   API.getProfile(token).then((res) => {
  //     console.log(res.data);
  //   });
  // }

  switch (loginForm) {
    case "byPhone":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPhone
              setLoginForm={setLoginForm}
              setShowLogin={props.setShowLogin}
            />
          </div>
        </div>
      );
    case "byPass":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPass setLoginForm={setLoginForm} />
          </div>
        </div>
      );
    case "Wait":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <div className={s.afterName}>
              <div className={s.flexbox}>
                <div className={s.afterToken}>
                  Please verify your profile in new window
                </div>
                <button className={s.loginBtn} onClick={closeAndRefresh}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case "Logout":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <div className={s.afterName}>
              <div className={s.token}> Your token is </div>
              <div className={s.token}> {token} </div>
              <div className={s.flexbox}>
                <div className={s.afterToken}>To logout press the button</div>
                <button className={s.loginBtn} onClick={logoutBtn}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
