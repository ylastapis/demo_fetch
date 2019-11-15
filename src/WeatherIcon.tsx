import React from 'react';

const icons = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloudy',
  '04d': 'wi-cloudy',
  '09d': 'wi-showers',
  '10d': 'wi-day-rain',
  '11d': 'wi-day-thunderstorm',
  '13d': 'wi-day-snow-thunderstorm',
  '50d': 'wi-fog',
  '01n': 'wi-day-sunny',
  '02n': 'wi-day-cloudy',
  '03n': 'wi-cloudy',
  '04n': 'wi-cloudy',
  '09n': 'wi-showers',
  '10n': 'wi-day-rain',
  '11n': 'wi-day-thunderstorm',
  '13n': 'wi-day-snow-thunderstorm',
  '50n': 'wi-fog',
};

export interface ReactWeatherProps {
  icon: '01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d' | '01n' | '02n' | '03n' | '04n' | '09n' | '10n' | '11n' | '13n' | '50n' | null;
}

export const WeatherIcon = React.memo(({
  icon,
}: ReactWeatherProps) =>
    <i className={`wicon wi ${(!icon || !icons[icon]) ? 'na' : icons[icon]}`} />
);
WeatherIcon.displayName = 'WeatherIcon';
