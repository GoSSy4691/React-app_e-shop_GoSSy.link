import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function InputPhone(props) {
  const [isPhoneWrong, setPhoneWrong] = useState(false);
  const inputElement = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function phoneChecker(input) {
    setPhoneWrong(false);
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

  function enterEvent() {
    if (props.phone.indexOf("_") !== -1) {
      setPhoneWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: t("Wrong phone number") });
    } else {
      props.doNext();
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
      className={props.className}
      style={isPhoneWrong ? { color: "red" } : null}
      value={props.phone}
      inputMode="numeric"
      onChange={(e) => phoneChecker(e.nativeEvent.data)}
      onKeyPress={(e) => e.nativeEvent.key === "Enter" && enterEvent()}
    />
  );
}
