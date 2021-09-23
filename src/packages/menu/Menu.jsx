import s from "./CSS/menu.module.css";
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
      return <div className={s.menuMessage}>Loading</div>;
    case "Choose shop":
      if (shops.length === 0)
        dispatch({ type: "CHANGE_STATUS", payload: "Empty" });
      else
        return (
          <div className={"menu_container"}>
            <div className={s.roomName}>Точки продаж</div>
            <div className={s.grid}>
              {shops.map((el, index) => (
                <li
                  className={s.shops}
                  key={el.id}
                  onClick={() =>
                    dispatch({ type: "CHANGE_SHOP", payload: index })
                  }
                >
                  <GetImgFood imgName={""} style={s.img} />
                  <span className={s.naming}>{el.name}</span>
                </li>
              ))}
            </div>
          </div>
        );
      break;
    case "Choose food":
      return (
        <div className={"menu_container"}>
          <LeftBar />
          <Items />
        </div>
      );
    default:
      console.error(status);
      return <div className={s.menuMessage}>Error</div>;
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
