import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({weatherData}) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData}/>
    </main>
  );
}

export default Main;
