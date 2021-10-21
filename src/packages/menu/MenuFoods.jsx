import s from "./CSS/menuFoods.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../files/API/api.js";
import GetImgFood from "./GetImgFood.jsx";
import CategoryBar from "./CategoryBar.jsx";
import FoodDialog from "./FoodDialog.jsx";

import arrowBack from "../../files/img/arrowBack.svg";

export default function MenuFoods() {
  const menu = useSelector((state) => state.menu);
  const [chosenFood, setChosenFood] = useState({ isShow: false }); //need object?
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  console.log(menu);

  //load more foods when scroll to the bottom
  if (menu.isReachedBottom && menu.unloadedPages > 0) {
    console.log("Get more and more");
    API.getMenu(menu.loadedPages + 1, 10, menu.shopId)
      .then((res) => {
        dispatch({ type: "LOAD_MENU_MORE", payload: { menu: res.data.data } });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "ERROR_MESSAGE", payload: "Can't load more foods" });
      });
  }

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
      <CategoryBar />
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
