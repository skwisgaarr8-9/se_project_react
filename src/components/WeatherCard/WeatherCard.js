import React from "react";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="weather-card">
      {weatherData?.temperature?.[currentTemperatureUnit]}
    </div>
  );
}

export default WeatherCard;
