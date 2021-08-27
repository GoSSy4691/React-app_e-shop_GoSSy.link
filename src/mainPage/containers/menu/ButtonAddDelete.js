import { useDispatch } from "react-redux";

export function ButtonAdd(props) {
  const dispatch = useDispatch();

  const addFood = (foodName) => {
    dispatch({ type: "ADD_FOOD", payload: foodName });
  };

  return (
    <button className={props.style} onClick={() => addFood(props.foodName)}>
      {props.text}
    </button>
  );
}

export function ButtonDelete(props) {
  const dispatch = useDispatch();

  const deleteFood = (foodName) => {
    dispatch({ type: "DELETE_FOOD", payload: foodName });
  };

  return (
    <button className={props.style} onClick={() => deleteFood(props.foodName)}>
      {props.text}
    </button>
  );
}
