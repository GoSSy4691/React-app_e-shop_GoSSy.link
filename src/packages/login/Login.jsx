import s from "./login.module.css";
import patternCSS from "../patternMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";

import penEdit from "../../files/img/penEdit.svg";

export default function Login() {
  const user = useSelector((state) => state.user);
  const dialogState = useSelector((state) => state.user.dialogState);
  const refLogin = useDetectClickOut(() =>
    dispatch({ type: "PROFILE_DIALOG_SHOW" })
  );
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { t } = useTranslation();

  function logoutBtn() {
    dispatch({ type: "SUCCESS_MESSAGE", payload: "Log out confirmed" });
    dispatch({ type: "LOGOUT_CONFIRM" });
    dispatch({ type: "PROFILE_DIALOG_SHOW" });
  }

  function closeAndRefresh() {
    if (cookies.get("Token") !== undefined) {
      dispatch({ type: "SUCCESS_MESSAGE", payload: "Token received" });
      dispatch({ type: "PROFILE_DIALOG_SHOW" });
      dispatch({ type: "LOAD_PROFILE" });
    } else {
      dispatch({ type: "ERROR_MESSAGE", payload: "Didn't get token" });
      dispatch({ type: "PROFILE_DIALOG_STATE", payload: "byPhone" });
    }
  }
  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.loginDialog} ref={refLogin}>
        <div className={s.naming}>{t("Login to your account")}</div>
        {(() => {
          switch (dialogState) {
            case "byPhone":
              return <ByPhone />;
            case "byPass":
              return <ByPass />;
            case "Wait":
              return (
                <div className={s.afterName}>
                  <div className={s.afterTokenDialog}>
                    {t("Please verify your profile in new window")}
                  </div>
                  <button className={s.logoutBtn} onClick={closeAndRefresh}>
                    {t("Ok")}
                  </button>
                </div>
              );
            case "Profile":
              return (
                <div className={s.afterName}>
                  <div className={s.firstLine}>
                    <div className={s.token}>
                      {t("Hello")},
                      {user.userData.name.length > 0
                        ? user.userData.name
                        : user.userData.login !== null
                        ? user.userData.login
                        : user.userData.phone}
                      !
                    </div>
                    <button>
                      <img
                        alt={"Edit"}
                        src={penEdit}
                        className={s.penEdit}
                        onClick={() =>
                          dispatch({
                            type: "ERROR_MESSAGE",
                            payload: "Didn't work yet",
                          })
                        }
                      />
                    </button>
                  </div>
                  <div className={s.token}>
                    {user.userData.phone > 0
                      ? user.userData.phone
                      : t("Phone not set")}
                  </div>
                  <div className={s.token}>
                    {user.userData.birthday > 0
                      ? user.userData.birthday
                      : t("Birthday not set")}
                  </div>
                  <button className={s.logoutBtn} onClick={logoutBtn}>
                    {t("Log out")}
                  </button>
                </div>
              );
            default:
              return <div className={s.afterName}>{t("Error")}</div>;
          }
        })()}
      </div>
    </div>
  );
}
