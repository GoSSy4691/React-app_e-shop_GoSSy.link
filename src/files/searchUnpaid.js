import zloiAPI from "./API/zloiAPI.js";

export default function searchUnpaid(dispatch, token) {
  zloiAPI
    .getOrders(token)
    .then((res) => {
      let isFindUnpaid = !!res.data.data
        .map((el) => el.status)
        .find((el) => el === "accepted");
      if (isFindUnpaid) {
        dispatch({ type: "SET_UNPAID_SOMETHING", payload: true });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
