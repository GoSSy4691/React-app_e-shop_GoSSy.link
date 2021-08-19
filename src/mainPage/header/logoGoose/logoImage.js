import rotateIt from "../../../files/img/logo-goose.png";
import laser from "../../../files/img/laser.png";
import "./gooses.css";
import { useState } from "react";

export default function LogoImg() {
  const [buffer, setBuffer] = useState([]);

  let blaster = {
    src: laser,
    className: "lasers_view",
    alt: "lasers",
    key: Math.random(),
  };

  return (
    <div>
      <img
        src={rotateIt}
        className={"mainGoose_view"}
        onClick={() => setBuffer(buffer.concat([blaster]))}
        alt={"logo"}
        title={"don't click"}
      />
      {buffer.map((p) => (
        <img src={p.src} className={p.className} alt={p.alt} key={p.key} />
      ))}
    </div>
  );
}
