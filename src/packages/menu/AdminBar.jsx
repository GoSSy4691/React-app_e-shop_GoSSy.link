import s from "./CSS/adminBar.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function AdminBar(props) {
  // const categoryNumber = useSelector((state) => state.menu.categoryNumber);
  // const category = useSelector((state) => state.menu.category);
  // const dispatch = useDispatch();

  return (
    <div className={s.barWrapper}>
      <div className={`${s.box}`}>
        {/*{category.map((p) => (*/}
        {/*  <li*/}
        {/*    className={s.categoryBox}*/}
        {/*    style={*/}
        {/*      p.id === categoryNumber*/}
        {/*        ? { borderBottom: "solid 2px#414EBB" }*/}
        {/*        : null*/}
        {/*    }*/}
        {/*    key={p.id}*/}
        {/*    title={p.name}*/}
        {/*    onClick={() => changeCategory(p.id)}*/}
        {/*  >*/}
        {/*    <span className={s.categoryType}>{p.name}</span>*/}
        {/*  </li>*/}
        {/*))}*/}
      </div>
    </div>
  );
}
