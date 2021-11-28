import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import zloiAPI from "../../files/API/zloiAPI.js";
import yookassaWidget from "../../files/widgets/yookassa.js";

export default function OrderContentDialog(props) {
  const theOrder = useSelector((state) => state.admin.theOrder);
  const [isPaymentShow, setPaymentShow] = useState(false);
  const refBox = useDetectClickOut(props.setOrderContentShow);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function removeOrder() {
    zloiAPI
      .deleteOrder(cookies.get("Token"), theOrder.id)
      .then(() => {
        dispatch({
          type: "SHOW_MESSAGE",
          payload: "Order " + theOrder.id + " deleted",
          color: "green",
        });
        dispatch({ type: "CLEAN_ORDERS_LIST" });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: "SHOW_MESSAGE",
          payload: "Delete order error",
          color: "red",
        });
      });
  }

  function createPaymentAgain() {
    setPaymentShow(true);
    yookassaWidget(theOrder.payments[0].token).render("payment-form");
  }

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refBox}>
        <button
          className={patternMenu.exitButtonBig}
          onClick={() => props.setOrderContentShow(false)}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>
          Order id - {theOrder.id}:
        </div>
        <div
          id={"payment-form"}
          className={patternDashboard.paymentFormOrderContent}
        />
        {!isPaymentShow && (
          <>
            <li className={patternDashboard.line} key={"title"}>
              <p style={{ width: 30 }}>№</p>
              <p style={{ width: 300 }}>Food</p>
              <p style={{ width: 80 }}>Count</p>
              <p style={{ width: 80 }}>Cost</p>
            </li>
            <div className={patternDashboard.scrollAbleDashboard}>
              {theOrder.content.map((el, index) => (
                <li
                  className={`${patternDashboard.line} ${patternDashboard.hover}`}
                  key={index}
                >
                  <p style={{ width: 30 }}>{index + 1}</p>
                  <p style={{ width: 300 }}>{el.menu.name}</p>
                  <p style={{ width: 80 }}>{el.count}</p>
                  <p style={{ width: 80 }}>{el.cost}</p>
                </li>
              ))}
            </div>
            <div className={patternDashboard.footerTheOrderDialog}>
              <button
                className={patternDashboard.footerTheOrderDialogButton}
                onClick={removeOrder}
              >
                Close order
              </button>
              <button
                className={patternDashboard.footerTheOrderDialogButton}
                onClick={createPaymentAgain}
              >
                Pay again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
