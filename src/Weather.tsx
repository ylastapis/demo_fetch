import './Weather.scss'
import React from 'react';
import { OpenWeatherForecastApiResponse, processData } from './WeatherApi';
import { getMoment } from './date';
import { WeatherIcon } from './WeatherIcon';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';
import { Moment } from 'moment';

interface WeatherProps {
    city: string;
    date: Moment | null;
}
interface WeatherState {
    data: null | OpenWeatherForecastApiResponse;
    loading: boolean;
    fetchError: null | any;
}
export class Weather extends React.Component<WeatherProps, WeatherState> {
    constructor(props: WeatherProps) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            fetchError: null,
        };
    }

    componentDidMount(): void {
        if (this.props.city && this.props.date) {
            this.doRequest();
        }
    }

    componentDidUpdate(prevProps: Readonly<WeatherProps>, prevState: Readonly<WeatherState>, snapshot?: any): void {
        if (
            (this.props.city && prevProps.city !== this.props.city) ||
            (this.props.date && prevProps.date !== this.props.date)
        ) {
            this.doRequest();
        }
    }

    doRequest() {
        this.setState({
            loading: true,
            fetchError: null,
        });

        fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=abdd4534fe73e0245449d2a7dee7ca3a&q=${this.props.city}&lang=fr&units=metric`)
            .then(response => response.json())
            .then((data : OpenWeatherForecastApiResponse)=> {
                this.setState({
                    data,
                    loading: false,
                });
            })
            .catch(e => this.setState({
                fetchError: e,
                loading: false,
            }))
    }

    render() {
        const {
            data,
            loading,
            fetchError,
        } = this.state;
        const { date } = this.props;

        if (fetchError) {
            return <span>Errors occurred during request</span>
        }
        const { todayIcon, cityName, current, list, err } = processData(data, date);
        return (
            <div className="rw-box">
                <div className="rw-main">
                    {loading ? (
                        <CircularProgress disableShrink />
                    ) : current && (
                        <>
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
                                {todayIcon && <WeatherIcon icon={todayIcon}/>}
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={classNames("rw-box-days", {
                        empty: !list || list.length === 0
                    })}
                >
                    {!loading && list && list.length > 0 ? (
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
                        err ? (
                            <span>{err}</span>
                        ) : (
                            <span>Aucune donnée disponible</span>
                        )
                    )}
                </div>
            </div>
        );
    }
}
