import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherService';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import { CloudRainWind } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('London');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (lat, lon, name) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
      if (name) setLocationName(name);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load - Default to London
    loadWeather(51.5074, -0.1278, 'London');
    
    // Optional: Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(position.coords.latitude, position.coords.longitude, 'Your Location');
        },
        (err) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleLocationSelect = (loc) => {
    loadWeather(loc.latitude, loc.longitude, loc.name);
  };

  return (
    <div className="App w-full flex flex-col items-center">
      <header className="mb-8 text-center animate-in">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CloudRainWind size={32} className="text-secondary" />
          <h1 className="text-3xl font-bold title-gradient">WeatherApp</h1>
        </div>
        <p className="text-text-muted">Premium Weather Tracking</p>
      </header>

      <SearchBar onLocationSelect={handleLocationSelect} />

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="glass p-6 text-accent text-center w-full max-w-md">
          {error}
        </div>
      ) : (
        <div className="w-full space-y-8 max-w-5xl">
          <div className="flex justify-center">
            <WeatherCard weatherData={weatherData} locationName={locationName} />
          </div>
          
          <WeatherDetails weatherData={weatherData} />
          
          <Forecast forecastData={weatherData} />
        </div>
      )}

      <footer className="mt-12 text-sm text-text-muted pb-8">
        Built with React & Open-Meteo
      </footer>
    </div>
  );
}

export default App;
