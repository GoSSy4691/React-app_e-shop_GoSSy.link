import s from "./CSS/footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cart from "./Cart.jsx";
import Delivery from "./Delivery.jsx";

import shopCartIco from "../../files/img/shopCart.png";
import loadingGoose from "../../files/img/loadingGoose.png";

export default function Footer() {
  const { t } = useTranslation();
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const userView = useSelector((state) => state.menu.userView);
  const footerShow = useSelector((state) => state.user.footerShow);
  const dispatch = useDispatch();

  return (
    <Route exact path="/">
      {footerShow === "cart" && <Cart />}
      {(footerShow === "delivery" || footerShow === "takeOut") && <Delivery />}
      <button
        title={"Cart"}
        className={s.shopIcoButton}
        onClick={() => dispatch({ type: "CART_OPEN_CLOSE" })}
      >
        <img
          alt={"CartImage"}
          src={shopCartIco}
          className={s.shopIco}
          draggable="false"
        />
        {itemsCount > 0 && <div className={s.shopIcoCount}>{itemsCount}</div>}
      </button>
      <div
        className={s.loadingDiv}
        style={userView === "Loading" ? null : { display: "none" }}
      >
        <h3 className={s.nameOnTop}>{t("Loading")}</h3>
        <img
          alt={"loadingImg"}
          className={s.loadingImg}
          src={loadingGoose}
          key={Math.random()}
        />
      </div>
    </Route>
  );
}
