import { useSelector } from "react-redux";
import s from "./errorPopup.module.css";

export default function ErrorPopup() {
  const popupMessage = useSelector((state) => state.error.lastPopup);
  const popupType = useSelector((state) => state.error.typePopup);
  return (
    <div
      className={`
            ${s.errorLog} 
            ${popupType === "red" ? s.error : null}
            ${popupType === "green" ? s.popupGreen : null}
            `}
    >
      {popupMessage}
    </div>
  );
}
