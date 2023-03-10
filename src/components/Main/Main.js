import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, cards, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h1 className="main__header">
        Today is {weatherData.temperature}&#176;F / You want want to wear:
      </h1>
      <ul className="main__cards">
        {cards
          .filter((card) => card.weather === weatherData.adjective)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard._id}
              card={filteredCard}
              handleCardClick={handleCardClick}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;
