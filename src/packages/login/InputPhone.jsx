import s from "./login.module.css";
import { useEffect, useRef } from "react";

export default function InputPhone(props) {
  const inputElement = useRef(null);

  function phoneChecker(input) {
    props.setPhoneWrong(false);
    let array = props.phone.split("");
    let lastEmptyIndex = array.findIndex((e) => e === "_");
    if (input === null) {
      switch (array[lastEmptyIndex - 1]) {
        case "(":
        case ")":
        case "-":
          lastEmptyIndex--;
          break;
        default:
          break;
      }
      if (lastEmptyIndex - 1 !== 0) {
        if (lastEmptyIndex - 1 === -2) lastEmptyIndex = 15;
        array[lastEmptyIndex - 1] = "_";
        props.setPhone(array.join(""));
      }
    } else {
      if (Number(input) < 10) {
        array[lastEmptyIndex] = input;
        props.setPhone(array.join(""));
      }
    }
  }

  useEffect(() => {
    if (props.phone !== undefined) {
      let array = props.phone.split("");
      inputElement.current.selectionEnd = array.findIndex((e) => e === "_");
    }
  });

  return (
    <input
      name={"phoneCode"}
      autoFocus
      ref={inputElement}
      className={s.phoneForm}
      style={props.isPhoneWrong ? { color: "red" } : null}
      value={props.phone}
      inputMode="numeric"
      onChange={(e) => phoneChecker(e.nativeEvent.data)}
      onKeyPress={(e) =>
        e.nativeEvent.key === "Enter" && props.sendPhoneNumber()
      }
    />
  );
}
