import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../useDetectClickOut.js";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";

import penEdit from "../../files/img/penEdit.svg";

export default function Login() {
  const user = useSelector((state) => state.user);
  const isDialogOpen = useSelector((state) => state.user.isDialogOpen);
  const dialogState = useSelector((state) => state.user.dialogState);
  const refLogin = useDetectClickOut(isDialogOpen, () =>
    dispatch({ type: "PROFILE_DIALOG_SHOW" })
  );
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function logoutBtn() {
    dispatch({ type: "SUCCESS_MESSAGE", payload: "Log out confirmed" });
    dispatch({ type: "LOGOUT_CONFIRM" });
    dispatch({ type: "PROFILE_DIALOG_SHOW" });
  }

  function closeAndRefresh() {
    if (cookies.get("Token") !== undefined) {
      dispatch({ type: "SUCCESS_MESSAGE", payload: "Token received" });
      dispatch({ type: "PROFILE_DIALOG_SHOW" });
    } else {
      dispatch({ type: "ERROR_MESSAGE", payload: "Didn't get token" });
      dispatch({ type: "PROFILE_DIALOG_STATE", payload: "byPhone" });
    }
  }

  switch (dialogState) {
    case "byPhone":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPhone />
          </div>
        </div>
      );
    case "byPass":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPass />
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
                <div className={s.afterToken}>
                  Please verify your profile in new window
                </div>
                <button className={s.loginBtn} onClick={closeAndRefresh}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case "Profile":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <div className={s.afterName}>
              <div className={s.firstLine}>
                <div className={s.token}>Hello, {user.userData.name}!</div>
                <img alt={"Edit"} src={penEdit} className={s.penEdit} />
              </div>
              <div className={s.token}>
                {user.userData.phone > 0
                  ? user.userData.phone
                  : "Birth date not set"}
              </div>
              <div className={s.token}>
                {user.userData.birthday > 0
                  ? user.userData.birthday
                  : "Birthday not set"}
              </div>
              <p className={s.logoutBtn} onClick={logoutBtn}>
                Log out
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
