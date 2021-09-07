import s from "./CSS/leftBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetImgFood from "./GetImgFood.jsx";

export default function LeftBar() {
  const [isCategoryShow, getCategoryShow] = useState(false);
  const categoryAll = useSelector((state) => state.menu.categoryAll);
  const dispatch = useDispatch();
  const changeCategory = (id) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: id });
  };

  return (
    <div
      className={s.box}
      style={isCategoryShow ? { width: "fit-content" } : { width: "60px" }}
    >
      <button
        className={s.categoryButton}
        onClick={() => getCategoryShow(!isCategoryShow)}
        is_category_show={isCategoryShow.toString()}
        // onAnimationEnd={() => getCategoryShow(false)}
      >
        <span />
        <span />
        <span />
      </button>
      {categoryAll.map((p) => (
        <button
          className={s.categoryBox}
          key={p.id}
          title={p.name}
          onClick={() => changeCategory(p.id)}
        >
          <span>
            <GetImgFood imgName={p.icon} style={s.categoryImg} />
          </span>
          <span className={s.categoryType}>{p.name}</span>
        </button>
      ))}
    </div>
  );
}
