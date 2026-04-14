import React from 'react';
import { Droplets, Wind, Gauge, Sun } from 'lucide-react';
import './WeatherDetails.css';

const WeatherDetails = ({ weatherData }) => {
  if (!weatherData || !weatherData.current) return null;

  const current = weatherData.current;
  const daily = weatherData.daily;

  const metrics = [
    {
      label: 'Humidity',
      value: `${current.relative_humidity_2m}%`,
      icon: Droplets,
      color: '#3b82f6'
    },
    {
      label: 'Wind Speed',
      value: `${current.wind_speed_10m} km/h`,
      icon: Wind,
      color: '#10b981'
    },
    {
      label: 'Pressure',
      value: `${current.surface_pressure} hPa`,
      icon: Gauge,
      color: '#f59e0b'
    },
    {
      label: 'UV Index',
      value: daily.uv_index_max[0] || '0',
      icon: Sun,
      color: '#ef4444'
    }
  ];

  return (
    <div className="metrics-grid animate-in">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-card glass">
          <div className="metric-header">
            <metric.icon size={20} style={{ color: metric.color }} />
            <span className="metric-label">{metric.label}</span>
          </div>
          <div className="metric-value">{metric.value}</div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
