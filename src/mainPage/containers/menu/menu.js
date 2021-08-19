import s from "./CSS/menu.module.css";
import runForestRun from "../../../files/img/runForestRun.png";
import shopCartIco from "../../../files/img/shopCart.png";
import Cart from "./cart.js";
import Items from "./items.js";
import React, { useState } from "react";

function CartOnTop(props) {
  const [countAll] = useCountAll();
  return (
    <div className={s.topBar}>
      <img
        alt={"CartImage"}
        src={shopCartIco}
        className={s.shopIco}
        onClick={() => props.getShowList(true)}
      />
      <div className={s.shopIcoCount}>{countAll}</div>
    </div>
  );
}

function MenuContainer(props) {
  const [menuData, updateMenuData] = useState([]);
  if (menuData.length === 0) {
    props.getMenu().then((data) => updateMenuData(data));
    return <div>Loading</div>;
  } else {
    return [
      <Items menuData={menuData} cart={props.cart} useCountAll={useCountAll} />,
    ];
  }
}

const CountContext = React.createContext();

function CountProvider(props) {
  const [countAll, setCountAll] = React.useState(props.cart.inCart[0].value);
  const value = React.useMemo(() => [countAll, setCountAll], [countAll]);
  return <CountContext.Provider value={value} {...props} />;
}

function useCountAll() {
  const context = React.useContext(CountContext);
  if (!context)
    throw new Error(`useCountAll must be used within a CountProvider`);
  return context;
}

export default function Menu(props) {
  const [showList, getShowList] = useState(false);
  return (
    <div className={s.showRoom}>
      {(() => {
        if (showList === true) {
          return <Cart cart={props.cart} getShowList={getShowList} />;
        }
      })()}
      <CountProvider cart={props.cart}>
        <CartOnTop cart={props.cart} getShowList={getShowList} />
        <MenuContainer cart={props.cart} getMenu={props.getMenu} />
      </CountProvider>
      <img
        alt={"footer"}
        className={s.footerImg}
        src={runForestRun}
        key={Math.random()}
      />
    </div>
  );
}
