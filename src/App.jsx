import "./App.css";
import { Route } from "react-router-dom";
import Header from "./packages/header/Header.jsx";
import Welcome from "./packages/welcome/Welcome.jsx";
import Menu from "./packages/menu/Menu.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App(props) {
  return (
    <div className="app">
      <Header />
      <div className="appContainer">
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/menu" render={() => <Menu />} />
        <Route
          exact
          path="/order"
          render={() => <OrderView shopCart={props.shopCart} />}
        />
      </div>
      <ErrorPopup />
    </div>
  );
}
