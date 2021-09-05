import { useSelector } from "react-redux";
import s from "./errorPopup.module.css";

export default function ErrorPopup() {
  const errorData = useSelector((state) => state.errorData);
  return (
    <div
      className={`
            ${s.errorLog} 
            ${errorData.isItError ? s.errorLogActive : null}
            `}
    >
      {errorData.lastError}
    </div>
  );
}
