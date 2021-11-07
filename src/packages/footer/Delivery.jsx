import s from "./CSS/delivery.module.css";
import patternCart from "./CSS/patternCart.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useDetectClickOut from "../../files/useDetectClickOut.js";

export default function Delivery(props) {
  const selectedFood = useSelector((state) => state.cart.selectedFood);
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [floor, setFloor] = useState("");
  const [apart, setApart] = useState("");
  const [comment, setComment] = useState("");
  const [promocode, setPromocode] = useState("");
  const [isDeliveryNow, setDeliveryNow] = useState(true);
  const refCart = useDetectClickOut(props.setFooterShow);
  const { t } = useTranslation();

  // need rework for call only one time
  let allFoodsPrice = selectedFood.reduce((a, b) => a + b.costAll, 0);
  let deliveryCalculate = selectedFood
    .map((el) => el.delivery)
    .filter((v, i, a) => a.findIndex((t) => t.shopId === v.shopId) === i)
    .reduce((a, b) => a + b.cost, 0);

  //need rework for call only one time
  function roundTime() {
    let hoursNow = new Date().getHours();
    let minutesNow = new Date().getMinutes();

    if (minutesNow % 5 > 0) {
      let round = 5 - (minutesNow % 5) + minutesNow;
      if (round === 60) {
        return { hours: hoursNow + 1, minutes: 0 };
      } else return { hours: hoursNow, minutes: round };
    }
    return { hours: hoursNow, minutes: minutesNow };
  }

  let timeForSelect = roundTime();
  const [hoursState, setHoursState] = useState(timeForSelect.hours);
  const [minutesState, setMinutesState] = useState(timeForSelect.minutes);

  return (
    <div className={s.boxDelivery} ref={refCart}>
      <div className={s.title}>{t("Delivery")}</div>
      <input
        name={"Phone"}
        className={s.input}
        autoFocus
        placeholder={t("phone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onKeyPress={(e) =>
          e.nativeEvent.key === "Enter" && console.log("Enter")
        }
      />
      <input
        name={"Street"}
        className={s.input}
        placeholder={t("street")}
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        onKeyPress={(e) =>
          e.nativeEvent.key === "Enter" && console.log("Enter")
        }
      />
      <div className={s.inline}>
        <input
          name={"House"}
          className={s.inputHalf}
          placeholder={t("house")}
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Enter" && console.log("Enter")
          }
        />
        <input
          name={"Floor"}
          className={s.inputHalf}
          placeholder={t("floor")}
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Enter" && console.log("Enter")
          }
        />
        <input
          name={"Apart"}
          className={s.inputHalf}
          placeholder={t("apart")}
          value={apart}
          onChange={(e) => setApart(e.target.value)}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Enter" && console.log("Enter")
          }
        />
      </div>
      <input
        name={"Comment"}
        className={s.commentInput}
        placeholder={t("comment")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) =>
          e.nativeEvent.key === "Enter" && console.log("Enter")
        }
      />
      <div className={s.timeTitle}>{t("Delivery time")}:</div>
      <div
        className={s.tomorrowTitle}
        style={isDeliveryNow ? null : { color: "white" }}
      >
        <p
          style={
            new Date().getHours() > hoursState ? null : { display: "none" }
          }
        >
          {t("Tomorrow")}
        </p>
      </div>
      <div className={s.timeInline}>
        <div
          className={s.asSoon}
          style={isDeliveryNow ? { color: "white" } : null}
        >
          {t("As soon as possible")}
        </div>
        <ToggleBtn
          isDeliveryNow={isDeliveryNow}
          onClick={() => setDeliveryNow(!isDeliveryNow)}
        />
        <div className={s.timeDiv}>
          <select
            className={s.timeSelect}
            value={hoursState}
            disabled={isDeliveryNow}
            onChange={(e) => setHoursState(Number(e.target.value))}
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          &nbsp;:&nbsp;
          <select
            className={s.timeSelect}
            value={minutesState}
            disabled={isDeliveryNow}
            onChange={(e) => setMinutesState(Number(e.target.value))}
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={s.inline}>
        <input
          name={"Promocode"}
          className={s.promocodeInput}
          placeholder={t("PROMOCODE")}
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
          onKeyPress={(e) =>
            e.nativeEvent.key === "Enter" && console.log("Enter")
          }
        />
        <div className={s.cartTitle}>{t("Payment method")}</div>
        <select className={s.payment}>
          <option>{t("Cart_Preposition")}</option>
          <option>{t("Cash_Preposition")}</option>
        </select>
      </div>
      <div className={s.inlineOrder}>
        <p>{t("Order_Noun")}</p>
        <p>{allFoodsPrice} ₽</p>
      </div>
      <div className={s.inlineDelivery}>
        <p>{t("Delivery")}</p>
        <p>{deliveryCalculate} ₽</p>
      </div>
      <div className={s.inlineTotal}>
        <p>{t("Total")}</p>
        <p>{allFoodsPrice + deliveryCalculate} ₽</p>
      </div>
      <button
        className={patternCart.buttonToOrder}
        style={{}}
        onClick={() => console.log("Button")}
      >
        <p style={{ width: "100%" }}>{t("Order_Verb")}</p>
      </button>
    </div>
  );
}

const ToggleBtn = styled.button`
  width: 59px;
  height: 23px;
  margin: 0 7px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: #353b48;
  border: 3px solid white;
  align-self: center;

  &::after {
    width: 13px;
    height: 13px;
    content: "";
    position: absolute;
    top: 0;
    will-change: transform;
    transform: translate(${(props) => (props.isDeliveryNow ? -26 : 9)}px);
    transition: transform 0.2s ease-out;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;
  }
`;
