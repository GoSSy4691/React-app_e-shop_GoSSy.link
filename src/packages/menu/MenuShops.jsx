import s from "./CSS/menuShops.module.css";
import patternCSS from "../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import API from "../../files/API/api.js";
import GetImgFood from "./GetImgFood.jsx";
import MenuFoods from "./MenuFoods.jsx";
import AdminBar from "./AdminBar.jsx";

import loadingGoose from "../../files/img/loadingGoose.png";

export default function MenuShops() {
  const userData = useSelector((state) => state.user.userData);
  const userView = useSelector((state) => state.menu.userView);
  const points = useSelector((state) => state.menu.points);
  const shopId = useSelector((state) => state.menu.shopId);
  const unloadedPages = useSelector((state) => state.menu.unloadedPages);
  // const [isShowLoad, setShowLoad] = useState(true);
  const dispatch = useDispatch();

  function getPoints() {
    API.getPoints()
      .then((res) => {
        dispatch({ type: "LOAD_POINTS", payload: res.data.data });
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Shops" });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: "ERROR_MESSAGE", payload: "Error get points" });
        dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
      });
  }

  async function openMenu(shopName, shopIndex) {
    if (shopId === shopIndex) {
      dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Menu" });
    } else {
      let categoryBuffer = [];
      dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Loading" });
      await API.getCategory(shopIndex)
        .then((res) => {
          categoryBuffer = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: "ERROR_MESSAGE", payload: "Can't get category" });
        });
      let howManyLoad = Math.round((window.innerWidth / 250) * 3);
      API.getMenu(1, howManyLoad, shopIndex)
        .then((res) => {
          dispatch({
            type: "LOAD_MENU",
            payload: {
              shopName,
              id: shopIndex,
              menu: res.data.data,
              categoryBuffer,
              loadedPages: 1,
              unloadedPages: res.data.meta.pages - 1,
              howManyLoad,
            },
          });
          dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Menu" });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: "CHANGE_DISPLAY_NOW", payload: "Error" });
        });
    }
  }

  return (
    <>
      {userData !== undefined && userData.login === "admin" && <AdminBar />}
      <div className={s.showRoom}>
        {(() => {
          switch (userView) {
            case "Loading":
              if (points.length === 0) getPoints();
              return <div className={patternCSS.roomName}/>;
            case "Shops":
              return (
                <>
                  <div className={patternCSS.roomName}>Shops:</div>
                  <div
                    className={patternCSS.grid}
                    style={{ marginTop: "44px" }}
                  >
                    {points.map((el) => (
                      <button
                        className={patternCSS.shopOrFood}
                        key={el.id}
                        onClick={() => openMenu(el.name, el.id)}
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
              return <MenuFoods />;
            case "Error":
              return (
                <div className={patternCSS.roomName}>Error get points</div>
              );
            default:
              console.error("User can't view it = " + userView);
          }
        })()}
        <div className={s.loadingDiv} style={userView === "Loading" ||
        (userView === "Menu" && unloadedPages > 0)
          ? null
          : { display: "none" }
        }>
          <h3 className={s.nameOnTop}>Loading</h3>
          <img
            alt={"loadingImg"}
            className={s.loadingImg}
            src={loadingGoose}
            key={Math.random()}
          />
        </div>
      </div>
    </>
  );
}
