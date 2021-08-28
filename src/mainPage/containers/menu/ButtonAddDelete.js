import { useDispatch } from "react-redux";

export function ButtonAdd(props) {
  const dispatch = useDispatch();
  const addFood = (name, cost) => {
    dispatch({ type: "ADD_FOOD", payload: { name, cost } });
  };

  return (
    <button
      className={props.style}
      onClick={() => addFood(props.name, props.cost)}
    >
      {props.text}
    </button>
  );
}

export function ButtonDelete(props) {
  const dispatch = useDispatch();
  const deleteFood = (name, cost) => {
    dispatch({ type: "DELETE_FOOD", payload: { name, cost } });
  };

  return (
    <button
      className={props.style}
      onClick={() => deleteFood(props.name, props.cost)}
    >
      {props.text}
    </button>
  );
}
