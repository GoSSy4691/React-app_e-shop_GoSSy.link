import s from "./CSS/menuFoods.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetImgFood from "./GetImgFood.jsx";
import CategoryBar from "./CategoryBar.jsx";
import FoodDialog from "./FoodDialog.jsx";

import arrowBack from "../../files/img/arrowBack.svg";

export default function MenuFoods(props) {
  const [search, setSearch] = useState("");
  const [chosenFood, setChosenFood] = useState({ isShow: false });
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const menuChosen = menu.menuOnDisplay.filter(
    (el) => el.name.toLowerCase().search(search) >= 0
  );

  return (
    <>
      <div className={patternCSS.roomName}>
        <img
          alt={"Back"}
          src={arrowBack}
          className={s.arrowBack}
          onClick={() =>
            dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Shops" })
          }
        />
        <span>{menu.shopName}</span>
      </div>
      <input
        className={s.searchBar}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <CategoryBar scrollPosition={props.scrollPosition} />
      {menuChosen.length === 0 ? (
        <div className={s.emptyDialog}>Такой еды нет в меню</div>
      ) : (
        <div className={patternCSS.grid} style={{ marginTop: "25px" }}>
          {menuChosen.map((el) => (
            <li
              className={patternCSS.shopOrFood}
              key={el.id}
              onClick={() =>
                setChosenFood({
                  isShow: true,
                  name: el.name,
                  cost: el.cost,
                  icon: el.icon,
                  description: el.description,
                })
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
      {chosenFood.isShow ? (
        <FoodDialog chosenFood={chosenFood} setChosenFood={setChosenFood} />
      ) : null}
    </>
  );
}
