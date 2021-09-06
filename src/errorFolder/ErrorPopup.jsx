import { useSelector } from "react-redux";
import s from "./errorPopup.module.css";

export default function ErrorPopup() {
  const popupMassage = useSelector((state) => state.errorData.lastPopup);
  const popupType = useSelector((state) => state.errorData.typePopup);
  return (
    <div
      className={`
            ${s.errorLog} 
            ${popupType === "red" ? s.error : null}
            ${popupType === "green" ? s.popupGreen : null}
            `}
    >
      {popupMassage}
    </div>
  );
}
