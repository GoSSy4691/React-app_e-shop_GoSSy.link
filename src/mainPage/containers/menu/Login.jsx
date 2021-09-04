import s from "./CSS/login.module.css";
import patternCSS from "./CSS/pattern.module.css";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
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
          <input name={"login"} placeholder="Login" />
          <input name={"password"} placeholder="Password" />
          <div className={s.footer}>
            <div className={s.response}>Login form doesn't work yet</div>
            <button className={s.loginBtn}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
