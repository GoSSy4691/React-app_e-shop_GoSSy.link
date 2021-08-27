import s from "./CSS/items.module.css";
import { useSelector } from "react-redux";
import GetImgFood from "./getImgFood.js";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete.js";

export default function Items() {
  const store = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu.menuOnDisplay);

  const isFoodIn = (name) => {
    return store.selectedFood.has(name);
  };

  return (
    <div className={s.menuItems}>
      {menu.map((p) => (
        <li
          className={s.foodElement}
          style={isFoodIn(p.name) ? { background: "#1d3e1f" } : null}
          key={p.id}
        >
          <div
            className={`
            ${s.item} 
            ${isFoodIn(p.name) ? s.itemActive : s.itemNotActive}
            `}
          >
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
                      <ButtonDelete
                        text={"-"}
                        foodName={p.name}
                        style={s.deleteItem}
                      />
                      <div className={s.countItem}>
                        {store.selectedFood.get(p.name)}
                      </div>
                    </div>
                  );
                }
              })()}
              <ButtonAdd text={"add"} foodName={p.name} style={s.buyButton} />
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
        </li>
      ))}
    </div>
  );
}
