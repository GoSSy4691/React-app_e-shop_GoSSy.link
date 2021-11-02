import s from "./CSS/patternDashboard.module.css";
import patternCSS from "../../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../../../files/useDetectClickOut.js";
import API from "../../../files/API/api.js";

export default function PointsDialog(props) {
  const refUsers = useDetectClickOut(props.isPointsShow, props.setPointsShow);
  const pointsData = useSelector((state) => state.admin.points);
  const dispatch = useDispatch();

  function loadingUsers() {
    API.getPoints()
      .then((res) => dispatch({ type: "LOAD_ALL_POINTS", payload: res.data.data }))
      .catch((error) => console.error(error));
    return <p>Loading...</p>;
  }

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.showUsers} ref={refUsers}>
        <button
          className={patternCSS.closeButton}
          onClick={() => props.setShowCart(false)}
        >
          ✖
        </button>
        <div className={s.usersTitle}>Points:</div>
        {pointsData.length === 0 ? (
          loadingUsers()
        ) : (
          <>
            <li className={s.line} key={"title"}>
              <p className={s.number}>№</p>
              <p className={s.name}>Name</p>
              <p className={s.address}>Address</p>
              <p className={s.delivery}>Delivery</p>
            </li>
            {pointsData.map((el, index) => (
              <li className={s.line} key={index}>
                <p className={s.number}>{index + 1}</p>
                <p className={s.name}>{el.name}</p>
                <p className={s.address}>{el.address}</p>
                <p className={s.delivery}>{el.is_delivering ? el.delivery_cost : "None"}</p>
              </li>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
