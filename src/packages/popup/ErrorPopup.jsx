import { useDispatch, useSelector } from "react-redux";
import s from "./errorPopup.module.css";

export default function ErrorPopup() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  setTimeout(() => {
    dispatch({ type: "CLEAN_MESSAGE" });
  }, 4000);

  return (
    <div
      className={`
            ${s.errorLog} 
            ${error.type === "red" ? s.error : null}
            ${error.type === "green" ? s.popupGreen : null}
            `}
    >
      {error.message}
    </div>
  );
}
