import s from "./CSS/usersDialog.module.css";
import patternCSS from "../../pattern.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../../../files/useDetectClickOut.js";
import API from "../../../files/API/api.js";

export default function UsersDialog(props) {
  const refUsers = useDetectClickOut(props.isUsersShow, props.setUsersShow);
  const usersData = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function loadingUsers() {
    API.getUsers(cookies.get("Token"))
      .then((res) => dispatch({ type: "LOAD_ALL_USERS", payload: res.data }))
      .catch((error) => console.error(error));
    return <p>Loading...</p>;
  }

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={s.showUsers} ref={refUsers}>
        <button
          className={patternCSS.closeButton}
          onClick={() => props.setShowCart(false)}
        >
          ✖
        </button>
        <div className={s.usersTitle}>Users:</div>
        {usersData.length === 0 ? (
          loadingUsers()
        ) : (
          <>
            <li className={s.line}>
              <p className={s.number}>№</p>
              <p className={s.name}>Name</p>
              <p className={s.name}>Last name</p>
              <p className={s.phone}>Phone</p>
              <p className={s.number}>ID</p>
            </li>
            {usersData.map((el, index) => (
              <li className={s.line}>
                <p className={s.number}>{index + 1}</p>
                <p className={s.name}>{el.name.length > 0 ? el.name : "None"}</p>
                <p className={s.name}>{el.lastname.length > 0 ? el.lastname : "None"}</p>
                <p className={s.phone}>{el.phone.length > 0 ? el.phone : "None"}</p>
                <p className={s.number}>{el.id}</p>
              </li>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
