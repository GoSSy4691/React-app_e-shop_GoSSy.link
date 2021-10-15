import s from "./CSS/leftBar.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function LeftBar(props) {
  //change file naming
  const categoryNumber = useSelector((state) => state.menu.categoryNumber);
  const category = useSelector((state) => state.menu.category);
  const dispatch = useDispatch();

  const changeCategory = (id) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: id });
  };

  return (
    <div className={s.barWrapper}>
      <div
        className={`${s.box} ${props.scrollPosition > 220 ? s.boxFly : null}`}
      >
        {category.map((p) => (
          <li
            className={s.categoryBox}
            style={
              p.id === categoryNumber
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
