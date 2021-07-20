import './App.css';
import ShowList from './mainPage/footer/axios/toDoList';
import {Route} from 'react-router-dom';
import Header from './mainPage/header/header';
import Home from './mainPage/containers/home/home';
import Welcome from './mainPage/containers/welcome/welcome';
import Menu from './mainPage/containers/menu/menu';

function App(props) {
  return (
    <div className='app'>
      <div className='headerBar'>
        <Header/>
      </div>
      <header className='appContainer'>
        <Route exact path='/' render={() => <Home/>}/>
        <Route exact path='/welcome' render={() => <Welcome/>}/>
        <Route exact path='/menu' render={() => <Menu menuItems={props.menuItems}/>}/>
        <div>
          <ShowList/>
        </div>
      </header>
    </div>
  );
}

export default App;
