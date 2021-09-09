import s from "./login.module.css";

export default function InputPhone(props) {
  function phoneChecker(input) {
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

  return (
    <input
      name={"phoneCode"}
      autoFocus
      className={s.phoneForm}
      value={props.phone}
      inputMode="numeric"
      onChange={(e) => phoneChecker(e.nativeEvent.data)}
      onKeyPress={(e) =>
        e.nativeEvent.key === "Enter" ? props.getAnswerPhone() : null
      }
    />
  );
}
