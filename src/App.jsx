import "./App.css";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./mainPage/header/Header.jsx";
import Welcome from "./mainPage/containers/welcome/Welcome.jsx";
import Menu from "./mainPage/containers/menu/Menu.jsx";
import MenuHeader from "./mainPage/containers/menu/MenuHeader.jsx";
import OrderView from "./mainPage/containers/menu/OrderView.jsx";
import Cart from "./mainPage/containers/menu/Cart.jsx";
import Login from "./mainPage/containers/menu/Login.jsx";

export default function App(props) {
  const isCartShow = useSelector((state) => state.cart.isCartShow);
  const isPopupShow = useSelector((state) => state.userData.isPopupShow);
  return (
    <div className="app">
      <Header />
      <div className="appContainer">
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/menu">
          <Menu />
          <MenuHeader />
          {isPopupShow ? <Login /> : null}
          {isCartShow ? <Cart /> : null}
        </Route>
        <Route
          exact
          path="/order"
          render={() => <OrderView shopCart={props.shopCart} />}
        />
      </div>
    </div>
  );
}
