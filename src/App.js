import './App.css';
import {Route} from 'react-router-dom';
import ShowList from './mainPage/footer/axios/toDoList.js';
import Header from './mainPage/header/header.js';
import Welcome from './mainPage/containers/welcome/welcome.js';
import Menu from './mainPage/containers/menu/menu.js';

function App(props) {
  return (
    <div className='app'>
      <Header renderSiteDom={props.renderSiteDom}/>
      <div className='appContainer'>
        <Route exact path='/' render={() => <Welcome/>}/>
        <Route exact path='/menu' render={() => <Menu
          menuItems={props.menuItems}
          shopCart={props.shopCart}
          addFood={props.addFood}
          renderSiteDom={props.renderSiteDom}
        />}/>
        <div>
          <ShowList renderSiteDom={props.renderSiteDom}/>
        </div>
      </div>
    </div>
  );
}

export default App;
