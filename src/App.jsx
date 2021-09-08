import "./App.css";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./packages/header/Header.jsx";
import Welcome from "./packages/welcome/Welcome.jsx";
import Menu from "./packages/menu/Menu.jsx";
import MenuHeader from "./packages/menu/MenuHeader.jsx";
import OrderView from "./packages/menu/OrderView.jsx";
import Cart from "./packages/menu/Cart.jsx";
import Login from "./packages/login/Login.jsx";
import ErrorPopup from "./packages/popup/ErrorPopup.jsx";

export default function App(props) {
  const isCartShow = useSelector((state) => state.cart.isCartShow);
  const isPopupShow = useSelector((state) => state.user.isPopupShow);
  return (
    <div className="app">
      <Header />
      <MenuHeader />
      {isPopupShow ? <Login /> : null}
      {isCartShow ? <Cart /> : null}
      <div className="appContainer">
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/menu" render={() => <Menu />} />
        <Route
          exact
          path="/order"
          render={() => <OrderView shopCart={props.shopCart} />}
        />
      </div>
      <ErrorPopup />
    </div>
  );
}
