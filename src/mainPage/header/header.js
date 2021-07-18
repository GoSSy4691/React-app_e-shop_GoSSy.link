import LogoImg from './logoGoose/logoImage';
import {NavLink} from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className='nav'>
      <li><LogoImg/></li>
      <div className='bar'>
      <li><NavLink className='text-inactive' exact activeClassName='text-active' to='/'>Home</NavLink></li>
      <li><NavLink className='text-inactive' exact activeClassName='text-active' to='/welcome'>Welcome</NavLink></li>
      <li><NavLink className='text-inactive' exact activeClassName='text-active' to='/menu'>Menu</NavLink></li>
      </div>
    </div>
  );
}

export default Header;