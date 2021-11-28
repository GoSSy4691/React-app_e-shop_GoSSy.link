import s from "./errorPopup.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ErrorPopup() {
  let error = useSelector((state) => state.error);
  const [isShow, setIsShow] = useState(false);

  if (error.message.length > 0 && !isShow) setIsShow(true);
  setTimeout(() => {
    error.message = "";
    setIsShow(false);
  }, 4000);

  return (
    <>
      {isShow && (
        <div
          className={`
            ${s.errorLog} 
            ${error.color === "red" && s.colorRed}
            ${error.color === "yellow" && s.colorYellow}
            ${error.color === "green" && s.colorGreen}
            `}
        >
          {error.message}
        </div>
      )}
    </>
  );
}
