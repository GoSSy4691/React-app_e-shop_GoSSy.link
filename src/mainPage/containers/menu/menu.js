import s from "./CSS/menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../../files/img/runForestRun.png";
import shopCartIco from "../../../files/img/shopCart.png";
import Cart from "./cart.js";
import Items from "./items.js";
import LeftBar from "./LeftBar.js";
import getShopData from "../../../files/shop/getShopData.js";

export function CartOnTop() {
  const store = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={s.topBar}>
      <div
        className={s.topImgBack}
        onClick={() => dispatch({ type: "OPEN_CART" })}
      >
        <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
      </div>
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
        <div className={"menu_container"}>
          <LeftBar />
          <div className={s.emptyItemDialog}>Nothing find</div>
        </div>
      );
    default:
      return (
        <div className={"menu_container"}>
          <LeftBar />
          <Items />
        </div>
      );
  }
}

export function Menu() {
  const isCartShow = useSelector((state) => state.isCartShow);
  return (
    <div className={s.showRoom}>
      {isCartShow ? <Cart /> : null}
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
