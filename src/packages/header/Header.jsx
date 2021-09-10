import s from "./header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import shopCartIco from "../../files/img/shopCart.png";
import LogoImg from "./logoGoose/LogoImage.jsx";
import Cart from "../menu/Cart.jsx";
import Login from "../login/Login.jsx";

export default function Header() {
  const store = useSelector((state) => state.cart);
  const [isShowLogin, setShowLogin] = useState(false);
  const [isShowCart, setShowCart] = useState(false);

  return (
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
      <div className={s.rightSide}>
        <div
          title={"Login"}
          className={s.userIco}
          onClick={() => setShowLogin(true)}
        >
          <span drow={"head"} />
          <span drow={"body"} />
        </div>
        <div
          title={"Cart"}
          className={s.shopIcoDiv}
          onClick={() => setShowCart(true)}
        >
          <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
          <div className={s.shopIcoCount}>{store.itemsCount}</div>
        </div>
      </div>
      {isShowLogin ? <Login setShowLogin={setShowLogin} /> : null}
      {isShowCart ? <Cart setShowCart={setShowCart} /> : null}
    </div>
  );
}
