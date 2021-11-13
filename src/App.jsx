import s from "./app.module.css";
import cursorCSS from "./cursor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./packages/header/Header.jsx";
import About from "./packages/about/About.jsx";
import ShopsMenu from "./packages/menu/ShopsMenu.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";
import Footer from "./packages/footer/Footer.jsx";

export default function App() {
  const settings = useSelector((state) => state.settings);
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
    <div className={`${s.app} ${settings.isCursorCustom && cursorCSS.app}`}>
      <Header />
      <Switch>
        <Route exact path="/" component={ShopsMenu} />
        <Route exact path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
      <Footer />
      <ErrorPopup />
    </div>
  );
}
