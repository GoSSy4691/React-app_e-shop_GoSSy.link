import s from "./CSS/cart.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cart(props) {
  const store = useSelector((state) => state);
  return (
    <div className={s.darkenBackgroundShow}>
      <div className={s.cartBox}>
        <button className={s.closeButton} onClick={() => props.openCart(false)}>
          ✖
        </button>
        <div className={s.showCart}>
          <div className={s.shoppingCartTitle}>Your choose:</div>
          {Array.from(store.selectedFood, ([name, value], index) => (
            <li key={Math.random()}>
              {index + 1} ) {name} - {value} pcs
            </li>
          ))}
        </div>
        {(() => {
          if (store.selectedFood.size > 0) {
            return (
              <NavLink className={s.buttonToOrder} exact to="/order">
                Order
              </NavLink>
            );
          }
        })()}
      </div>
    </div>
  );
}
