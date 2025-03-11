import React, { useEffect, useState } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';

function WeatherBox({ city, lat, lon }) {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = '5ed65535c7dde3c9591abce0c90ec36d'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const data = await response.json();

        
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
        setWeatherData(dailyData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données météo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const getDayOfWeek = (dateString) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="weather-box">
      <h5>{city}</h5>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Carousel interval={3000} indicators={false}>
          {weatherData.map((weather, index) => (
            <Carousel.Item key={index}>
              <div className="weather-details">
                <p className="weather-date">{getDayOfWeek(weather.dt_txt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p><strong>Température:</strong> {weather.main.temp}°C</p>
                <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                <p><strong>Humidité:</strong> {weather.main.humidity}%</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default WeatherBox;
