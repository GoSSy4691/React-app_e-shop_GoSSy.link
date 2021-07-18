import menu from '../../shop.json';
import './menu.css';

function Menu() {
  return <div className='firstDiv'>
    {menu[0].items.menu.map(p => <div className='secondDiv' key={p.id}>
      <div className='bufferDiv'>
        <li>{p.name}</li>
        <li>{p.cost}</li>
      </div>
      {/*<li>{p.description}</li>*/}
    </div>)}
  </div>;
}

export default Menu;