import s from "./CSS/items.module.css";
import { useDispatch, useSelector } from "react-redux";
import GetImgFood from "./getImgFood.js";

export default function Items(props) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const addFood = (name) => {
    dispatch({ type: "ADD_FOOD", payload: name });
  };

  const deleteFood = (name) => {
    dispatch({ type: "DELETE_FOOD", payload: name });
  };

  const isFoodIn = (name) => {
    return store.selectedFood.has(name);
  };

  return (
    <div>
      {props.menu.map((p) => (
        <div
          className={isFoodIn(p.name) ? s.foodElementInOrder : s.foodElement}
          key={p.id}
        >
          <div className={isFoodIn(p.name) ? s.itemInOrder : s.item}>
            <GetImgFood imgName={p.icon} />
            <div className={s.name}>
              <div>{p.name}</div>
            </div>
            <div className={s.sectorOfPriceCountBuy}>
              <div className={s.price}>
                <div>{p.cost + " ₽"}</div>
              </div>
              {(() => {
                if (isFoodIn(p.name)) {
                  return (
                    <div className={s.deleteAndCountFood}>
                      <button
                        className={s.deleteItem}
                        onClick={() => deleteFood(p.name)}
                      >
                        -
                      </button>
                      <div className={s.countItem}>
                        {store.selectedFood.get(p.name)}
                      </div>
                    </div>
                  );
                }
              })()}
              <button className={s.buyButton} onClick={() => addFood(p.name)}>
                add
              </button>
            </div>
            <div className={s.description}>
              {(() => {
                if (p.description.length < 1) {
                  p.description = "Пока ещё нет описания. Но это очень вкусно";
                }
              })()}
              {p.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
