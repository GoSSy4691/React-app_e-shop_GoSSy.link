import s from "./CSS/items.module.css";
import patternCSS from "../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import GetImgFood from "./GetImgFood.jsx";

export default function Items() {
  const menu = useSelector((state) => state.menu.menuOnDisplay);
  const dispatch = useDispatch();

  return (
    <div className={patternCSS.grid}>
      {menu.length === 0 ? (
        <div className={s.emptyDialog}>Empty</div>
      ) : (
        menu.map((el) => (
          <li
            className={patternCSS.shopsOrFood}
            key={el.id}
            onClick={() =>
              dispatch({ type: "ERROR_MESSAGE", payload: "Didn't work yet" })
            }
          >
            <GetImgFood imgName={el.icon} style={patternCSS.img} />
            <div className={patternCSS.footerItem}>
              <span className={patternCSS.nameFood}>{el.name}</span>
              <span className={s.cost}>{el.cost} р.</span>
            </div>
          </li>
        ))
      )}
    </div>
  );
}
