import LogoImg from "./logoGoose/LogoImage.jsx";
import { NavLink } from "react-router-dom";
import s from "./header.module.css";

export default function Header() {
  return (
    <div className={s.nav}>
      <LogoImg />
      <div className={s.bar}>
        <li>
          <NavLink
            className={s.textInactive}
            exact
            activeClassName={s.textActive}
            to="/"
          >
            Welcome
          </NavLink>
        </li>
        <li>
          <NavLink
            className={s.textInactive}
            exact
            activeClassName={s.textActive}
            to="/menu"
          >
            Menu
          </NavLink>
        </li>
      </div>
    </div>
  );
}
