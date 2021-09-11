import s from "./login.module.css";

export default function InputPhone(props) {
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

  return (
    <input
      name={"phoneCode"}
      autoFocus
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
