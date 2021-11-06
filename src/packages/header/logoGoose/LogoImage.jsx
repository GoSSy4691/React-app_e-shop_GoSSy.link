import s from "./gooses.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import rotateIt from "../../../files/img/logo-goose.png";
import laser from "../../../files/img/laser.png";

export default function LogoImg() {
  const [buffer, setBuffer] = useState([]);
  const { t } = useTranslation();

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
        title={t("Don't click")}
      />
      {buffer.map((p) => (
        <img src={p.src} className={p.className} alt={p.alt} key={p.key} />
      ))}
    </button>
  );
}
