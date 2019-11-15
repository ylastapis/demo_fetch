import React from 'react';
import './WeatherIcon.scss';

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
  icon: string | null;
}

export const WeatherIcon = React.memo(({
  icon,
}: ReactWeatherProps) =>
    <i className={`wicon wi ${(!icon || !icons[icon]) ? 'na' : icons[icon]}`} />
);
WeatherIcon.displayName = 'WeatherIcon';
