import { useDispatch } from "react-redux";

export function ButtonAdd(props) {
  const dispatch = useDispatch();

  const addFood = (name) => {
    dispatch({ type: "ADD_FOOD", payload: name });
  };

  return (
    <button className={props.style} onClick={() => addFood(props.name)}>
      add
    </button>
  );
}

export function ButtonDelete(props) {
  const dispatch = useDispatch();

  const deleteFood = (name) => {
    dispatch({ type: "DELETE_FOOD", payload: name });
  };

  return (
    <button className={props.style} onClick={() => deleteFood(props.name)}>
      -
    </button>
  );
}
