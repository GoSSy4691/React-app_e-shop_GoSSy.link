import rotateIt from "../../../files/img/logo-goose.png";
import laser from "../../../files/img/laser.png";
import s from "./gooses.module.css";
import { useState } from "react";

export default function LogoImg() {
  const [buffer, setBuffer] = useState([]);

  let blaster = {
    src: laser,
    className: s.lasers_view,
    alt: "lasers",
    key: Math.random(),
  };

  return (
    <button className={s.imgHeaderBack}>
      <img
        src={rotateIt}
        className={s.mainGoose_view}
        onClick={() => setBuffer(buffer.concat([blaster]))}
        alt={"logo"}
        title={"don't click"}
      />
      {buffer.map((p) => (
        <img src={p.src} className={p.className} alt={p.alt} key={p.key} />
      ))}
    </button>
  );
}
