import s from "./CSS/menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../../files/img/runForestRun.png";
import getShopData from "../../../files/shop/getShopData.js";
import Items from "./Items.jsx";
import LeftBar from "./LeftBar.jsx";

function MenuContainer() {
  const menu = useSelector((state) => state.menu.menuOnDisplay);
  const dispatch = useDispatch();
  switch (menu) {
    case "Загрузка":
      getShopData().then((data) =>
        dispatch({ type: "GET_ALL_MENU", payload: data })
      );
      return <div className={s.emptyItemDialog}>Loading</div>;
    case "Пусто":
      return (
        <div className={"menu_container"}>
          <LeftBar />
          <div className={s.emptyItemDialog}>Nothing find</div>
        </div>
      );
    default:
      return (
        <div className={"menu_container"}>
          <LeftBar />
          <Items />
        </div>
      );
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
