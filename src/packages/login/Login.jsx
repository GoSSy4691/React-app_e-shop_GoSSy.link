import { useState } from "react";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import LoginByPass from "./LoginByPass.jsx";
import LoginByPhone from "./LoginByPhone.js";
import useDispatchPopup from "../popup/dispatchPopup.js";
import patternCSS from "../pattern.module.css";
import s from "./login.module.css";

export default function Login() {
  const cookies = new Cookies();
  const popupDispatch = useDispatchPopup();
  const method = useSelector((state) => state.user.methodToken);
  const token = useSelector((state) => state.user.token);
  const [loginForm, setLoginForm] = useState(token ? "Logout" : "byPhone");
  console.log(token);

  function logoutBtn() {
    cookies.remove("token");
    popupDispatch({ type: "POPUP", payload: "log out confirmed" });
    setLoginForm("byPhone");
  }

  switch (loginForm) {
    case "byPhone":
      return <LoginByPhone setLoginForm={setLoginForm} />;
    case "byPass":
      return <LoginByPass setLoginForm={setLoginForm} />;
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
