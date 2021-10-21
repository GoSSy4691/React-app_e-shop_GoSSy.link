import s from "./CSS/categoryBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import API from "../../files/API/api";

export default function CategoryBar() {
  const menu = useSelector((state) => state.menu);
  const isCategoryMoved = useSelector((state) => state.scroll.isCategoryMoved);
  const dispatch = useDispatch();

  function changeCategory(id) {
    if (id === 0) {
      dispatch({ type: "CHANGE_CATEGORY", payload: id });
    } else {
      //if you haven't all menu
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
                setCategory: id,
              },
            });
          })
          .catch((err) => {
            console.error(err);
            dispatch({ type: "ERROR_MESSAGE", payload: "Can't load category" });
          });
      } else {
        //if you have loaded menu
        dispatch({ type: "CHANGE_CATEGORY", payload: id });
      }
    }
  }

  return (
    <div className={s.barWrapper}>
      <div className={`${s.box} ${isCategoryMoved && s.boxFly}`}>
        {menu.category.map((p) => (
          <li
            className={s.categoryBox}
            style={
              p.id === menu.categoryNow
                ? { borderBottom: "solid 2px#414EBB" }
                : null
            }
            key={p.id}
            title={p.name}
            onClick={() => changeCategory(p.id)}
          >
            <span className={s.categoryType}>{p.name}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
