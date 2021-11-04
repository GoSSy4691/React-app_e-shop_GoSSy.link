import s from "./CSS/adminBar.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersDialog from "./UsersDialog.jsx";
import PointsDialog from "./PointsDialog.jsx";
import MenuDialog from "./MenuDialog.jsx";

import menuOpenSVG from "../../../files/img/adminBar/00_menuOpen.svg";
import userSVG from "../../../files/img/adminBar/01_user.svg";
import menuSVG from "../../../files/img/adminBar/02_menu.svg";
import cartSVG from "../../../files/img/adminBar/03_cart.svg";
import statsSVG from "../../../files/img/adminBar/04_stats.svg";
import dialogSVG from "../../../files/img/adminBar/05_dialog.svg";
import warehouseSVG from "../../../files/img/adminBar/06_warehouse.svg";

export default function AdminBar() {
  const barShow = useSelector((state) => state.admin.barShow);
  const [isBarOpen, setBarOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {barShow === "users" && <UsersDialog />}
      {barShow === "points" && <PointsDialog />}
      {barShow === "menu" && <MenuDialog />}
      <div
        className={s.box}
        style={isBarOpen ? { width: "108px" } : { width: "40px" }}
      >
        <button onClick={() => setBarOpen(!isBarOpen)}>
          <img
            alt={"openBar"}
            src={menuOpenSVG}
            className={s.barOpenBtn}
            style={isBarOpen ? { transform: "rotate(90deg)" } : null}
          />
        </button>
        <button
          onClick={() => dispatch({ type: "SET_BAR_SHOW", payload: "users" })}
        >
          <img alt={"user"} src={userSVG} />
          {isBarOpen && <p>Users</p>}
        </button>
        <button
          onClick={() => dispatch({ type: "SET_BAR_SHOW", payload: "points" })}
        >
          <img alt={"menu"} src={menuSVG} />
          {isBarOpen && <p>Menu</p>}
        </button>
        <button>
          <img alt={"orders"} src={cartSVG} style={{ opacity: 0.3 }} />
          {isBarOpen && <p>Orders</p>}
        </button>
        <button>
          <img alt={"stats"} src={statsSVG} style={{ opacity: 0.3 }} />
          {isBarOpen && <p>Stats</p>}
        </button>
        <button>
          <img alt={"dialog"} src={dialogSVG} style={{ opacity: 0.3 }} />
          {isBarOpen && <p>Feedback</p>}
        </button>
        <button>
          <img alt={"warehouse"} src={warehouseSVG} style={{ opacity: 0.3 }} />
          {isBarOpen && <p>Warehouse</p>}
        </button>
      </div>
    </>
  );
}
