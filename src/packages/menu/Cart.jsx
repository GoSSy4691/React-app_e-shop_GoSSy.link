import s from "./CSS/cart.module.css";
import patternCSS from "../pattern.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete";

export default function Cart(props) {
  const cart = useSelector((state) => state.cart);

  const isAnyFood = () => {
    if (cart.selectedFood.length === 0) return false;
    if (cart.selectedFood.length > 0) return true;
  };

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={patternCSS.activeBox}>
        <button
          className={patternCSS.closeButton}
          onClick={() => props.setShowCart(false)}
        >
          ✖
        </button>
        <div className={s.showCart}>
          <div className={s.shoppingCartTitle}>Your choose:</div>
          {isAnyFood() ? (
            cart.selectedFood.map((p, index) => (
              <div className={s.foodElement} key={index}>
                <div className={s.selectedFood}>
                  {index + 1} ) {p.name}
                </div>
                <div className={s.priceFood}>{p.costAll} ₽</div>
                <div className={s.buttonsBox}>
                  <ButtonAdd
                    name={p.name}
                    cost={p.costOne}
                    style={`${s.button} ${s.Add} ${s._style}`}
                  />
                  <div className={s.countFood}>{p.amount}</div>
                  <ButtonDelete
                    name={p.name}
                    cost={p.costOne}
                    style={`${s.button} ${s.Delete} ${s._style}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>Empty</div>
          )}
        </div>
        {isAnyFood() ? (
          <NavLink className={s.buttonToOrder} exact to="/order">
            Order {cart.selectedFood.reduce((a, b) => a + b.costAll, 0)} ₽
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
