const BASE_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const BASE_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const fetchWeatherData = async (lat, lon) => {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'weather_code',
      'wind_speed_10m',
      'surface_pressure'
    ].join(','),
    hourly: 'temperature_2m,weather_code',
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max'
    ].join(','),
    timezone: 'auto',
    forecast_days: 7
  });

  const response = await fetch(`${BASE_WEATHER_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
};

export const searchLocations = async (query) => {
  if (!query || query.length < 2) return [];
  const params = new URLSearchParams({
    name: query,
    count: 5,
    language: 'en',
    format: 'json'
  });

  const response = await fetch(`${BASE_GEOCODING_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch locations');
  const data = await response.json();
  return data.results || [];
};

export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: { label: 'Clear sky', icon: 'Sun' },
    1: { label: 'Mainly clear', icon: 'CloudSun' },
    2: { label: 'Partly cloudy', icon: 'Cloud' },
    3: { label: 'Overcast', icon: 'Clouds' },
    45: { label: 'Fog', icon: 'CloudFog' },
    48: { label: 'Depositing rime fog', icon: 'CloudFog' },
    51: { label: 'Light drizzle', icon: 'CloudDrizzle' },
    53: { label: 'Moderate drizzle', icon: 'CloudDrizzle' },
    55: { label: 'Dense drizzle', icon: 'CloudDrizzle' },
    61: { label: 'Slight rain', icon: 'CloudRain' },
    63: { label: 'Moderate rain', icon: 'CloudRain' },
    65: { label: 'Heavy rain', icon: 'CloudRain' },
    71: { label: 'Slight snow', icon: 'CloudSnow' },
    73: { label: 'Moderate snow', icon: 'CloudSnow' },
    75: { label: 'Heavy snow', icon: 'CloudSnow' },
    95: { label: 'Thunderstorm', icon: 'CloudLightning' },
  };
  return weatherCodes[code] || { label: 'Unknown', icon: 'HelpCircle' };
};
