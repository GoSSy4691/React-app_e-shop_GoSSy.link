import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../files/shop/auth.js";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  function GetAnswer() {
    const answer = useSelector((state) => state.userData.serverResponse);
    console.log(answer);
    switch (answer) {
      case "":
        return null;
      case "Waiting...":
        auth(login, password).then((data) =>
          dispatch({ type: "LOGIN_CONFIRM", payload: data })
        );
        return <span>Waiting...</span>;
      default:
        return answer;
    }
  }

  function getAnswer2() {
    auth(login, password)
      .then((data) => setAnswer(data))
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.statusText);
          setAnswer(error.response.status + " " + error.response.statusText);
        }
      });
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
            <button className={s.loginBtn} onClick={() => getAnswer2()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
