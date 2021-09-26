import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";
import useDetectClickOut from "../useDetectClickOut.js";

export default function Login(props) {
  const dispatch = useDispatch();
  const method = useSelector((state) => state.user.methodToken);
  const token = useSelector((state) => state.user.token);
  const [loginForm, setLoginForm] = useState(token ? "Logout" : "byPhone");
  const refLogin = useDetectClickOut(props.isShowLogin, props.setShowLogin);

  function logoutBtn() {
    dispatch({ type: "SUCCESS_MESSAGE", payload: "log out confirmed" });
    dispatch({ type: "LOGOUT_CONFIRM" });
    props.setShowLogin(false);
  }

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
                <div className={s.afterToken}>Log in by {method}</div>
                <button
                  className={s.loginBtn}
                  onClick={() => setLoginForm("Logout")}
                >
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
