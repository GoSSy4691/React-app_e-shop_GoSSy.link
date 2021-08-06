import './App.css';
import {Route} from 'react-router-dom';
import ShowList from './mainPage/footer/axios/toDoList.js';
import Header from './mainPage/header/header.js';
import Welcome from './mainPage/containers/welcome/welcome.js';
import Menu from './mainPage/containers/menu/menu.js';
import OrderView from './mainPage/containers/menu/orderView.js'

function App(props) {
  return (
    <div className='app'>
      <Header renderSiteDom={props.renderSiteDom}/>
      <div className='appContainer'>
        <Route exact path='/' render={() => <Welcome/>}/>
        <Route exact path='/menu' render={() => <Menu
          shopCart={props.shopCart}
          addFood={props.addFood}
          allMenu={props.allMenu}
          renderSiteDom={props.renderSiteDom}
        />}/>
        <Route exact path='/OrderView' render={() => <OrderView shopCart={props.shopCart}/>}/>
        <div>
          <ShowList renderSiteDom={props.renderSiteDom}/>
        </div>
      </div>
    </div>
  );
}

export default App;
