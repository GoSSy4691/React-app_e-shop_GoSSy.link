import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const tokenAll = window.location.search;
  if (tokenAll.length > 0) {
    console.log(tokenAll);
    const tokenStart = tokenAll.search(/=/);
    const tokenAnswer = tokenAll.slice(tokenStart + 1);
    console.log(tokenAnswer);
    cookies.set("Token", tokenAnswer, { path: "/" });
    window.close();
  }
  if (cookies.get("Token") !== undefined) {
    dispatch({ type: "LOGIN_CONFIRM", payload: cookies.get("Token") });
  }

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
