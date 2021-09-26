import s from "./header.module.css";
import { NavLink, Route } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopCartIco from "../../files/img/shopCart.png";
import LogoImg from "./logoGoose/LogoImage.jsx";
import Cart from "../menu/Cart.jsx";
import Login from "../login/Login.jsx";

export default function Header() {
  const store = useSelector((state) => state.cart);
  const isUserLogin = useSelector((state) => state.user.isUserLogin);
  const [isShowLogin, setShowLogin] = useState(false);
  const [isShowCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

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
              onClick={() =>
                dispatch({ type: "CHANGE_STATUS", payload: "Choose shop" })
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              className={s.textInactive}
              exact
              activeClassName={s.textActive}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </div>
      </div>
      <div className={s.rightSide}>
        <div className={s.userIco} onClick={() => setShowLogin(true)}>
          {isUserLogin ? "Log out" : "Log in"}
        </div>
      </div>
      <Route exact path="/">
        <div
          title={"Cart"}
          className={s.shopIcoDiv}
          onClick={() => setShowCart(true)}
        >
          <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
          {store.itemsCount > 0 ? (
            <div className={s.shopIcoCount}>{store.itemsCount}</div>
          ) : null}
        </div>
      </Route>
      {isShowLogin ? (
        <Login isShowLogin={isShowLogin} setShowLogin={setShowLogin} />
      ) : null}
      {isShowCart ? (
        <Cart isShowCart={isShowCart} setShowCart={setShowCart} />
      ) : null}
    </div>
  );
}
