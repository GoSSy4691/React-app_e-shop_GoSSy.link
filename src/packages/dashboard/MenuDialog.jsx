import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import API from "../../files/API/api.js";

import imageSVG from "../../files/img/adminBar/images.svg";

export default function MenuDialog() {
  const pointId = useSelector((state) => state.admin.pointId);
  const menu = useSelector((state) => state.admin.menu);
  const dispatch = useDispatch();
  const refUsers = useDetectClickOut(true, () =>
    dispatch({ type: "SET_BAR_SHOW", payload: "points" })
  );

  function loadingMenu() {
    API.getMenu(1, 100, pointId)
      .then((res) =>
        dispatch({ type: "LOAD_ALL_MENU", payload: res.data.data })
      )
      .catch((error) => console.error(error));
    return <p>Loading...</p>;
  }

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refUsers}>
        <button
          className={patternMenu.closeButton}
          onClick={() => dispatch({ type: "SET_BAR_SHOW", payload: "points" })}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>Menu:</div>
        {menu.length === 0 ? (
          loadingMenu()
        ) : (
          <>
            <li className={patternDashboard.line} key={"title"}>
              <p style={{ width: 30 }}>№</p>
              <p style={{ width: 190 }}>Name</p>
              <p style={{ width: 120 }}>Cost</p>
              <p style={{ width: 90 }}>Icon</p>
              <p style={{ width: 60 }}>Show</p>
            </li>
            <div className={patternDashboard.scrollAbleDashboard}>
              {menu.map((el, index) => (
                <button
                  className={`${patternDashboard.line} ${patternDashboard.hover}`}
                  key={index}
                >
                  <p style={{ width: 30 }}>{index + 1}</p>
                  <p style={{ width: 190 }}>{el.name}</p>
                  <p style={{ width: 120 }}>{el.cost}&nbsp;р.</p>
                  <p style={{ width: 90, margin: 0 }}>
                    <img alt={"images"} src={imageSVG} style={{ height: 35 }} />
                  </p>
                  <p style={{ width: 60 }}>
                    <input
                      type={"checkbox"}
                      checked={el.status === "active"}
                      readOnly
                    />
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
