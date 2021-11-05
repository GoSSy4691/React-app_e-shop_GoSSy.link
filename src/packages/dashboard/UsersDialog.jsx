import patternDashboard from "./CSS/patternDashboard.module.css";
import patternMenu from "../patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../../files/useDetectClickOut.js";
import API from "../../files/API/api.js";

export default function UsersDialog() {
  const usersData = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const refUsers = useDetectClickOut(() =>
    dispatch({ type: "SET_BAR_SHOW" })
  );

  function loadingUsers() {
    API.getUsers(cookies.get("Token"))
      .then((res) => dispatch({ type: "LOAD_ALL_USERS", payload: res.data }))
      .catch((error) => console.error(error));
    return <p>Loading...</p>;
  }

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refUsers}>
        <button
          className={patternMenu.closeButton}
          onClick={() => dispatch({ type: "SET_BAR_SHOW" })}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>Users:</div>
        {usersData.length === 0 ? (
          loadingUsers()
        ) : (
          <>
            <li className={patternDashboard.line} key={"title"}>
              <p style={{ width: 30 }}>№</p>
              <p style={{ width: 120 }}>Name</p>
              <p style={{ width: 130 }}>Last name</p>
              <p style={{ width: 180 }}>Phone</p>
              <p style={{ width: 30 }}>ID</p>
            </li>
            <div className={patternDashboard.scrollAbleDashboard}>
              {usersData.map((el, index) => (
                <li className={patternDashboard.line} key={index}>
                  <p style={{ width: 30 }}>{index + 1}</p>
                  <p style={{ width: 130 }}>
                    {el.name.length > 0 ? el.name : "None"}
                  </p>
                  <p style={{ width: 120 }}>
                    {el.lastname.length > 0 ? el.lastname : "None"}
                  </p>
                  <p style={{ width: 180 }}>
                    {el.phone.length > 0 ? el.phone : "None"}
                  </p>
                  <p style={{ width: 30 }}>{el.id}</p>
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
