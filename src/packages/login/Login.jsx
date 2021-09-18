import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";
import useDetectClickOut from "../useDetectClickOut.js";

export default function Login(props) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const method = useSelector((state) => state.user.methodToken);
  const token = useSelector((state) => state.user.token);
  const [loginForm, setLoginForm] = useState(token ? "Logout" : "byPhone");
  const refLogin = useDetectClickOut(props.isShowLogin, props.setShowLogin);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "POPUP_CLEAN" });
    }, 4000);
  });

  function logoutBtn() {
    cookies.remove("token");
    dispatch({ type: "POPUP", payload: "log out confirmed" });
    setLoginForm("byPhone");
  }

  switch (loginForm) {
    case "byPhone":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
            <div className={s.loginDialog} ref={refLogin}>
              <div className={s.naming}>Вход в учетную запись</div>
              <ByPhone setLoginForm={setLoginForm} />
            </div>
          </div>
        </div>
      );
    case "byPass":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
            <div className={s.loginDialog} ref={refLogin}>
              <div className={s.naming}>Вход в учетную запись</div>
              <ByPass setLoginForm={setLoginForm} />
            </div>
          </div>
        </div>
      );
    case "Wait":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
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
        </div>
      );
    case "Logout":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
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
        </div>
      );
    default:
      return null;
  }
}
