import LogoImg from './logoGoose/logoImage';
import {NavLink} from 'react-router-dom';

function Header() {
  return (
    <div>
      <div>
        <LogoImg/>
      </div>
      <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/welcome'>Welcome</NavLink>
        <NavLink to='/test_page'>Test Page</NavLink>
      </div>
    </div>
  );
}

export default Header;