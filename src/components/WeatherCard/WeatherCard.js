import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const imagePath = "../../images/image05.svg";
  return (
    <>
      <div className="weather-card">{weatherData.temperature}&#176;F</div>
      <img src={imagePath} alt="weather card" />
    </>
  );
}

export default WeatherCard;
