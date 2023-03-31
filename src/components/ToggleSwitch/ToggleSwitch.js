import React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureWeatherUnitContext } from "../../contexts/CurrentTemperatureContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureWeatherUnitContext
  );

  const [isChecked, setIsChecked] = React.useState(
    currentTemperatureUnit === "C"
  );

  React.useEffect(() => {
    setIsChecked(currentTemperatureUnit === "C");
  }, [currentTemperatureUnit]);

  return (
    <div className="toggle">
      <label className="toggle__label">
        <span className={isChecked ? "toggle__text-unchecked" : "toggle__text"}>
          F
        </span>
        <span className={isChecked ? "toggle__text" : "toggle__text-unchecked"}>
          C
        </span>
        <input
          className="toggle__checkbox"
          type="checkbox"
          onChange={handleToggleSwitchChange}
        />
        <span className="toggle__button"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
