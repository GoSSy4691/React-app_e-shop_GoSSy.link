import s from "./CSS/menuFoods.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetImgFood from "./GetImgFood.jsx";
import LeftBar from "./LeftBar.jsx";

export default function MenuFoods() {
  const [search, setSearch] = useState("");
  const menu = useSelector((state) => state.menu.menuOnDisplay);
  const data = useSelector((state) => state.menu.data);
  const shopId = useSelector((state) => state.menu.shopId);
  const dispatch = useDispatch();

  const menuChosen = menu.filter(
    (el) => el.name.toLowerCase().search(search) >= 0
  );

  return (
    <>
      <div className={patternCSS.roomName}>
        <span
          className={s.arrowBack}
          onClick={() =>
            dispatch({ type: "CHANGE_STATUS", payload: "Choose shop" })
          }
        >
          ←
        </span>
        <span>{data[shopId].name}</span>
      </div>
      <input
        className={s.searchBar}
        placeholder="Инфо"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <LeftBar />
      {menuChosen.length === 0 ? (
        <div className={s.emptyDialog}>Такой еды нет в меню</div>
      ) : (
        <div className={patternCSS.grid} style={{ marginTop: "25px" }}>
          {menuChosen.map((el) => (
            <li
              className={patternCSS.shopOrFood}
              key={el.id}
              onClick={() =>
                dispatch({ type: "ERROR_MESSAGE", payload: "Didn't work yet" })
              }
            >
              <GetImgFood imgName={el.icon} style={patternCSS.img} />
              <div className={patternCSS.footerItem}>
                <span className={patternCSS.nameFood}>{el.name}</span>
                <div className={s.costBox}>
                  <span>{el.cost}&nbsp;р.</span>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </>
  );
}
