import React, { useState } from 'react';
import '../styles/weatherStyles.css';
import WeatherBackground from './WeatherBackground';

export function WeatherCity() {
  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null);
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather?';
  const APIKey = 'ab7068f382ef10bb34572ac2ebdcf10e';
  const difKelvin = 273.15;

  const handleChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) {
      fetchClima();
    }
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}q=${ciudad}&APPID=${APIKey}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error('Ocurrió el siguiente problema', error);
    }
  };

  return (
    <WeatherBackground description={dataClima?.weather[0]?.description || ''}>
      <div className="container">
        <h1>Weather app</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="ciudad">City</label>
          <div>
            <input
              type="text"
              value={ciudad}
              name="ciudad"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>
        {dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperature: {parseInt(dataClima.main.temp - difKelvin)} ºC</p>
            <p>Meteorologic conditions: {dataClima.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}
      </div>
    </WeatherBackground>
  );
}
