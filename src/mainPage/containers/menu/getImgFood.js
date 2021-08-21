import s from "./CSS/getImgFood.module.css";
import emptyImg from "../../../files/img/noItem.png";
import { useState } from "react";

const LoadableImage = (props) => {
  const [loaded, setLoaded] = useState(false);

  function addressName(imgName) {
    if (imgName.length < 1) return emptyImg;
    return "https://zloi.space/restaurant/images/" + imgName;
  }

  return (
    <img
      alt={"notLoaded"}
      src={loaded ? addressName(props.imgName) : emptyImg}
      className={s.foodImg}
      onLoad={() => setLoaded(true)}
      onError={(event) => (event.target.src = emptyImg)}
    />
  );
};

export default LoadableImage;
