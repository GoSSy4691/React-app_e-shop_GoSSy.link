import s from "./CSS/cart.module.css";
import patternCSS from "../patternMenu.module.css";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete.jsx";

function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const refCart = useDetectClickOut(props.isShowCart, props.setShowCart);

  function goToOrder() {
    props.setShowCart(false);
    props.history.push("/order");
  }

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.showCart} ref={refCart}>
        <button
          className={patternCSS.closeButton}
          onClick={() => props.setShowCart(false)}
        >
          ✖
        </button>
        <div className={s.shoppingCartTitle}>Your choose:</div>
        <div className={s.scrollAbleCart}>
          {cart.selectedFood.length > 0 ? (
            cart.selectedFood.map((p, index) => (
              <div className={s.foodElement} key={index}>
                <div className={s.selectedFood}>
                  {index + 1} ) {p.name}
                </div>
                <div className={s.priceFood}>{p.costAll} ₽</div>
                <div className={s.buttonsBox}>
                  <ButtonDelete
                    name={p.name}
                    cost={p.costOne}
                    style={`${s.button} ${s.Delete} ${s._style}`}
                  />
                  <div className={s.countFood}>{p.amount}</div>
                  <ButtonAdd
                    name={p.name}
                    cost={p.costOne}
                    style={`${s.button} ${s.Add} ${s._style}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>Empty</div>
          )}
        </div>
        {cart.selectedFood.length > 0 ? (
          <button className={s.buttonToOrder} onClick={goToOrder}>
            Order {cart.selectedFood.reduce((a, b) => a + b.costAll, 0)} ₽
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default withRouter(Cart);
