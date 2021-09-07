import s from "./CSS/menuHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import shopCartIco from "../../files/img/shopCart.png";

export default function MenuHeader() {
  const store = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={s.headerZone}>
      <div
        title={"Login"}
        className={s.userIco}
        onClick={() => dispatch({ type: "OPEN_LOGIN_POPUP" })}
      >
        <span drow={"head"} />
        <span drow={"body"} />
      </div>
      <div
        title={"Cart"}
        className={s.shopIcoDiv}
        onClick={() => dispatch({ type: "OPEN_CART" })}
      >
        <img alt={"CartImage"} src={shopCartIco} className={s.shopIco} />
        <div className={s.shopIcoCount}>{store.itemsCount}</div>
      </div>
    </div>
  );
}
