import s from "./CSS/menu.module.css";
import patternCSS from "../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../files/img/runForestRun.png";
import API from "../../files/API/api.js";
import GetImgFood from "./GetImgFood.jsx";
import Items from "./Items.jsx";
import LeftBar from "./LeftBar.jsx";

function MenuContainer() {
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
      return <div className={s.roomName}>Loading</div>;
    case "Choose shop":
      if (shops.length === 0) {
        dispatch({ type: "CHANGE_STATUS", payload: "Empty" });
        return <div className={s.roomName}>Loading</div>;
      } else {
        return (
          <div className={s.menu_container}>
            <div className={s.roomName}>Точки продаж</div>
            <div className={patternCSS.grid}>
              {shops.map((el, index) => (
                <li
                  className={patternCSS.shopsOrFood}
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
          </div>
        );
      }
    case "Choose food":
      return (
        <div className={s.menu_container}>
          <div className={s.roomName}>Точки продаж</div>
          <input className={s.searchBar} placeholder="Инфо" />
          <LeftBar />
          <Items />
        </div>
      );
    default:
      console.error(status);
      return <div className={s.roomName}>Error</div>;
  }
}

export default function Menu() {
  return (
    <div className={s.showRoom}>
      <MenuContainer />
      <img
        alt={"footer"}
        className={s.footerImg}
        src={runForestRun}
        key={Math.random()}
      />
    </div>
  );
}
