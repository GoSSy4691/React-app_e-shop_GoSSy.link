import s from "./about.module.css";
import welcomeImg from "../../files/img/welcomeImg.png";

function About() {
  return (
    <div className={s.divContainer}>
      <div className={s.welocmeImgback}>
        <img
          src={welcomeImg}
          className={s.welcomeImg}
          key={Math.random()}
          alt={"welcomeImg"}
        />
      </div>
      <div className={s.description}>
        Hi &#128400; this site created for learning React's capabilities.
        <br />
        I am a beginner at developing and in the future want to know more about
        front development.
        <br />
        Go easy on me and my code.
      </div>
      <div className={s.ps}>It's goose TIME</div>
    </div>
  );
}

export default About;
