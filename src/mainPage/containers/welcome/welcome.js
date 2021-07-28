import s from './welcome.module.css'
import welcomeImg from '../../../files/img/welcomeImg.png'

function Welcome() {
  return (
    <div className={s.divContainer}>
      <img src={welcomeImg} className={s.welcomeImg} key={Math.random()} alt={'welcomeImg'}/>
      <div className={s.description}>
        Hi &#128400; this site created for learning React's capabilities.
        <br/>
        I just beginner at developing and in the future want know more about front development.
        <br/>
        Please bear with me and my code.
      </div>
      <div className={s.ps}>It's goose TIME</div>
    </div>
  );
}

export default Welcome;