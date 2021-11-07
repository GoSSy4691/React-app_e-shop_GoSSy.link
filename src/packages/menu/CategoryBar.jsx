import s from "./CSS/categoryBar.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryBar() {
  const menu = useSelector((state) => state.menu);
  const isCategoryMoved = useSelector((state) => state.scroll.isCategoryMoved);
  const dispatch = useDispatch();

  function changeCategory(id) {
    if (id === 0) {
      dispatch({ type: "CHANGE_CATEGORY", payload: id });
    } else {
      dispatch({ type: "CHANGE_CATEGORY", payload: id });
    }
  }

  return (
    <div className={`${s.barWrapper} ${isCategoryMoved && s.boxFly}`}>
      {menu.points[menu.shopIndex].category &&
        menu.points[menu.shopIndex].category.map((el) => (
          <div
            className={s.categoryBox}
            style={
              el.id === menu.categoryNow
                ? { borderBottom: "solid 2px #414EBB" }
                : { borderBottom: "solid 2px #c4c4c4" }
            }
            key={el.id}
          >
            <button
              className={s.categoryName}
              onClick={() => changeCategory(el.id)}
            >
              {el.name}
            </button>
          </div>
        ))}
    </div>
  );
}
