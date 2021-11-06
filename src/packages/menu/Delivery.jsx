import s from "./CSS/cart.module.css";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
import useDetectClickOut from "../../files/useDetectClickOut.js";


export default function Delivery(props) {
  const refCart = useDetectClickOut(props.setFooterShow);
  // const { t } = useTranslation();

  return (
    <div className={s.showCart} ref={refCart}>
      <div className={s.scrollAbleCart}>

      </div>
    </div>
  );
}