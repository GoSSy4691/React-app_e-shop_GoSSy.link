import s from "./CSS/delivery.module.css";
import patternCart from "./CSS/patternCart.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Cookies from "universal-cookie";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import zloiAPI from "../../files/API/zloiAPI.js";
import yookassaWidget from "../../files/widgets/yookassa.js";
import InputPhone from "../header/login/InputPhone.jsx";

export default function Delivery() {
  const selectedFood = useSelector((state) => state.cart.selectedFood);
  const footerShow = useSelector((state) => state.user.footerShow);
  const isCartOpen = useSelector((state) => state.user.isCartShow);
  const theOrderId = useSelector((state) => state.admin.theOrder.id);
  const deliveryData = useSelector((state) => state.user.deliveryData);
  const userData = useSelector((state) => state.user.userData);
  const [phone, setPhone] = useState(
    deliveryData.phone === "8(___)___-__-__" && userData?.phone
      ? "8(" +
          userData.phone.slice(2, 5) +
          ")" +
          userData.phone.slice(5, 8) +
          "-" +
          userData.phone.slice(8, 10) +
          "-" +
          userData.phone.slice(10, 12)
      : deliveryData.phone
  );
  const [isWrongInput, setWrongInput] = useState({
    phone: false,
    street: false,
    house: false,
    floor: false,
    apart: false,
    promocode: false,
    checkPass: false,
  });
  const [street, setStreet] = useState(deliveryData.street);
  const [house, setHouse] = useState(deliveryData.house);
  const [floor, setFloor] = useState(deliveryData.floor);
  const [apart, setApart] = useState(deliveryData.apart);
  const [comment, setComment] = useState(deliveryData.comment);
  const [promocode, setPromocode] = useState(deliveryData.promocode);
  const [isDeliveryNow, setDeliveryNow] = useState(true);
  const [isPaymentShow, setPaymentShow] = useState(false);
  const refCart = useDetectClickOut(
    isCartOpen ? () => dispatch({ type: "CART_OPEN_CLOSE" }) : () => {}
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cookies = new Cookies();

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

  function createOrder() {
    //check user login and break
    if (cookies.get("Token") === undefined) {
      dispatch({
        type: "SHOW_MESSAGE",
        payload: t("Please log in"),
        color: "red",
      });
      return;
    }
    //check previous yookassa widget and break
    if (theOrderId) {
      setPaymentShow(true);
      return;
    }
    //look up input data
    let checkPhone = Boolean(
      phone.split("").find((element) => element === "_")
    );
    let checkStreet = street.length < 3;
    let checkHouse = house.length === 0;
    let checkFloor = floor.length === 0;
    let checkApart = apart.length === 0;
    //check necessary input and break (except floor/apart)
    if (checkPhone || checkStreet || checkHouse) {
      let buffer = {
        ...isWrongInput,
        phone: checkPhone,
        street: checkStreet,
        house: checkHouse,
      };
      dispatch({
        type: "SHOW_MESSAGE",
        payload: t("Fill in required fields"),
        color: "red",
      });
      setWrongInput(buffer);
      return;
    }
    if (!isWrongInput.checkPass) {
      //check floor/apart and break
      if (checkFloor || checkApart) {
        dispatch({
          type: "SHOW_MESSAGE",
          payload: `${t("Click again to order without")} 
          ${checkFloor ? " - " + t("floor") : ""} 
          ${checkApart ? " - " + t("apart") : ""}`,
          color: "yellow",
        });
        setWrongInput({
          ...isWrongInput,
          phone: false,
          street: false,
          house: false,
          floor: checkFloor,
          apart: checkApart,
          checkPass: true,
        });
        return;
      }
    }
    setPaymentShow(true);
    zloiAPI
      .createOrder(cookies.get("Token"), {
        menu: selectedFood.map((el) => ({ id: el.id, count: el.amount })),
        comment,
      })
      .then((res) => {
        dispatch({ type: "SET_ORDER_CONTENT", id: res.data.id });
        yookassaWidget(res.data.confirmation_token).render("payment-form");
      })
      .catch((error) => {
        console.error(error.response);
        dispatch({
          type: "SHOW_MESSAGE",
          payload: t("Create order error"),
          color: "red",
        });
      });
  }

  function promocodeInput(input) {
    if (isWrongInput.promocode) {
      setWrongInput({ ...isWrongInput, promocode: false });
    }
    if (input.length <= 8) {
      if (input.toUpperCase().match(/[А-Я]/g)) {
        dispatch({
          type: "SHOW_MESSAGE",
          payload: t("Use digits and english letters"),
          color: "red",
        });
        setWrongInput({ ...isWrongInput, promocode: true });
      }
      let filterLetter = input.toUpperCase().match(/[A-Z,1-9]/g);
      let checkedInput = filterLetter ? filterLetter.join("") : "";
      setPromocode(checkedInput);
    }
  }

  function exitYookassa() {
    zloiAPI
      .deleteOrder(cookies.get("Token"), theOrderId)
      .then(() => dispatch({ type: "SET_ORDER_CONTENT", id: "" }))
      .catch((error) => console.log(error));
    setPaymentShow(false);
  }

  function sortedHours() {
    const array = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    const findIndex = array.indexOf(new Date().getHours());
    return array.slice(findIndex).concat(array.slice(0, findIndex));
  }

  useEffect(() => {
    let buffer = { phone, street, house, floor, apart, comment, promocode };
    if (deliveryData !== buffer) {
      dispatch({ type: "SAVE_DELIVERY_DATA", payload: buffer });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, street, house, floor, apart, comment, promocode]);

  return (
    <DeliveryDiv
      className={s.boxDelivery}
      ref={refCart}
      isPaymentShow={isPaymentShow}
      isCartOpen={isCartOpen}
    >
      <div
        id={"payment-form"}
        className={s.paymentForm}
        style={isPaymentShow ? {} : { display: "none" }}
      />
      {isPaymentShow && (
        <div className={patternCart.buttonsLine}>
          <button className={patternCart.backButton} onClick={exitYookassa}>
            <p>←</p>
          </button>
        </div>
      )}
      {!isPaymentShow && (
        <>
          {footerShow === "delivery" && (
            <>
              <div className={s.title}>{t("Delivery")}</div>
              <InputPhone
                phone={phone}
                setPhone={(i) => {
                  if (isWrongInput.phone) {
                    setWrongInput({ ...isWrongInput, phone: false });
                  }
                  setPhone(i);
                }}
                doNext={(e) => e.target.nextSibling.focus()}
                className={s.input}
                style={
                  isWrongInput.phone
                    ? { boxShadow: "0 0 16px 4px red", color: "red" }
                    : {}
                }
              />
              <input
                name={"Street"}
                className={s.input}
                style={
                  isWrongInput.street
                    ? { boxShadow: "0 0 16px 4px red", color: "red" }
                    : {}
                }
                placeholder={t("street")}
                value={street}
                maxLength={"20"}
                onChange={(e) => {
                  if (isWrongInput.street) {
                    setWrongInput({ ...isWrongInput, street: false });
                  }
                  setStreet(e.target.value.toLowerCase());
                }}
                onKeyPress={(e) =>
                  e.nativeEvent.key === "Enter" &&
                  e.target.nextElementSibling.firstChild.focus()
                }
              />
              <div className={s.inline}>
                <input
                  name={"House"}
                  className={s.inputHalf}
                  style={
                    isWrongInput.house
                      ? { boxShadow: "0 0 16px 4px red", color: "red" }
                      : {}
                  }
                  placeholder={t("house")}
                  value={house}
                  maxLength={"5"}
                  onChange={(e) => {
                    if (isWrongInput.house) {
                      setWrongInput({ ...isWrongInput, house: false });
                    }
                    setHouse(e.target.value.toLowerCase());
                  }}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "Enter" &&
                    e.target.nextSibling.focus()
                  }
                />
                <input
                  name={"Floor"}
                  className={s.inputHalf}
                  style={
                    isWrongInput.floor
                      ? { boxShadow: "0 0 16px 4px yellow" }
                      : {}
                  }
                  placeholder={t("floor")}
                  value={floor}
                  maxLength={"3"}
                  onChange={(e) => {
                    if (isWrongInput.floor) {
                      setWrongInput({
                        ...isWrongInput,
                        floor: false,
                        checkPass: false,
                      });
                    }
                    !e.target.value.match(/\D/g) && setFloor(e.target.value);
                  }}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "Enter" &&
                    e.target.nextSibling.focus()
                  }
                />
                <input
                  name={"Apart"}
                  className={s.inputHalf}
                  style={
                    isWrongInput.apart
                      ? { boxShadow: "0 0 16px 4px yellow" }
                      : {}
                  }
                  placeholder={t("apart")}
                  value={apart}
                  maxLength={"3"}
                  onChange={(e) => {
                    if (isWrongInput.apart) {
                      setWrongInput({
                        ...isWrongInput,
                        apart: false,
                        checkPass: false,
                      });
                    }
                    !e.target.value.match(/\D/g) && setApart(e.target.value);
                  }}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "Enter" &&
                    e.target.parentElement.nextSibling.focus()
                  }
                />
              </div>
            </>
          )}
          {footerShow === "takeOut" && (
            <>
              <div className={s.title}>{t("Take out")}</div>
              <div className={s.shopAddress}>
                {selectedFood.map((el, index) => (
                  <li key={index} className={s.shopAddressList}>
                    <p>{el.delivery.shopName}</p>
                    <p>{el.delivery.address}</p>
                  </li>
                ))}
              </div>
            </>
          )}
          <textarea
            name={"Comment"}
            className={s.commentInput}
            placeholder={t("comment")}
            value={comment}
            autoComplete={"off"}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={s.timeTitle}>
            <p>{t("Delivery time")}:</p>
            <p
              style={
                !isDeliveryNow && new Date().getHours() > hoursState
                  ? {}
                  : { display: "none" }
              }
            >
              {t("Tomorrow")}
            </p>
          </div>
          <div className={s.timeInline}>
            <select
              className={s.timeSelect}
              defaultValue={t("Now")}
              onChange={(e) =>
                e.target.value === t("Now")
                  ? setDeliveryNow(true)
                  : setHoursState(Number(e.target.value)) ||
                    setDeliveryNow(false)
              }
            >
              <option>{t("Now")}</option>
              {sortedHours().map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <p
              className={s.hoursMinutes}
              style={!isDeliveryNow ? {} : { display: "none" }}
            >
              {t("hr")}
            </p>
            <select
              className={s.timeSelect}
              value={minutesState}
              style={!isDeliveryNow ? {} : { display: "none" }}
              onChange={(e) => setMinutesState(Number(e.target.value))}
            >
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <p
              className={s.hoursMinutes}
              style={!isDeliveryNow ? {} : { display: "none" }}
            >
              {t("min")}
            </p>
          </div>
          <div className={s.footer}>
            <div className={s.inline}>
              <input
                name={"Promocode"}
                className={s.promocodeInput}
                style={
                  isWrongInput.promocode ? { boxShadow: "0 1px 21px red" } : {}
                }
                placeholder={t("PROMOCODE")}
                value={promocode}
                onChange={(e) => promocodeInput(e.target.value)}
                onKeyPress={(e) =>
                  e.nativeEvent.key === "Enter" && console.log("Enter")
                }
              />
              <div className={s.cartTitle}>{t("Payment method")}</div>
              <select className={s.payment}>
                <option>{t("Cart_Preposition")}</option>
                {/*<option>{t("Cash_Preposition")}</option>*/}
              </select>
            </div>
            <div className={s.inlineOrder}>
              <p>{t("Order_Noun")}</p>
              <p>{allFoodsPrice} ₽</p>
            </div>
            {footerShow === "delivery" && (
              <div className={s.inlineDelivery}>
                <p>{t("Delivery")}</p>
                <p>{deliveryCalculate} ₽</p>
              </div>
            )}
            <div className={s.inlineTotal}>
              <p>{t("Total")}</p>
              <p>
                {footerShow === "delivery" &&
                  allFoodsPrice + deliveryCalculate + " ₽"}
                {footerShow === "takeOut" && allFoodsPrice + " ₽"}
              </p>
            </div>
          </div>
          <div className={patternCart.buttonsLine}>
            <button
              className={patternCart.backButton}
              onClick={() =>
                dispatch({ type: "SET_FOOTER_SHOW", payload: "cart" })
              }
            >
              <p>←</p>
            </button>
            <button className={patternCart.buttonToPay} onClick={createOrder}>
              <p>{t("Order_Verb")}</p>
            </button>
          </div>
        </>
      )}
    </DeliveryDiv>
  );
}

const DeliveryDiv = styled.div`
  ${(props) => props.isPaymentShow && "width: 400px;"}
  ${(props) => !props.isCartOpen && "display: none;"}
`;
