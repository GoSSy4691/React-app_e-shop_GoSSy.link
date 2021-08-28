import s from "./CSS/menu.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../../files/img/runForestRun.png";
import shopCartIco from "../../../files/img/shopCart.png";
import Cart from "./cart.js";
import Items from "./items.js";
import LeftBar from "./LeftBar.js";
import getShopData from "../../../files/shop/getShopData.js";

function CartOnTop(props) {
  const store = useSelector((state) => state.cart);
  return (
    <div className={s.topBar}>
      <img
        alt={"CartImage"}
        src={shopCartIco}
        className={s.shopIco}
        onClick={() => props.openCart(true)}
      />
      <div className={s.shopIcoCount}>{store.itemsCount}</div>
    </div>
  );
}

function MenuContainer() {
  const menu = useSelector((state) => state.menu.menuOnDisplay);
  const dispatch = useDispatch();
  switch (menu) {
    case "Загрузка":
      getShopData().then((data) =>
        dispatch({ type: "GET_ALL_MENU", payload: data })
      );
      return <div className={s.emptyItemDialog}>Loading</div>;
    case "Пусто":
      return (
        <div>
          <LeftBar />
          <div className={s.emptyItemDialog}>Nothing find</div>
        </div>
      );
    default:
      return (
        <div>
          <LeftBar />
          <Items />
        </div>
      );
  }
}

export default function Menu() {
  const [isCartOpen, openCart] = useState(false);
  return (
    <div className={s.showRoom}>
      {isCartOpen ? <Cart openCart={openCart} /> : null}
      <CartOnTop openCart={openCart} />
      <MenuContainer />
      <img
        alt={"footer"}
        className={s.footerImg}
        src={runForestRun}
        key={Math.random()}
      />
    </div>
  );
}
