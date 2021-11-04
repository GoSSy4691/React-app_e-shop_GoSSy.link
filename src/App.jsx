import "./App.css";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import getCursor from "./files/getCursor.js";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import ShopsMenu from "./packages/menu/ShopsMenu.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

import { useState } from "react";

const CustomCursorDiv = styled.div`
  cursor: url(${(props) => (props.cursor.isLoaded ? props.cursor.auto : null)}),
    auto;
  * button {
    cursor: url(${(props) =>
        props.cursor.isLoaded ? props.cursor.pointer : null}),
      auto;
  }
  * a {
    cursor: url(${(props) =>
        props.cursor.isLoaded ? props.cursor.pointer : null}),
      auto;
  }
`;

export default function App() {
  const [cursor, setCursor] = useState({ isLoaded: false });
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

  function scrollObserver(el) {
    if (el.scrollTop > 220) {
      dispatch({ type: "MOVE_CATEGORY_DIV", payload: true });
    } else {
      dispatch({ type: "MOVE_CATEGORY_DIV", payload: false });
    }
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= 200) {
      dispatch({ type: "NEAR_TO_BOTTOM", payload: true });
    }
  }

  if (!cursor.isLoaded) {
    getCursor()
      .then((res) => {
        setCursor({
          isLoaded: true,
          auto: res.cursorAuto,
          pointer: res.cursorPointer,
        });
      })
      .catch((error) => {
        console.error(error);
        setCursor({
          isLoaded: "Error",
        });
      });
  }

  return (
    <CustomCursorDiv
      className="app"
      onScroll={(e) => scrollObserver(e.target)}
      cursor={cursor}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={ShopsMenu} />
        <Route exact path="/about" component={About} />
        <Route exact path="/order" component={OrderView} />
        <Redirect to="/" />
      </Switch>
      <ErrorPopup />
    </CustomCursorDiv>
  );
}
