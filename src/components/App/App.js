import React, { useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { apiData } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = React.useState({});

  useEffect(() => {
    getWeatherData(apiData)
      .then((data) => {
        setWeatherData(parseWeatherData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page__content">
      <Header weatherData={weatherData} />
      <Main weatherData={weatherData} />
      <Footer />
    </div>
  );
}

export default App;
