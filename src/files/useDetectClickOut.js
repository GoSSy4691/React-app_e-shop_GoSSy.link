import { useEffect, useRef } from "react";

export default function useDetectClickOut(isItVisible, setVisible) {
  const openedBoxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (openedBoxRef.current && !openedBoxRef.current.contains(event.target)) {
      return setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return openedBoxRef;
}
