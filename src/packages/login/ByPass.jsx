import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authByPass } from "../../files/API/api.js";
import useDispatchPopup from "../popup/dispatchPopup.js";
import eye_show from "../../files/img/visible_show.png";
import eye_hide from "../../files/img/visible_hide.png";

export default function ByPass(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPassShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const popupDispatch = useDispatchPopup();

  function getAnswerPass() {
    authByPass(login, password)
      .then(() => {
        dispatch({ type: "token", payload: "you log in by password" });
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
                className={s.loginForm}
                name={"Login"}
                autoFocus
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyPress={(e) =>
                  e.nativeEvent.key === "Enter" ? getAnswerPass() : null
                }
              />
              <button className={s.loginBtn} onClick={getAnswerPass}>
                Login
              </button>
            </div>
            <input
              className={s.passwordInput}
              name={"Password"}
              placeholder="Password"
              type={isPassShow ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) =>
                e.nativeEvent.key === "Enter" ? getAnswerPass() : null
              }
            />
            <img
              alt={"showHideEye"}
              src={isPassShow ? eye_show : eye_hide}
              onClick={() => setPassShow(!isPassShow)}
              className={s.eyeInput}
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
