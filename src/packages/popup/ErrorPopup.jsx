import { useState } from "react";
import { useSelector } from "react-redux";
import s from "./errorPopup.module.css";

export default function ErrorPopup() {
  let error = useSelector((state) => state.error);
  const [isShow, setIsShow] = useState(false);

  setTimeout(() => {
    error.message = "";
    setIsShow(false);
  }, 4000);

  return (
    <>
      {error.message.length > 0 && !isShow ? setIsShow(true) : null}
      {isShow ? (
        <>
          <div
            className={`
            ${s.errorLog} 
            ${error.type === "red" ? s.error : null}
            ${error.type === "green" ? s.popupGreen : null}
            `}
          >
            {error.message}
          </div>
        </>
      ) : null}
    </>
  );
}
