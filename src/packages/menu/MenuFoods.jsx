import s from "./CSS/menuFoods.module.css";
import patternCSS from "../patternMenu.module.css";
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

  //load more foods when scroll to the bottom
  if (menu.isReachedBottom && menu.unloadedPages > 0) {
    API.getMenu(menu.loadedPages + 1, menu.howManyLoad, menu.shopId)
      .then((res) => {
        dispatch({ type: "LOAD_MENU_MORE", payload: { menu: res.data.data } });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "ERROR_MESSAGE", payload: "Can't load more foods" });
      });
  }

  function searchFood(input) {
    setSearch(input);
    if (menu.unloadedPages > 0) {
      dispatch({ type: "SUCCESS_MESSAGE", payload: "Search in all menu" });
      API.getMenu(1, 100, menu.shopId)
        .then((res) => {
          dispatch({
            type: "LOAD_MENU",
            payload: {
              shopName: menu.shopName,
              id: menu.shopId,
              menu: res.data.data,
              loadedPages: 1,
              unloadedPages: res.data.meta.pages - 1,
              setCategory: menu.categoryNow,
            },
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({
            type: "ERROR_MESSAGE",
            payload: "Can't load all menu for search",
          });
        });
    }
  }

  const menuChosen = menu.menuOnDisplay.filter(
    (el) => el.name.toLowerCase().search(search) >= 0
  );

  return (
    <>
      <div className={patternCSS.roomName}>
        <button
          onClick={() =>
            dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Shops" })
          }
        >
          <img alt={"Back"} src={arrowBack} />
        </button>
        <span>{menu.shopName}</span>
      </div>
      <input
        className={s.searchBar}
        placeholder="Search"
        value={search}
        onChange={(e) => searchFood(e.target.value.toLowerCase())}
      />
      <CategoryBar />
      {menuChosen.length === 0 ? (
        <div className={s.emptyDialog}>Такой еды нет в меню</div>
      ) : (
        <div className={patternCSS.grid} style={{ marginTop: "25px" }}>
          {menuChosen.map((el) => (
            <button
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
            </button>
          ))}
        </div>
      )}
      {chosenFood.isShow ? (
        <FoodDialog chosenFood={chosenFood} setChosenFood={setChosenFood} />
      ) : null}
    </>
  );
}
