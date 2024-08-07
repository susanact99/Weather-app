import React, { useState } from 'react';
import '../styles/weatherStyles.css';
import WeatherBackground from './WeatherBackground';
import City from "../images/City.svg";
import SunCurveChart from './SunCurveChart';

export function WeatherCity() {
  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null);
  const [description, setDescription] = useState('initial-state');
  const [currentTime, setCurrentTime] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather?';
  const APIKey = 'ab7068f382ef10bb34572ac2ebdcf10e';
  const difKelvin = 273.15;

  const handleChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ciudad.length > 0) {
      await fetchClima();
      setCiudad('');
    }
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}q=${ciudad}&APPID=${APIKey}`);
      const data = await response.json();
      setDataClima(data);
      setDescription(data.weather[0].description);
      setCurrentTime(Math.floor(Date.now() / 1000));
      setSunrise(Math.floor(data.sys.sunrise));
      setSunset(Math.floor(data.sys.sunset));
    } catch (error) {
      console.error('Ocurrió el siguiente problema', error);
    }
  };

  return (
    <WeatherBackground description={description}>
      <div className="container">
        <img src={City} alt="City image" className='city-img' />
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="ciudad">Enter your City</label>
          <div>
            <input
              type="text"
              value={ciudad}
              name="ciudad"
              placeholder='London, Paris...'
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {dataClima && (
          <div className='response'>
            <h2>{dataClima.name}, {dataClima.sys.country}</h2>
            <div className='img-temp'>
              <img className='img-weather'
                src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p className='temperature'> {parseInt(dataClima.main.temp - difKelvin)} ºC</p>
            </div>
            <p> {dataClima.weather[0].description[0].toUpperCase() + dataClima.weather[0].description.substring(1)}</p>
            <div className='other-parameters'>
              <div>
                <p>Wind <i className="bi bi-cursor-fill"></i></p><p> {dataClima.wind.speed} km/h</p>
                <p>Visibility <i className="bi bi-cloud-fog-fill"></i> </p><p> {parseInt(dataClima.visibility / 1000)}km</p>
                <p>Barometer <i className="bi bi-speedometer2"></i> </p><p> {dataClima.main.pressure} mb</p>
              </div>
              <div>
                <p>Feels like <i className="bi bi-thermometer-half"></i> </p><p> {parseInt(dataClima.main.feels_like - difKelvin)} ºC</p>
                <p> Min temperature <i className="bi bi-thermometer"></i> </p><p> {parseInt(dataClima.main.temp_min - difKelvin)} ºC</p>
                <p>Max temperature <i className="bi bi-thermometer-high"></i> </p><p> {parseInt(dataClima.main.temp_max - difKelvin)} ºC</p>
              </div>
            </div>
            <SunCurveChart sunrise={sunrise} sunset={sunset} currentTime={currentTime}/>
          </div>
        )}
      </div>
    </WeatherBackground>
  );
}
