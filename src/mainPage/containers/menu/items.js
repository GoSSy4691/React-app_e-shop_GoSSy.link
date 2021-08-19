import s from "./CSS/items.module.css";
import emptyImg from "../../../files/img/noItem.png";
import { useState } from "react";

export default function Items(props) {
  const [cartRendered, setCartRender] = useState(props.cart.inCart);
  const [countAll, setCountAll] = props.useCountAll();

  const inCart = {
    isFoodIn(name) {
      return cartRendered.find((el) => el.name === name);
    },

    add(name) {
      let newCart = props.cart.addFood(name);
      setCartRender(newCart);
      props.cart.changeCart(newCart);
      setCountAll(props.cart.inCart[0].value);
    },

    delete(name) {
      let newCart = props.cart.deleteFood(name);
      setCartRender(newCart);
      props.cart.changeCart(newCart);
      setCountAll(props.cart.inCart[0].value);
    },
  };

  return (
    <div>
      {props.menuData.map((p) => (
        <div
          className={`${
            inCart.isFoodIn(p.name) ? s.foodElementInOrder : s.foodElement
          }`}
          key={p.id}
        >
          <div
            className={`${inCart.isFoodIn(p.name) ? s.itemInOrder : s.item}`}
          >
            <img
              src={(() => {
                if (p.icon === undefined) return emptyImg;
                else return "https://zloi.space/restaurant/images/" + p.icon;
              })()}
              onError={(e) => (e.target.src = emptyImg)}
              className={s.foodImg}
              alt={"logo"}
            />
            <div className={s.name}>
              <div>{p.name}</div>
            </div>
            <div className={s.sectorOfPriceCountBuy}>
              <div className={s.price}>
                <div>{p.cost + " ₽"}</div>
              </div>
              {(() => {
                if (inCart.isFoodIn(p.name, cartRendered)) {
                  return (
                    <div className={s.deleteAndCountFood}>
                      <button
                        className={s.deleteItem}
                        onClick={() => inCart.delete(p.name)}
                      >
                        -
                      </button>
                      <div className={s.countItem}>
                        {cartRendered.find((e) => e.name === p.name).value}
                      </div>
                    </div>
                  );
                }
              })()}
              <button
                className={s.buyButton}
                onClick={() => inCart.add(p.name)}
              >
                add
              </button>
            </div>
            <div className={s.description}>
              <div>{p.description}</div>
              {(() => {
                if (p.description === undefined) {
                  p.description = "Пока ещё нет описания. Но это очень вкусно";
                }
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
