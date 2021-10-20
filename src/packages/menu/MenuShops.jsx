import s from "./CSS/menuShops.module.css";
import patternCSS from "../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import API from "../../files/API/api.js";
import GetImgFood from "./GetImgFood.jsx";
import MenuFoods from "./MenuFoods.jsx";
import AdminBar from "./AdminBar.jsx";

import runForestRun from "../../files/img/runForestRun.png";

function MenuContainer(props) {
  const userView = useSelector((state) => state.menu.userView);
  const points = useSelector((state) => state.menu.points);
  const dispatch = useDispatch();

  function getPoints() {
    API.getPoints()
      .then((res) => {
        dispatch({ type: "LOAD_POINTS", payload: res.data.data });
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Shops" });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "ERROR_MESSAGE", payload: "Error get points" });
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
      });
  }

  async function openMenu(shopName, shopIndex) {
    let categoryBuffer = [];
    dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Loading" });
    await API.getCategory(shopIndex)
      .then((res) => {
        categoryBuffer = res.data.data;
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "ERROR_MESSAGE", payload: "Can't get category" });
      });
    API.getMenu(1, 10, shopIndex)
      .then((res) => {
        dispatch({
          type: "LOAD_MENU",
          payload: { shopName, menu: res.data.data, categoryBuffer },
        });
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Menu" });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
      });
  }

  switch (userView) {
    case "Loading":
      if (points.length === 0) getPoints();
      return <div className={patternCSS.roomName}>Loading</div>;
    case "Shops":
      return (
        <>
          <div className={patternCSS.roomName}>Shops:</div>
          <div className={patternCSS.grid} style={{ marginTop: "44px" }}>
            {points.map((el) => (
              <li
                className={patternCSS.shopOrFood}
                key={el.id}
                onClick={() => openMenu(el.name, el.id)}
              >
                <GetImgFood imgName={el.icon} style={patternCSS.img} />
                <div className={patternCSS.footerItem}>
                  <span className={patternCSS.nameFood}>{el.name}</span>
                </div>
              </li>
            ))}
          </div>
        </>
      );
    case "Menu":
      return <MenuFoods scrollPosition={props.scrollPosition} />;
    case "Error":
      return <div className={patternCSS.roomName}>Error get points</div>;
    default:
      console.error("User can't view it = " + userView);
  }
}

export default function MenuShops(props) {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      {userData !== undefined && userData.login === "admin" && <AdminBar />}
      <div className={s.showRoom}>
        <MenuContainer scrollPosition={props.scrollPosition} />
        <div className={s.footer}>
          <img
            alt={"footer"}
            className={s.footerImg}
            src={runForestRun}
            key={Math.random()}
          />
        </div>
      </div>
    </>
  );
}
