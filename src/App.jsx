import "./App.css";
import { Route } from "react-router-dom";
import Header from "./mainPage/header/Header.jsx";
import Welcome from "./mainPage/containers/welcome/Welcome.jsx";
import Menu from "./mainPage/containers/menu/Menu.jsx";
import MenuHeader from "./mainPage/containers/menu/MenuHeader.jsx";
import OrderView from "./mainPage/containers/menu/OrderView.jsx";

export default function App(props) {
  return (
    <div className="app">
      <Header />
      <div className="appContainer">
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/menu">
          <Menu />
          <MenuHeader />
        </Route>
        <Route
          exact
          path="/order"
          render={() => <OrderView shopCart={props.shopCart} />}
        />
      </div>
    </div>
  );
}
