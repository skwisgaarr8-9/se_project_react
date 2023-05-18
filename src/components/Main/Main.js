import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, cards, onCardClick, onCardLike, currentUser }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
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
              currentUser={currentUser}
              onCardLike={onCardLike}
              key={filteredCard._id}
              card={filteredCard}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
