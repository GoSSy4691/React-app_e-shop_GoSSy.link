import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';

function Menu(props) {
  return <div className={s.showRoom}>
    {props.menuItems[0].items.menu.map(p => <div className={s.foodElement} key={p.id}>
      <div className={s.item}>
        <img src={emptyImg} className={s.foodImg} alt={'logo'}/>
        <div className={s.namePrice}>
        <li>{p.name}</li>
        <li>{p.cost}</li>
        </div>
        <div className={s.description}>
          <li>{p.description}</li>
        </div>
      </div>
    </div>)}
  </div>;
}

export default Menu;