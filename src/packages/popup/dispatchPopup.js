import { useDispatch } from "react-redux";

export default function useDispatchPopup() {
  const dispatch = useDispatch();
  return (action) => {
    switch (action.type) {
      case "ERROR":
        dispatch({ type: "_POPUP_RED", payload: action.payload });
        setTimeout(() => {
          dispatch({ type: "_POPUP_CLEAN" });
        }, 4000);
        break;
      case "SUCCESS":
        dispatch({ type: "_POPUP_GREEN", payload: action.payload });
        setTimeout(() => {
          dispatch({ type: "_POPUP_CLEAN" });
        }, 4000);
        break;
      default:
        console.log("wrong type for custom hook useDispatchPopup");
    }
  };
}
