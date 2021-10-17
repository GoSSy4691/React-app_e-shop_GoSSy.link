import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import API from "./files/API/api.js";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  //search token in navigation bar
  const tokenInBar = window.location.search;
  if (tokenInBar.length > 0) {
    console.log(tokenInBar);
    const tokenStart = tokenInBar.search(/=/);
    const tokenAnswer = tokenInBar.slice(tokenStart + 1);
    console.log(tokenAnswer);
    cookies.set("Token", tokenAnswer, { path: "/" });
    window.close();
  }

  //load profile
  if (cookies.get("Token") !== undefined && !userData) {
    console.log("get profile");
    dispatch({ type: "LOGIN_LOADING" });
    API.getProfile(cookies.get("Token"))
      .then((res) => {
        console.log(res.data[0]);
        dispatch({ type: "LOGIN_CONFIRM", payload: res.data[0] });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "LOGOUT_CONFIRM" });
      });
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
