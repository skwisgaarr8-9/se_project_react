const getWeatherData = ({ apiKey, latitude, longitude }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

const parseWeatherData = (data) => {
  if (!data) {
    return null;
  }
  const weatherData = {};
  weatherData.city = data.name;
  weatherData.temperature = {};
  weatherData.temperature.F = `${Math.round(data.main.temp)}°F`;
  weatherData.temperature.C = `${Math.ceil(((data.main.temp - 32) * 5) / 9)}°C`;
  weatherData.adjective = setTemperatureAdjective(
    parseInt(weatherData.temperature.F)
  );
  return weatherData;
};

const setTemperatureAdjective = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else if (temperature <= 65) {
    return "cold";
  }
};

export { getWeatherData, parseWeatherData };
