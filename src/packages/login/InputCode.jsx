import s from "./login.module.css";
import { useEffect, useRef } from "react";

export default function InputPhone(props) {
  const inputElement = useRef(null);

  function codeChecker(input) {
    props.setCodeWrong(false);
    let array = props.code.split("");
    let lastEmptyIndex = array.findIndex((e) => e === "_");
    if (input === null) {
      if (lastEmptyIndex - 1 === -2) lastEmptyIndex = 4;
      array[lastEmptyIndex - 1] = "_";
      props.setCode(array.join(""));
    } else {
      if (Number(input) < 10) {
        array[lastEmptyIndex] = input;
        props.setCode(array.join(""));
      }
    }
  }

  useEffect(() => {
    if (props.code !== undefined) {
      let array = props.code.split("");
      inputElement.current.selectionEnd = array.findIndex((e) => e === "_");
    }
    if (props.code.split("").findIndex((e) => e === "_") === -1) {
      props.sendCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  return (
    <input
      name={"phoneCode"}
      autoFocus
      ref={inputElement}
      className={s.codeAfterNumber}
      style={props.isCodeWrong ? { color: "red" } : null}
      value={props.code}
      inputMode="numeric"
      onChange={(e) => codeChecker(e.nativeEvent.data)}
      onKeyPress={(e) =>
        e.nativeEvent.key === "Enter" ? props.sendCode() : null
      }
    />
  );
}
