import s from "./CSS/cart.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete";

export default function Cart(props) {
  const store = useSelector((state) => state.cart);
  return (
    <div className={s.darkenBackgroundShow}>
      <div className={s.cartBox}>
        <button className={s.closeButton} onClick={() => props.openCart(false)}>
          ✖
        </button>
        <div className={s.showCart}>
          <div className={s.shoppingCartTitle}>Your choose:</div>
          {Array.from(store.selectedFood, ([name, value], index) => (
            <div className={s.foodElement} key={index}>
              <div className={s.selectedFood}>
                {index + 1} ) {name}
              </div>
              <div className={s.countFood}>{value} pcs</div>
              <div className={s.buttonsBox}>
                <ButtonAdd
                  text={"+"}
                  foodName={name}
                  style={s.buttonAddDelete}
                />
                <ButtonDelete
                  text={"-"}
                  foodName={name}
                  style={s.buttonAddDelete}
                />
              </div>
            </div>
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
