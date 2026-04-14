import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherDescription } from '../../api/weatherService';
import './WeatherCard.css';

const WeatherCard = ({ weatherData, locationName }) => {
  if (!weatherData) return null;

  const current = weatherData.current;
  const { label, icon } = getWeatherDescription(current.weather_code);
  const IconComponent = LucideIcons[icon] || LucideIcons.HelpCircle;

  return (
    <div className="weather-card glass animate-in">
      <div className="weather-card-header">
        <h2 className="location-name">{locationName || 'Unknown Location'}</h2>
        <p className="weather-label">{label}</p>
      </div>

      <div className="weather-main">
        <div className="temp-container">
          <span className="temperature">{Math.round(current.temperature_2m)}°</span>
          <span className="unit">C</span>
        </div>
        <div className="icon-wrapper">
          <IconComponent size={80} strokeWidth={1.5} className="weather-icon" />
        </div>
      </div>

      <div className="feels-like">
        Feels like {Math.round(current.apparent_temperature)}°
      </div>
    </div>
  );
};

export default WeatherCard;
