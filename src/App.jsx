import "./App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  //search token in navigation bar
  const tokenInBar = window.location.search;
  if (tokenInBar.length > 0) {
    const tokenStart = tokenInBar.search(/=/);
    const tokenAnswer = tokenInBar.slice(tokenStart + 1);
    console.log("Token is " + tokenAnswer);
    cookies.set("Token", tokenAnswer, { path: "/" });
    dispatch({ type: "LOAD_PROFILE" });
    window.close();
  }

  return (
    <div
      className="app"
      onScroll={(e) => setScrollPosition(e.target.scrollTop)}
    >
      <Header />
      <Switch>
        <Route exact path="/">
          <MenuShops scrollPosition={scrollPosition} />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/order" component={OrderView} />
        <Redirect to="/" />
      </Switch>
      <ErrorPopup />
    </div>
  );
}
