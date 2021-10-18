import s from "./CSS/adminBar.module.css";
import { useDispatch, useSelector } from "react-redux";

import menuOpenSVG from "../../files/img/adminBar/00_menuOpen.svg";
import userSVG from "../../files/img/adminBar/01_user.svg";
import shopSVG from "../../files/img/adminBar/02_shop.svg";
import menuSVG from "../../files/img/adminBar/03_menu.svg";
import imagesSVG from "../../files/img/adminBar/04_images.svg";
import foodsSVG from "../../files/img/adminBar/05_foods.svg";
import cartSVG from "../../files/img/adminBar/06_cart.svg";
import statsSVG from "../../files/img/adminBar/07_stats.svg";
import dialogSVG from "../../files/img/adminBar/08_dialog.svg";
import warehouseSVG from "../../files/img/adminBar/09_warehouse.svg";

export default function AdminBar(props) {
  const userData = useSelector((state) => state.user.userData);
  // const dispatch = useDispatch();

  return (
    <div className={`${s.box}`}>
      <img alt={"open"} src={menuOpenSVG} />
      <img alt={"open"} src={userSVG} />
      <img alt={"open"} src={shopSVG} />
      <img alt={"open"} src={menuSVG} />
      <img alt={"open"} src={imagesSVG} />
      <img alt={"open"} src={foodsSVG} />
      <img alt={"open"} src={cartSVG} />
      <img alt={"open"} src={statsSVG} />
      <img alt={"open"} src={dialogSVG} />
      <img alt={"open"} src={warehouseSVG} />
    </div>
  );
}
