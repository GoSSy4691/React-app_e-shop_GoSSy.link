import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import API from "../../files/API/api.js";

export default function OrderContentDialog() {
  const theOrder = useSelector((state) => state.admin.theOrder);
  const dispatch = useDispatch();
  const refBox = useDetectClickOut(() =>
    dispatch({ type: "SET_BAR_SHOW", payload: "orders" })
  );
  const cookies = new Cookies();

  function closeOrder() {
    API.deleteOrder(cookies.get("Token"), theOrder.id)
      .then(() => {
        dispatch({
          type: "SUCCESS_MESSAGE",
          payload: "Order " + theOrder.id + " deleted",
        });
        dispatch({ type: "REFRESH_AND_OPEN_ORDERS" });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "ERROR_MESSAGE", payload: "Delete order error" });
      });
  }

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refBox}>
        <button
          className={patternMenu.closeButton}
          onClick={() => dispatch({ type: "SET_BAR_SHOW", payload: "orders" })}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>
          Order id - {theOrder.id}:
        </div>
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
        <button
          className={patternDashboard.closeOrderButton}
          onClick={closeOrder}
        >
          Close order
        </button>
      </div>
    </div>
  );
}
