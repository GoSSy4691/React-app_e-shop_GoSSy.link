import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export function ButtonAdd(props) {
  const dispatch = useDispatch();

  return (
    <button
      className={props.style}
      onClick={() =>
        dispatch({
          type: "ADD_FOOD",
          payload: { name: props.name, cost: props.cost },
        })
      }
    >
      {props.text}
    </button>
  );
}

export function ButtonDelete(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isRemovable, setRemovable] = useState(props.count !== 1);

  useEffect(() => {
    setRemovable(props.count !== 1);
  }, [props.count]);

  return (
    <button
      className={props.style}
      onClick={
        isRemovable
          ? () => {
              dispatch({
                type: "DELETE_FOOD",
                payload: { name: props.name, cost: props.cost },
              });
            }
          : () => {
              setRemovable(true);
              dispatch({
                type: "SHOW_MESSAGE",
                payload: t("Click again to remove this food"),
                color: "yellow",
              });
            }
      }
    >
      {props.text}
    </button>
  );
}
