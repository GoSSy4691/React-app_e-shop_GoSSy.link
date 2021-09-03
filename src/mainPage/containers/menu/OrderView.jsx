import s from "./CSS/orderView.module.css";
import foodPolicy from "../../../files/img/foodPolicy.jpg";

export default function OrderView() {
  return (
    <div className={s.divContainer}>
      <img alt={"foodPolicy"} src={foodPolicy} />
    </div>
  );
}
