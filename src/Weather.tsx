import './Weather.scss'
import React from 'react';
import { OpenWeatherDay } from './WeatherApi';
import { getMoment } from './date';
import { WeatherIcon } from './WeatherIcon';
import classNames from 'classnames';

interface WeatherProps {
    todayIcon: string;
    cityName: string;
    current: OpenWeatherDay
    list: OpenWeatherDay[]
}
export const Weather = ({
    todayIcon,
    cityName,
    current,
    list,
}: WeatherProps) => (
    <div className="rw-box">
        <div className="rw-main">
            <div className="rw-box-left">
                <h2>{cityName}</h2>
                <div className="rw-today">
                    <div className="date">
                        {getMoment(current.dt).format('LLL')}
                    </div>
                    <div className="hr"/>
                    <div className="current">
                        {current.main.temp}°C
                        <div className="range">
                            <span>{current.main.temp_min}°C</span>
                            <span>/</span>
                            <span>{current.main.temp_max}°C</span>
                        </div>
                    </div>
                    <div className="hr"/>
                    <div className="info">
                        <div>
                            Vent: <b>{current.wind.speed.toFixed(0)}</b> km/h
                        </div>
                        <div>
                            Humidité: <b>{current.main.humidity}</b> %
                        </div>
                    </div>
                </div>
            </div>
            <div className="rw-box-right">
                <WeatherIcon icon={todayIcon}/>
            </div>
        </div>
        <div
            className={classNames("rw-box-days", {
                empty: !list || list.length === 0
            })}
        >
            {list && list.length > 0 ? (
                list.map((day, i) => (
                    <React.Fragment key={i}>
                        <div key={`day-${i}`} className="rw-day">
                            <div className="rw-date">
                                {getMoment(day.dt).format('DD/MM/YYYY')}
                            </div>
                            <WeatherIcon icon={day.weather[0].icon}/>
                            <div className="rw-desc">{day.weather[0].description}</div>
                            <div className="rw-range">
                                <span>{day.main.temp_min}°C</span>
                                <span>/</span>
                                <span>{day.main.temp_max}</span>°C
                            </div>
                            <div>
                                Vent: <b>{day.wind.speed.toFixed(0)}</b> km/h
                            </div>
                            <div>
                                Humidité: <b>{day.main.humidity}</b> %
                            </div>
                        </div>
                    </React.Fragment>
                ))
            ) : (
                <span>Oversight</span>
            )}
        </div>
    </div>
);
