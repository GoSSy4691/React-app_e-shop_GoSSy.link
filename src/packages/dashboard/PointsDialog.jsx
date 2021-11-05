import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import API from "../../files/API/api.js";

export default function PointsDialog() {
  const pointsData = useSelector((state) => state.admin.points);
  const dispatch = useDispatch();
  const refUsers = useDetectClickOut(() =>
    dispatch({ type: "SET_BAR_SHOW" })
  );

  function loadingPoints() {
    API.getPoints()
      .then((res) =>
        dispatch({ type: "LOAD_ALL_POINTS", payload: res.data.data })
      )
      .catch((error) => console.error(error));
    return <p>Loading...</p>;
  }

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refUsers}>
        <button
          className={patternMenu.closeButton}
          onClick={() => dispatch({ type: "SET_BAR_SHOW" })}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>Points:</div>
        {pointsData.length === 0 ? (
          loadingPoints()
        ) : (
          <>
            <li className={patternDashboard.line} key={"title"}>
              <p style={{ width: 30 }}>№</p>
              <p style={{ width: 120 }}>Name</p>
              <p style={{ width: 180 }}>Address</p>
              <p style={{ width: 160 }}>Delivery</p>
            </li>
            <div className={patternDashboard.scrollAbleDashboard}>
              {pointsData.map((el, index) => (
                <li
                  className={`${patternDashboard.line} ${patternDashboard.hover}`}
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: "SET_BAR_SHOW",
                      payload: { show: "menu", pointId: el.id },
                    })
                  }
                >
                  <p style={{ width: 30 }}>{index + 1}</p>
                  <p style={{ width: 120 }}>{el.name}</p>
                  <p style={{ width: 180 }}>{el.address}</p>
                  <p style={{ width: 160 }}>
                    {el.is_delivering ? el.delivery_cost : "None"}
                  </p>
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
