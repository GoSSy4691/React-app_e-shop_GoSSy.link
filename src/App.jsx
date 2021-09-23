import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./packages/header/Header.jsx";
import Welcome from "./packages/welcome/Welcome.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/menu" component={MenuShops} />
        <Route exact path="/order" component={OrderView} />
        <Redirect to="/" />
      </Switch>
      <ErrorPopup />
    </div>
  );
}
