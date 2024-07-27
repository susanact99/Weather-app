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
      case 'few clouds':
        setVideoSource(fewCloudsVideo);
        break;
      case 'mist':
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
  }, [description]);

  return (
    <div className="weather-container">
      {videoSource && (
        <video className="background-video" autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {children}
    </div>
  );
};

export default WeatherBackground;
