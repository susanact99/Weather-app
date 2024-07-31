import React, { useEffect, useState } from 'react';
import '../styles/weatherBackground.css';
import clearSkyVideo from '../videos/Sunny.mp4';
import cloudsVideo from '../videos/Cloudy.mp4';
import fewCloudsVideo from '../videos/Few-clouds.mp4';
import scatteredCloudsVideo from '../videos/Scattered-clouds.mp4';
import rainVideo from '../videos/Rain.mp4';
import mistVideo from '../videos/Mist.mp4'; 

const WeatherBackground = ({ description, children }) => {
  const [videoSource, setVideoSource] = useState(null);
  const [key, setKey] = useState(0); // Adding a key to force re-render

  useEffect(() => {
    switch (description) {
      
      case 'clear sky':
        setVideoSource(clearSkyVideo);
        break;
      case 'broken clouds':
        setVideoSource(cloudsVideo);
        break;
      case 'scattered clouds':
        setVideoSource(scatteredCloudsVideo);
        break;
      case 'initial-state':
      case 'few clouds':
      case 'overcast clouds':
        setVideoSource(fewCloudsVideo);
        break;
      case 'mist':
      case 'dust':
        setVideoSource(mistVideo);
        break;
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
        setVideoSource(rainVideo);
        break;
      default:
        setVideoSource(null);
    }
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
  }, [description]);

  return (
    <div className="weather-container">
      {videoSource && (
        <video key={key} className="background-video" autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {children}
    </div>
  );
};

export default WeatherBackground;
