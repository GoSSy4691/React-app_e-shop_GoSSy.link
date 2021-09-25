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
        <svg
          width="21"
          height="19"
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() =>
            dispatch({ type: "CHANGE_STATUS", payload: "Choose shop" })
          }
        >
          <path
            d="M8.24701 16.2337C8.67423 16.7423 8.67423 17.5429 8.24701 18.0515C7.8198 18.5429 7.14722 18.5429 6.72 18.0515L0.320414 10.4341C0.1222 10.1982 1.90735e-06 9.87055 1.90735e-06 9.50744C1.90735e-06 9.14432 0.1222 8.81672 0.320414 8.5796L6.72 0.962193C7.14722 0.453602 7.8198 0.453602 8.24701 0.962193C8.67423 1.47078 8.67423 2.27147 8.24701 2.78006L3.66502 8.21649H19.931C20.5266 8.21534 21 8.79724 21 9.50629C21 10.2153 20.5266 10.7789 19.931 10.7789L3.66598 10.7789L8.24701 16.2337Z"
            fill="#adb4b0"
          />
        </svg>

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
