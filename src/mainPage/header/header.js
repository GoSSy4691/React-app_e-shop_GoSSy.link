import LogoImg from './logoGoose/logoImage';
import {NavLink} from 'react-router-dom';
import './header.css';

function Header(props) {
  return (
    <div className='nav'>
      <li><LogoImg renderSiteDom={props.renderSiteDom}/></li>
      <div className='bar'>
      <li><NavLink className='textInactive' exact activeClassName='textActive' to='/'>Welcome</NavLink></li>
      <li><NavLink className='textInactive' exact activeClassName='textActive' to='/menu'>Menu</NavLink></li>
      </div>
    </div>
  );
}

export default Header;