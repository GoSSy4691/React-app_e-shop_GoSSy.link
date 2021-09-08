import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";
import useDispatchPopup from "../popup/dispatchPopup.js";

export default function Login() {
  const cookies = new Cookies();
  const popupDispatch = useDispatchPopup();
  const method = useSelector((state) => state.user.methodToken);
  const token = useSelector((state) => state.user.token);
  const [loginForm, setLoginForm] = useState(token ? "Logout" : "byPhone");

  function logoutBtn() {
    cookies.remove("token");
    popupDispatch({ type: "POPUP", payload: "log out confirmed" });
    setLoginForm("byPhone");
  }

  switch (loginForm) {
    case "byPhone":
      return <ByPhone setLoginForm={setLoginForm} />;
    case "byPass":
      return <ByPass setLoginForm={setLoginForm} />;
    case "Wait":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={patternCSS.activeBox}>
            <div className={s.loginDialog}>
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
            <div className={s.loginDialog}>
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
