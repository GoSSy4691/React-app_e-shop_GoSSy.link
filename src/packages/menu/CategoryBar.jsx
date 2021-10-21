import s from "./CSS/categoryBar.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryBar() {
  const menu = useSelector((state) => state.menu);
  const isCategoryMoved = useSelector((state) => state.scroll.isCategoryMoved);
  const dispatch = useDispatch();

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
            onClick={() => dispatch({ type: "CHANGE_CATEGORY", payload: p.id })}
          >
            <span className={s.categoryType}>{p.name}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
