import emptyImg from "../../files/img/noItem.svg";
import { useState } from "react";

const GetImgFood = (props) => {
  const [loaded, setLoaded] = useState(false);

  function addressName(imgName) {
    if (imgName === null) return emptyImg;
    if (imgName.length < 1) return emptyImg;
    return "https://zloi.space/restaurant/images/" + imgName;
  }

  return (
    <img
      alt={"notLoaded"}
      src={loaded ? addressName(props.imgName) : emptyImg}
      className={props.style}
      onLoad={() => setLoaded(true)}
      onError={(event) => (event.target.src = emptyImg)}
      draggable="false"
      loading="lazy"
    />
  );
};

export default GetImgFood;
