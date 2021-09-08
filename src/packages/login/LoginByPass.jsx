import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authByPass } from "../../files/API/api.js";
import { useDispatchPopup } from "../popup/dispatchPopup.js";

export default function LoginByPass(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
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
              onClick={() => props.setLoginForm("byPhone")}
            >
              Sign in by phone
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
