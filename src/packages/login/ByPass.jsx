import s from "./login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import API from "../../files/API/api.js";
import eye_show from "../../files/img/visible_show.png";
import eye_hide from "../../files/img/visible_hide.png";

export default function ByPass(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPassWrong, setPassWrong] = useState(false);
  const [isPassShow, setPassShow] = useState(false);
  const dispatch = useDispatch();

  function getAnswerPass() {
    API.authByPassword(login, password)
      .then(() => {
        dispatch({ type: "SUCCESS_MESSAGE", payload: "log in confirmed" });
      })
      .catch(err => {
        // let answer = err.response.status + " " + err.response.statusText;
        popupDispatch({ type: "ERROR_MESSAGE", payload: err.message });
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
      <div className={s.flexbox}>
        <div className={s.leftBar}>
          <input
            name={"Login"}
            className={s.loginInput}
            style={isPassWrong ? { color: "red" } : null}
            autoFocus
            placeholder="Login"
            value={login}
            onChange={(e) => loginValidation(e.target.value)}
            onKeyPress={(e) =>
              e.nativeEvent.key === "Enter" ? getAnswerPass() : null
            }
          />
          <input
            name={"Password"}
            className={s.passwordInput}
            style={isPassWrong ? { color: "red" } : null}
            placeholder="Password"
            type={isPassShow ? "text" : "password"}
            value={password}
            onChange={(e) => passwordValidation(e.target.value)}
            onKeyPress={(e) =>
              e.nativeEvent.key === "Enter" ? getAnswerPass() : null
            }
          />
          <img
            alt={"showHideEye"}
            src={isPassShow ? eye_show : eye_hide}
            className={s.eyeInput}
            onMouseDown={() => setPassShow(true)}
            onMouseUp={() => setPassShow(false)}
          />
          <div
            className={s.loginByPassLink}
            onClick={() => props.setLoginForm("byPhone")}
          >
            Sign in by phone
          </div>
        </div>
        <button className={s.loginBtn} onClick={getAnswerPass}>
          Sign in
        </button>
      </div>
    </div>
  );
}
