import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return <div className="weather-card">{weatherData.temperature}&#176;F</div>;
}

export default WeatherCard;
