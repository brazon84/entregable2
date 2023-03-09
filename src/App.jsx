import { useEffect, useState } from "react";
import "./App.css";
import Dark from "./components/Dark/Dark";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=bafe56facbad0dc7cd127ced024ce712`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherData(data);
          setError("");
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (searchQuery) {
      fetchWeatherData();
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchWeatherDataByLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bafe56facbad0dc7cd127ced024ce712`
        );
        const data = await response.json();
        setWeatherData(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    };

    if (!searchQuery && navigator.geolocation) {
      fetchWeatherDataByLocation();
    }
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.elements.search.value.trim());
  };

  const convertTemperatureUnit = () => {
    if (temperatureUnit === "C") {
      setTemperatureUnit("F");
    } else if (temperatureUnit === "F") {
      setTemperatureUnit("C");
    }
  };

  const getTemperatureInUnit = (kelvinTemperature, unit) => {
    if (unit === "F") {
      return Math.round(((kelvinTemperature - 273.15) * 9) / 5 + 32);
    } else if (unit === "C") {
      return Math.round(kelvinTemperature - 273.15);
    }
  };

  return (
    <div className="App">
      <div className="nav">
        
          <h1>Weather App </h1>
        
        
          <form onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Search city..." />
            <button className="submit" type="submit">Search</button>
          </form>
        
        
          <Dark />
        
      </div>
      {weatherData && (
        <div className="container">
          <h2>{weatherData.name}</h2>
          <h3>{weatherData.sys.country}</h3>
          <h4>
            {getTemperatureInUnit(weatherData.main.temp, temperatureUnit)}°
            {temperatureUnit}
          </h4>
          <p>
            {" "}
            Min/Max:{" "}
            {getTemperatureInUnit(weatherData.main.temp_min, temperatureUnit)}°
            {temperatureUnit}/
            {getTemperatureInUnit(weatherData.main.temp_max, temperatureUnit)}°
            {temperatureUnit}
          </p>
          <p> Humedad: {weatherData.main.humidity}%</p>
          <button className="temp" onClick={convertTemperatureUnit}>
            Convert to {temperatureUnit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
