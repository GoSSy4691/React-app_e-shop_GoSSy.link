import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./packages/header/Header.jsx";
import Welcome from "./packages/welcome/Welcome.jsx";
import Menu from "./packages/menu/Menu.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="appContainer">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/order" component={OrderView} />
          <Redirect to="/" />
        </Switch>
      </div>
      <ErrorPopup />
    </div>
  );
}
