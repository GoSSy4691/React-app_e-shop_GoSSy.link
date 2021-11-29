import s from "./CSS/getImgFood.module.css";
import { useState } from "react";
import emptyImg from "../../files/img/noItem.svg";

export default function GetImgFood(props) {
  const [isLoaded, setLoaded] = useState(false);

  function addressName(imgName) {
    if (imgName === null) return emptyImg;
    if (imgName.length < 1) return emptyImg;
    return "https://zloi.space/restaurant/images/" + imgName;
  }

  return (
    <img
      alt={"notLoaded"}
      src={addressName(props.imgName)}
      className={`${props.style} ${isLoaded ? {} : s.animated_background}`}
      onLoad={() => setLoaded(true)}
      onError={(event) => (event.target.src = emptyImg)}
      draggable="false"
      loading="lazy"
    />
  );
}
