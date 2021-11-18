import s from "./CSS/payment.module.css";
import loginCSS from "../login/login.module.css";
import patternCSS from "../patternMenu.module.css";
import { useTranslation } from "react-i18next";
import yookassaAPI from "../../files/API/yookassaAPI.js";

import rejected from "../../files/img/payment/rejected.svg";
import checking from "../../files/img/payment/checking.svg";
import confirmed from "../../files/img/payment/confirmed.svg";
import exitImg from "../../files/img/exit.svg";

export default function Payment() {
  const { t } = useTranslation();

  function checkPaymentStatus() {
    let paymentId = "29282c17-000f-5000-8000-17b448758756";
    yookassaAPI
      .paymentStatus(paymentId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className={patternCSS.darkenBackground}>
      <div className={loginCSS.loginDialog}>
        <button
          className={s.exitButtonSmall}
          // onClick={() => props.setChosenFood(false)}
        >
          <img alt={"exit"} src={exitImg} draggable="false" />
        </button>
        <div className={loginCSS.naming}>
          {/*{t("Login to your account")}*/}
          Payment
        </div>
        <div className={loginCSS.afterName}>
          <div className={loginCSS.afterTokenDialog}>
            <div className={s.line}>
              <p>
                {/*{t("Please verify your profile in new window")}*/}
                Check your payment status:
              </p>
              <div>
                <img
                  alt={"checkPayment"}
                  src={rejected}
                  className={s.checkImg}
                />
              </div>
              <button className={s.checkButton} onClick={checkPaymentStatus}>
                Check
              </button>
            </div>
            <button className={s.paymentLink}>
              {/*{t("Please verify your profile in new window")}*/}
              Open payment page again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
