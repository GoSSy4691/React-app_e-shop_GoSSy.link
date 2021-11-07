import s from "./CSS/cart.module.css";
import patternCart from "./CSS/patternCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import { ButtonAdd, ButtonDelete } from "../menu/ButtonAddDelete.jsx";

import polygonBack from "../../files/img/polygonBack.svg";
import polygonForward from "../../files/img/polygonForward.svg";

export default function Cart(props) {
  const selectedFood = useSelector((state) => state.cart.selectedFood);
  const isNeedDelivery = useSelector((state) => state.cart.isNeedDelivery);
  const refCart = useDetectClickOut(props.setFooterShow);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function orderFoods() {
    if (!isNeedDelivery) {
      props.setFooterShow("takeOut");
    } else {
      if (selectedFood.find((el) => el.delivery.isDelivery === false)) {
        dispatch({
          type: "ERROR_MESSAGE",
          payload: t("Can't deliver some kind of food"),
        });
      } else props.setFooterShow("delivery");
    }
  }

  return (
    <div className={s.showCart} ref={refCart}>
      <div className={s.scrollAbleCart}>
        {selectedFood.length > 0 ? (
          <>
            {selectedFood.map((el, index) => (
              <div
                className={s.foodElement}
                key={index}
                style={
                  !el.delivery.isDelivery && isNeedDelivery
                    ? { color: "red" }
                    : null
                }
              >
                <div className={s.foodName}>{el.name}</div>
                <div className={s.buttonsBox}>
                  <ButtonDelete
                    name={el.name}
                    cost={el.costOne}
                    style={s.button}
                    text={<img alt={"add"} src={polygonBack} />}
                  />
                  <div className={s.countFood}>{el.amount}</div>
                  <ButtonAdd
                    name={el.name}
                    cost={el.costOne}
                    style={s.button}
                    text={<img alt={"add"} src={polygonForward} />}
                  />
                </div>
                <div className={s.priceFood}>{el.costAll} ₽</div>
              </div>
            ))}
            <DeliveryBtn
              isNeedDelivery={isNeedDelivery}
              onClick={() => dispatch({ type: "CHANGE_DELIVERY" })}
            >
              <div className={s.switchText}>
                <p>{t("Take out")}</p>
                <p>{t("Delivery")}</p>
              </div>
            </DeliveryBtn>
            <button className={patternCart.buttonToOrder} onClick={orderFoods}>
              <p>{t("Order_Verb")} </p>
              <p>{selectedFood.reduce((a, b) => a + b.costAll, 0)} ₽ </p>
            </button>
          </>
        ) : (
          <div style={{ marginTop: 20 }}>{t("Empty")}</div>
        )}
      </div>
    </div>
  );
}

const DeliveryBtn = styled.button`
  width: 310px;
  height: 25px;
  position: absolute;
  content: "41241";

  // transform: translateX(-50%);
  bottom: 50px;
  right: 20px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  background-color: #353b48;
  // border: 3px solid white;

  &::after {
    width: 155px;
    height: 21px;
    content: "";
    position: absolute;
    top: 0;
    will-change: transform;
    transform: translate(${(props) => (props.isNeedDelivery ? -8 : -150)}px);
    transition: transform 0.2s ease-out;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 5px;
  }
`;
