import s from "./CSS/leftBar.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function LeftBar() {
  const categoryAll = useSelector((state) => state.menu.categoryAll);
  const dispatch = useDispatch();
  const changeCategory = (id) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: id });
  };

  return (
    <div className={s.box}>
      {categoryAll.map((p) => (
        <button
          className={s.type}
          onClick={() => changeCategory(p.id)}
          key={p.id}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
