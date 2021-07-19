import LogoImg from './logoGoose/logoImage';
import {NavLink} from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className='nav'>
      <li><LogoImg/></li>
      <div className='bar'>
      <li><NavLink className='textInactive' exact activeClassName='textActive' to='/'>Home</NavLink></li>
      <li><NavLink className='textInactive' exact activeClassName='textActive' to='/welcome'>Welcome</NavLink></li>
      <li><NavLink className='textInactive' exact activeClassName='textActive' to='/menu'>Menu</NavLink></li>
      </div>
    </div>
  );
}

export default Header;