import patternCSS from "../patternMenu.module.css";
import s from "./CSS/foodDialog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete.jsx";
import GetImgFood from "./GetImgFood.jsx";

import exitImg from "../../files/img/exit.svg";

export default function FoodDialog(props) {
  const menu = useSelector((state) => state.menu);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const refFoodBox = useDetectClickOut(props.setChosenFood);
  const { t } = useTranslation();

  const isFoodIn = (name) => {
    let answer = cart.selectedFood.findIndex((el) => el.name === name);
    return answer > -1;
  };

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.foodBox} ref={refFoodBox}>
        <button
          className={s.exitButton}
          onClick={() => props.setChosenFood(false)}
        >
          <img alt={"exit"} src={exitImg} />
        </button>
        <div className={s.imgBox}>
          <GetImgFood imgName={props.chosenFood.icon} style={patternCSS.img} />
          <span className={s.nameBox}>
            <p>{props.chosenFood.name}</p>
          </span>
          <span className={s.cost}>{props.chosenFood.cost}&nbsp;Р.</span>
        </div>
        <div className={s.middleBox}>
          <div className={s.descriptionName}>{t("Description")}</div>
          <div className={s.descriptionBox}>{props.chosenFood.description}</div>
          {/*<div className={s.descriptionName}>Состав</div>*/}
          {/*<div className={`${s.descriptionBox} ${s.nutritionBox}`}>&nbsp;</div>*/}
        </div>
        {!isFoodIn(props.chosenFood.name) ? (
          <button
            className={s.inCartBtn}
            onClick={() =>
              dispatch({
                type: "ADD_FOOD",
                payload: {
                  name: props.chosenFood.name,
                  cost: props.chosenFood.cost,
                },
                delivery: {
                  shopName: menu.shopName,
                  shopId: menu.shopId,
                  cost: menu.points[menu.shopIndex].delivery_cost,
                  isDelivery: menu.points[menu.shopIndex].is_delivering,
                },
              })
            }
          >
            {t("Add")}
          </button>
        ) : (
          <div className={s.foodBoxFooter}>
            <ButtonDelete
              name={props.chosenFood.name}
              cost={props.chosenFood.cost}
              style={s.addRemoveButton}
              text={"-"}
            />
            <span className={s.countOnFooter}>
              {
                cart.selectedFood.find(
                  (el) => el.name === props.chosenFood.name
                ).amount
              }
              &nbsp;{t("pcs")}.
            </span>
            <ButtonAdd
              name={props.chosenFood.name}
              cost={props.chosenFood.cost}
              style={s.addRemoveButton}
              text={"+"}
            />
            <span className={s.costDescription}>{t("Total")}</span>
            <span className={s.costFooter}>
              {
                cart.selectedFood.find(
                  (el) => el.name === props.chosenFood.name
                ).costAll
              }
              &nbsp;р.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
