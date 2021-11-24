import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function InputPhone(props) {
  const [isCodeWrong, setCodeWrong] = useState(false);
  const inputElement = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function codeChecker(input) {
    setCodeWrong(false);
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

  function enterEvent() {
    if (props.code.indexOf("_") !== -1) {
      setCodeWrong(true);
      dispatch({ type: "ERROR_MESSAGE", payload: t("Wrong code") });
    } else {
      props.doNext();
    }
  }

  useEffect(() => {
    if (props.code !== undefined) {
      let array = props.code.split("");
      inputElement.current.selectionEnd = array.findIndex((e) => e === "_");
    }
    if (props.code.split("").findIndex((e) => e === "_") === -1) {
      props.doNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  return (
    <input
      name={"phoneCode"}
      autoFocus
      ref={inputElement}
      className={props.className}
      style={isCodeWrong ? { color: "red" } : null}
      value={props.code}
      inputMode="numeric"
      onChange={(e) => codeChecker(e.nativeEvent.data)}
      onKeyPress={(e) => e.nativeEvent.key === "Enter" && enterEvent()}
    />
  );
}
