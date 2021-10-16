import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import MenuShops from "./packages/menu/MenuShops.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  switch (token) {
    case "":
      const tokenAll = window.location.search;
      if (tokenAll.length > 0) {
        console.log(tokenAll);
        const tokenStart = tokenAll.search(/=/);
        const tokenAnswer = tokenAll.slice(tokenStart + 1);
        console.log(tokenAnswer);
        cookies.set("Token", tokenAnswer, { path: "/" });
        window.close();
        //https://gossy.link/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxNiwiaWF0IjoxNjMyNjQyNDc3fQ.66fjQzMMocs4ixgFe9qEzOsLxRWrXfKQ4PJqCtt1ARY
      }
  }
  if (cookies.get("Token") !== undefined && cookies.get("Token").length > 0) {
    dispatch({ type: "LOGIN_CONFIRM", payload: cookies.get("Token") });
  }
  // if (token.length === 0 && cookies.get("Token") !== undefined) {
  //   dispatch({ type: "LOGIN_CONFIRM", payload: cookies.get("Token") });
  // }

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
