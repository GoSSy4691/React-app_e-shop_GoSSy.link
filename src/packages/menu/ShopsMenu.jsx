import s from "./CSS/menuShops.module.css";
import patternCSS from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import zloiAPI from "../../files/API/zloiAPI.js";
import GetImgFood from "./GetImgFood.jsx";
import FoodsMenu from "./FoodsMenu.jsx";
import AdminBar from "../dashboard/AdminBar.jsx";

export default function ShopsMenu() {
  const userData = useSelector((state) => state.user.userData);
  const userView = useSelector((state) => state.menu.userView);
  const points = useSelector((state) => state.menu.points);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function getPoints() {
    zloiAPI
      .getPoints()
      .then((res) => {
        dispatch({ type: "LOAD_POINTS", payload: res.data.data });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
      });
  }

  function openMenu(shopName, shopId, shopIndex) {
    if (points[shopIndex].menu !== undefined) {
      dispatch({
        type: "CHANGE_DISPLAY_NOW",
        payload: "Menu",
        shopName: shopName,
        shopIndex: shopIndex,
        shopId: shopId,
        menuOnDisplay: points[shopIndex].menu,
      });
    } else {
      dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Loading" });
      zloiAPI
        .getCategory(shopId)
        .then((res) => {
          dispatch({
            type: "LOAD_CATEGORY",
            payload: { shopIndex, categoryData: res.data.data },
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({
            type: "SHOW_MESSAGE",
            payload: t("Can't get category"),
            color: "red",
          });
        });
      zloiAPI
        .getMenu(1, 100, shopId)
        .then((res) => {
          dispatch({
            type: "LOAD_MENU",
            payload: { shopName, shopId, shopIndex, menu: res.data.data },
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
        });
    }
  }

  return (
    <>
      {userData?.login === "admin" && <AdminBar />}
      <div
        className={s.showRoom}
        style={userData?.login === "admin" ? { margin: "0 60px 0 100px" } : {}}
      >
        {(() => {
          switch (userView) {
            case "Loading":
              if (points.length === 0) getPoints();
              return <div className={patternCSS.roomName} />;
            case "Shops":
              return (
                <>
                  <div className={patternCSS.roomName}>{t("Shops")}:</div>
                  <div
                    className={patternCSS.grid}
                    style={{ marginTop: "44px" }}
                  >
                    {points.map((el, index) => (
                      <button
                        className={patternCSS.shopOrFood}
                        key={el.id}
                        onClick={() => openMenu(el.name, el.id, index)}
                      >
                        <GetImgFood imgName={el.icon} style={patternCSS.img} />
                        <div className={patternCSS.footerItem}>
                          <span className={patternCSS.nameFood}>{el.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              );
            case "Menu":
              return <FoodsMenu />;
            case "Error":
              return (
                <div className={patternCSS.roomName}>Error get points</div>
              );
            default:
              console.error("User can't view it = " + userView);
          }
        })()}
      </div>
    </>
  );
}
