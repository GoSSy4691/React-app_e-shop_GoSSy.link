import s from "./about.module.css";
import { useTranslation } from "react-i18next";

import welcomeImg from "../../files/img/welcomeImg.png";

function About() {
  const { t } = useTranslation();

  return (
    <div className={s.divContainer}>
      <div className={s.welcomeImgDiv}>
        <img
          src={welcomeImg}
          className={s.welcomeImg}
          key={Math.random()}
          alt={"welcomeImg"}
        />
      </div>
      <div className={s.description}>
        {t("description.Hi")} &#128400; {t("description.part1")}
        <br />
        {t("description.part2")}
        <br />
        {t("description.part3")}
      </div>
      <div className={s.ps}>It's goose TIME</div>
    </div>
  );
}

export default About;
