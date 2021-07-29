import './App.css';
import ShowList from './mainPage/footer/axios/toDoList';
import {Route} from 'react-router-dom';
import Header from './mainPage/header/header';
import Welcome from './mainPage/containers/welcome/welcome';
import Menu from './mainPage/containers/menu/menu';

function App(props) {
  return (
    <div className='app'>
      <Header/>
      <div className='appContainer'>
        <Route exact path='/' render={() => <Welcome/>}/>
        <Route exact path='/menu' render={() => <Menu
          menuItems={props.menuItems}
          shopCart={props.shopCart}
          addFood={props.addFood}
        />}/>
        <div>
          <ShowList/>
        </div>
      </div>
    </div>
  );
}

export default App;
