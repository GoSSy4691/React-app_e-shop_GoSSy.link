import s from "./CSS/menu.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import runForestRun from "../../../files/img/runForestRun.png";
import shopCartIco from "../../../files/img/shopCart.png";
import Cart from "./cart.js";
import Items from "./items.js";

function CartOnTop(props) {
  const store = useSelector((state) => state);
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

function MenuContainer(props) {
  const [menu, updateMenu] = useState([]);
  if (menu.length === 0) {
    props.getMenu().then((data) => updateMenu(data));
    return <div>Loading</div>;
  } else {
    return <Items menu={menu} />;
  }
}

export default function Menu(props) {
  const [isCartOpen, openCart] = useState(false);
  return (
    <div className={s.showRoom}>
      {isCartOpen ? <Cart openCart={openCart} /> : null}
      <CartOnTop openCart={openCart} />
      <MenuContainer getMenu={props.getMenu} />
      <img
        alt={"footer"}
        className={s.footerImg}
        src={runForestRun}
        key={Math.random()}
      />
    </div>
  );
}
