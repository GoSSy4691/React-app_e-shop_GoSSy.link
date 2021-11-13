import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../../files/useDetectClickOut.js";

export default function OrderContentDialog() {
  const orderContent = useSelector((state) => state.admin.orderContent);
  const dispatch = useDispatch();
  const refBox = useDetectClickOut(() =>
    dispatch({ type: "SET_BAR_SHOW", payload: "orders" })
  );

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refBox}>
        <button
          className={patternMenu.closeButton}
          onClick={() => dispatch({ type: "SET_BAR_SHOW", payload: "orders" })}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>Points:</div>
        <li className={patternDashboard.line} key={"title"}>
          <p style={{ width: 30 }}>№</p>
          <p style={{ width: 300 }}>Food</p>
          <p style={{ width: 80 }}>Count</p>
          <p style={{ width: 80 }}>Cost</p>
        </li>
        <div className={patternDashboard.scrollAbleDashboard}>
          {orderContent.map((el, index) => (
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
      </div>
    </div>
  );
}
