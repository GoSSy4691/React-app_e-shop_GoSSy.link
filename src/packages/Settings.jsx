import patternDashboard from "./dashboard/CSS/patternDashboard.module.css";
import patternMenu from "./patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import useDetectClickOut from "../files/useDetectClickOut.js";
import styled from "styled-components";

export default function Settings(props) {
  const settings = useSelector((state) => state.settings);
  const refBox = useDetectClickOut(props.setShowSettings);
  const dispatch = useDispatch();

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refBox}>
        <button
          className={patternMenu.closeButton}
          onClick={() => props.setShowSettings(false)}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>Settings:</div>
        <LineLi>
          <p>Custom cursor</p>
          <Toggle
            isCursorCustom={settings.isCursorCustom}
            onClick={() => dispatch({ type: "CHANGE_CURSOR" })}
          />
        </LineLi>
      </div>
    </div>
  );
}

const LineLi = styled.li`
  display: inline-flex;
  width: 460px;
  padding: 0 20px;
  align-items: center;
`;

const Toggle = styled.button`
  width: 50px;
  height: 25px;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) =>
    props.isCursorCustom ? "#4cd137" : "#353b48"};
  border: 3px solid white;

  &::after {
    width: 15px;
    height: 15px;
    content: "";
    position: absolute;
    top: 0;
    will-change: transform;
    transform: translate(${(props) => (props.isCursorCustom ? 3 : -22)}px);
    transition: transform 0.2s ease-out;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;
  }
`;
