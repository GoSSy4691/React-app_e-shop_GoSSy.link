import s from "./CSS/getImgFood.module.css";
import emptyImg from "../../../files/img/noItem.png";
import { useState } from "react";

const LoadableImage = (props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      alt={"notLoaded"}
      src={loaded ? props.src : emptyImg}
      className={s.foodImg}
      onLoad={() => setLoaded(true)}
      onError={(event) => (event.target.src = emptyImg)}
    />
  );
};

export default LoadableImage;
