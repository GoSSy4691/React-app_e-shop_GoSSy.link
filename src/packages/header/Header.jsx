import s from "./header.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import zloiAPI from "../../files/API/zloiAPI.js";
import LogoImg from "./logoGoose/LogoImage.jsx";
import Login from "../login/Login.jsx";
import Settings from "../Settings.jsx";

export default function Header() {
  const headerStatus = useSelector((state) => state.user.headerStatus);
  const isLoginShow = useSelector((state) => state.user.isLoginShow);
  const [isShowSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { t } = useTranslation();

  //load profile
  if (headerStatus === "Loading") {
    console.log("Loading profile");
    zloiAPI
      .getProfile(cookies.get("Token"))
      .then((res) => {
        dispatch({ type: "LOGIN_CONFIRM", payload: res.data.data[0] });
        dispatch({ type: "PROFILE_DIALOG_STATE", payload: "Profile" });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "LOGOUT_CONFIRM" });
        dispatch({ type: "ERROR_MESSAGE", payload: t("Token expired") });
      });
  }

  return (
    <>
      {isShowSettings && <Settings setShowSettings={setShowSettings} />}
      {isLoginShow && <Login />}
      <div className={s.nav}>
        <div className={s.leftSide}>
          <LogoImg />
          <div className={s.bar}>
            <li>
              <NavLink
                className={s.textInactive}
                exact
                activeClassName={s.textActive}
                to="/"
                onClick={() => dispatch({ type: "HEADER_MENU_CLICK" })}
              >
                {t("Menu")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={s.textInactive}
                exact
                activeClassName={s.textActive}
                to="/about"
              >
                {t("About")}
              </NavLink>
            </li>
          </div>
        </div>
        <div className={s.rightSide}>
          <button
            className={s.userIco}
            onClick={
              headerStatus === "Loading"
                ? null
                : () => dispatch({ type: "PROFILE_DIALOG_SHOW" })
            }
          >
            {t(headerStatus)}
          </button>
          <button className={s.userIco} onClick={() => setShowSettings(true)}>
            {t("Settings")}
          </button>
        </div>
      </div>
    </>
  );
}
