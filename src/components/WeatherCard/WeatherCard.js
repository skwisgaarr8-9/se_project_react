import React from "react";
import "./WeatherCard.css";
import { CurrentTemperatureWeatherUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureWeatherUnitContext
  );

  return (
    <div className="weather-card">
      {weatherData?.temperature?.[currentTemperatureUnit]}
    </div>
  );
}

export default WeatherCard;
