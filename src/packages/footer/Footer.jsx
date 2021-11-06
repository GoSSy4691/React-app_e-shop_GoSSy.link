import s from "./CSS/footer.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Cart from "../menu/Cart.jsx";
import Delivery from "../menu/Delivery.jsx";

import shopCartIco from "../../files/img/shopCart.png";

export default function Footer() {
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const [footerShow, setFooterShow] = useState("");

  return (
    <Route exact path="/">
      {footerShow === "cart" && <Cart setFooterShow={setFooterShow} />}
      {footerShow === "delivery" && <Delivery setFooterShow={setFooterShow} />}
      <button
        title={"Cart"}
        className={s.shopIcoButton}
        onClick={() => setFooterShow("cart")}
      >
        <img
          alt={"CartImage"}
          src={shopCartIco}
          className={s.shopIco}
          draggable="false"
        />
        {itemsCount > 0 && <div className={s.shopIcoCount}>{itemsCount}</div>}
      </button>
    </Route>
  );
}
