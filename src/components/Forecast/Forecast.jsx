import React from 'react';
import * as LucideIcons from 'lucide-react';
import { getWeatherDescription } from '../../api/weatherService';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.daily) return null;

  const {
    time,
    weather_code,
    temperature_2m_max,
    temperature_2m_min
  } = forecastData.daily;

  const formatDate = (dateString, index) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="forecast-section animate-in">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {time.map((date, index) => {
          const { label, icon } = getWeatherDescription(weather_code[index]);
          const IconComponent = LucideIcons[icon] || LucideIcons.HelpCircle;

          return (
            <div key={date} className="forecast-item glass">
              <span className="forecast-day">{formatDate(date, index)}</span>
              <IconComponent size={32} className="forecast-icon" strokeWidth={1.5} />
              <div className="forecast-temps">
                <span className="max-temp">{Math.round(temperature_2m_max[index])}°</span>
                <span className="min-temp">{Math.round(temperature_2m_min[index])}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
