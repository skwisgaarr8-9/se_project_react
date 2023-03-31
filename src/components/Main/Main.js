import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureWeatherUnitContext } from "../../contexts/CurrentTemperatureContext";

function Main({ weatherData, cards, handleCardClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureWeatherUnitContext
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h1 className="main__header">
        Today is {weatherData?.temperature?.[currentTemperatureUnit]} / You want
        want to wear:
      </h1>
      <ul className="main__cards">
        {cards
          .filter((card) => card.weather === weatherData.adjective)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard.id}
              card={filteredCard}
              handleCardClick={handleCardClick}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
