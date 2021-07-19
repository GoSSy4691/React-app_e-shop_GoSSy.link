import s from './welcome.module.css'

function Welcome() {
  return (
    <div className={s.divContainer}>
      <div className={s.containerText}>It's goose TIME</div>
    </div>
  );
}

export default Welcome;