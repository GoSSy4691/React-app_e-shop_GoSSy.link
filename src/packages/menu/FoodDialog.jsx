import patternCSS from "../pattern.module.css";
import s from "./CSS/foodDialog.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../useDetectClickOut.js";
import { ButtonAdd, ButtonDelete } from "./ButtonAddDelete.jsx";
import GetImgFood from "./GetImgFood.jsx";

import exitImg from "../../files/img/exit.svg";

export default function FoodDialog(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const refFoodBox = useDetectClickOut(
    props.chosenFood.isShow,
    props.setChosenFood
  );

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
          <div className={s.descriptionName}>Описание</div>
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
              })
            }
          >
            В корзину
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
              &nbsp;шт.
            </span>
            <ButtonAdd
              name={props.chosenFood.name}
              cost={props.chosenFood.cost}
              style={s.addRemoveButton}
              text={"+"}
            />
            <span className={s.costDescription}>Итого</span>
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
