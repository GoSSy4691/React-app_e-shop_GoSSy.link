import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={MenuShops} />
        <Route exact path="/about" component={About} />
        <Route exact path="/order" component={OrderView} />
        <Redirect to="/" />
      </Switch>
      <ErrorPopup />
    </div>
  );
}
