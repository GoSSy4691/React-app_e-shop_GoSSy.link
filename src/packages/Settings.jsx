import patternDashboard from "./dashboard/CSS/patternDashboard.module.css";
import patternMenu from "./patternMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useDetectClickOut from "../files/useDetectClickOut.js";

export default function Settings(props) {
  const settings = useSelector((state) => state.settings);
  const refBox = useDetectClickOut(props.setShowSettings);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={patternMenu.darkenBackground}>
      <div className={patternDashboard.showBox} ref={refBox}>
        <button
          className={patternMenu.closeButton}
          onClick={() => props.setShowSettings(false)}
        >
          ✖
        </button>
        <div className={patternDashboard.usersTitle}>{t("Settings")}:</div>
        <LineLi>
          <p>{t("Language")}</p>
          <LangBtn
            onClick={() => i18next.changeLanguage("en-US")}
            style={
              i18next.language === "en-US"
                ? {
                    color: "black",
                    background: "#747474",
                    borderRadius: "25px",
                    padding: "5px 5px",
                  }
                : null
            }
          >
            {t("English")}
          </LangBtn>
          <LangBtn
            onClick={() => i18next.changeLanguage("ru-RU")}
            style={
              i18next.language === "ru-RU"
                ? {
                    color: "black",
                    background: "#747474",
                    borderRadius: "25px",
                    padding: "5px 5px",
                  }
                : null
            }
          >
            {t("Russian")}
          </LangBtn>
        </LineLi>
        <LineLi>
          <p>{t("Custom cursor")}</p>
          <ToggleBtn
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

const LangBtn = styled.button`
  margin-left: 10px;
  color: white;
`;

const ToggleBtn = styled.button`
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
