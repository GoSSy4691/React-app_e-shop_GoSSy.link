import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authorization } from "../../../files/API/api.js";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  function getAnswer() {
    authorization(login, password)
      .then((data) => setAnswer(data))
      .catch((error) =>
        setAnswer(error.response.status + " " + error.response.statusText)
      );
    setAnswer("Loading...");
  }

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={patternCSS.activeBox}>
        <button
          className={patternCSS.closeButton}
          onClick={() => dispatch({ type: "CLOSE_LOGIN_POPUP" })}
        >
          ✖
        </button>
        <div className={s.userInfo}>
          <input
            name={"login"}
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            name={"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={s.footer}>
            <div className={s.response}>{answer}</div>
            <button className={s.loginBtn} onClick={() => getAnswer()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
