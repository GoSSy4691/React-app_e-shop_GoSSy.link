import "./App.css";
import { Route } from "react-router-dom";
import Header from "./mainPage/header/header.js";
import Welcome from "./mainPage/containers/welcome/welcome.js";
import Menu from "./mainPage/containers/menu/menu.js";
import OrderView from "./mainPage/containers/menu/orderView.js";

function App(props) {
  return (
    <div className="app">
      <Header renderSiteDom={props.renderSiteDom} />
      <div className="appContainer">
        <Route exact path="/" render={() => <Welcome />} />
        <Route
          exact
          path="/menu"
          render={() => (
            <Menu
              allMenu={props.allMenu}
              cart={props.cart}
              renderSiteDom={props.renderSiteDom}
            />
          )}
        />
        <Route
          exact
          path="/order"
          render={() => <OrderView shopCart={props.shopCart} />}
        />
      </div>
    </div>
  );
}

export default App;
