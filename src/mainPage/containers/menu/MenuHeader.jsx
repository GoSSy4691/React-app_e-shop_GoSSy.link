import s from "./CSS/menuHeader.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopCartIco from "../../../files/img/shopCart.png";

export default function MenuHeader() {
  const [isUserShow, getUserShow] = useState(false);
  const store = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={s.headerZone} onClick={() => getUserShow(!isUserShow)}>
      <div className={s.userIco}>
        <span drow={"head"} />
        <span drow={"body"} />
      </div>
      <div
        className={s.shopIcoDiv}
        onClick={() => dispatch({ type: "OPEN_CART" })}
      >
        <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
        <div className={s.shopIcoCount}>{store.itemsCount}</div>
      </div>
      {isUserShow ? (
        <div className={s.userInfo}>
          <input name={"login"} placeholder="Login" />
          <input name={"password"} placeholder="Password" />
          <button className={s.loginBtn}>Login</button>
        </div>
      ) : null}
    </div>
  );
}
