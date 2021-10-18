import s from "./CSS/menuShops.module.css";
import patternCSS from "../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../files/img/runForestRun.png";
import API from "../../files/API/api.js";
import GetImgFood from "./GetImgFood.jsx";
import MenuFoods from "./MenuFoods.jsx";
import AdminBar from "./AdminBar.jsx";

function MenuContainer(props) {
  const status = useSelector((state) => state.menu.status);
  const shops = useSelector((state) => state.menu.shops);
  const dispatch = useDispatch();

  switch (status) {
    case "Empty":
      API.getShops()
        .then((data) => {
          dispatch({ type: "LOAD_DATA", payload: data.data });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", payload: err.message });
        });
      return <div className={patternCSS.roomName}>Loading</div>;
    case "Choose shop":
      if (shops.length === 0) {
        dispatch({ type: "CHANGE_STATUS", payload: "Empty" });
        return <div className={patternCSS.roomName}>Loading</div>;
      } else {
        return (
          <>
            <div className={patternCSS.roomName}>Точки продаж</div>
            <div className={patternCSS.grid} style={{ marginTop: "44px" }}>
              {shops.map((el, index) => (
                <li
                  className={patternCSS.shopOrFood}
                  key={el.id}
                  onClick={() =>
                    dispatch({ type: "CHANGE_SHOP", payload: index })
                  }
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
      }
    case "Choose food":
      return <MenuFoods scrollPosition={props.scrollPosition} />;
    default:
      console.error(status);
      return <div className={patternCSS.roomName}>Error</div>;
  }
}

export default function MenuShops(props) {
  return (
    <>
      <AdminBar />
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
