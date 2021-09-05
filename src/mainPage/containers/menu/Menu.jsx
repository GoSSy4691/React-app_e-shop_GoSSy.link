import s from "./CSS/menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import runForestRun from "../../../files/img/runForestRun.png";
import { getMenuData } from "../../../files/API/api.js";
import Items from "./Items.jsx";
import LeftBar from "./LeftBar.jsx";

function MenuContainer() {
  const menuOnDisplay = useSelector((state) => state.menu.menuOnDisplay);
  const dispatch = useDispatch();
  switch (menuOnDisplay) {
    case "Загрузка":
      getMenuData().then((data) =>
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
    case "Ошибка":
      return <div className={s.emptyItemDialog}>Error get data</div>;
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
