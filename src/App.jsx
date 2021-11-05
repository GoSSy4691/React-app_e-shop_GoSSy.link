import "./App.css";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import ShopsMenu from "./packages/menu/ShopsMenu.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

import cursorAuto from "./files/img/cursor/cursorAuto.png";
import cursorPointer from "./files/img/cursor/cursorPointer.png";

const CustomCursorDiv = styled.div`
  cursor: url(${cursorAuto}), auto;
  * button {
    cursor: url(${cursorPointer}), auto;
  }
  * a {
    cursor: url(${cursorPointer}), auto;
  }
`;

export default function App() {
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

  return (
    <CustomCursorDiv className="app" onScroll={(e) => scrollObserver(e.target)}>
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
