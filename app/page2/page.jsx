"use client";

import React, { useState } from 'react';
import { FaThermometerHalf, FaTemperatureLow, FaTemperatureHigh, FaTint, FaTachometerAlt, FaWind, FaCloud, FaEye, FaCloudRain, FaSnowflake, FaSun, FaMoon } from 'react-icons/fa';

const Page2 = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);

  const fetchCitySuggestions = async (query) => {
    if (query.length < 3) return;
    const apiKey = '5093208149c59625e48ff99c27d6498b';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`);
    const data = await response.json();
    const uniqueSuggestions = Array.from(new Set(data.list.map(city => `${city.name}, ${city.sys.country}`)));
    setSuggestions(uniqueSuggestions);
  };

  const fetchWeather = async (cityName) => {
    const apiKey = '5093208149c59625e48ff99c27d6498b';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    setWeather(data);
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    fetchCitySuggestions(value);
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setSuggestions([]);
    fetchWeather(cityName);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl">{currentDate}</h1>
        <div className="mt-4">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="border p-2"
          />
          {suggestions.length > 0 && (
            <ul className="border mt-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleCitySelect(suggestion)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        {weather && (
          <div className="mt-4">
            <h2 className="text-2xl">{weather.name}</h2>
            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p className="text-xl">{weather.weather[0].description}</p>
            </div>
            <div className="flex items-center"><FaThermometerHalf className="mr-2" /><p><strong> Temperature:</strong> {weather.main.temp}°C</p></div>
            <div className="flex items-center"><FaTemperatureLow className="mr-2" /><p><strong> Feels Like:</strong> {weather.main.feels_like}°C</p></div>
            <div className="flex items-center"><FaTemperatureLow className="mr-2" /><p><strong> Min Temperature:</strong> {weather.main.temp_min}°C</p></div>
            <div className="flex items-center"><FaTemperatureHigh className="mr-2" /><p><strong> Max Temperature:</strong> {weather.main.temp_max}°C</p></div>
            <div className="flex items-center"><FaTint className="mr-2" /><p><strong> Humidity:</strong> {weather.main.humidity}%</p></div>
            <div className="flex items-center"><FaTachometerAlt className="mr-2" /><p><strong> Pressure:</strong> {weather.main.pressure} hPa</p></div>
            <div className="flex items-center"><FaWind className="mr-2" /><p><strong> Wind:</strong> {weather.wind.speed} m/s, {weather.wind.deg}°</p></div>
            <div className="flex items-center"><FaCloud className="mr-2" /><p><strong> Cloudiness:</strong> {weather.clouds.all}%</p></div>
            <div className="flex items-center"><FaEye className="mr-2" /><p><strong> Visibility:</strong> {weather.visibility} meters</p></div>
            {weather.rain && <div className="flex items-center"><FaCloudRain className="mr-2" /><p><strong> Rain Volume (last 1h):</strong> {weather.rain['1h']} mm</p></div>}
            {weather.snow && <div className="flex items-center"><FaSnowflake className="mr-2" /><p><strong> Snow Volume (last 1h):</strong> {weather.snow['1h']} mm</p></div>}
            <div className="flex items-center"><FaSun className="mr-2" /><p><strong> Sunrise:</strong> {formatTime(weather.sys.sunrise)}</p></div>
            <div className="flex items-center"><FaMoon className="mr-2" /><p><strong> Sunset:</strong> {formatTime(weather.sys.sunset)}</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;