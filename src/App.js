import './App.css';
import ShowList from './mainPage/footer/axios/toDoList';
import {Route} from 'react-router-dom';
import Header from './mainPage/header/header';
import Home from './mainPage/containers/home/home';
import Welcome from './mainPage/containers/welcome/welcome';
import Menu from './mainPage/containers/menu/menu';

function App() {
  return (
    <div className='app'>
      <div className='headerBar'>
        <Header/>
      </div>
      <header className='appContainer'>
        <Route exact path='/' component={Home}/>
        <Route exact path='/welcome' component={Welcome}/>
        <Route exact path='/menu' component={Menu}/>
        <div>
          <ShowList/>
        </div>
      </header>
    </div>
  );
}

export default App;
