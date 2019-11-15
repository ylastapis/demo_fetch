import './Weather.scss'
import React from "react";

enum OpenWeatherIcon {
    '01d' = '01d',
    '02d' = '02d',
    '03d' = '03d',
    '04d' = '04d',
    '09d' = '09d',
    '10d' = '10d',
    '11d' = '11d',
    '13d' = '13d',
    '50d' = '50d',
    '01n' = '01n',
    '02n' = '02n',
    '03n' = '03n',
    '04n' = '04n',
    '09n' = '09n',
    '10n' = '10n',
    '11n' = '11n',
    '13n' = '13n',
    '50n' = '50n',
}
interface OpenWeatherDayWeather {
    "id": number,
    "main": string,
    "description": string,
    "icon": OpenWeatherIcon
}
export interface OpenWeatherDay {
    'dt': number,
    "main": {
        "temp": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "sea_level": number,
        "grnd_level": number,
        "humidity": number,
        "temp_kf": number,
    },
    "weather": OpenWeatherDayWeather[],
    "clouds": {
        "all": number,
    },
    "wind": {
        "speed": number,
        "deg": number,
    },
    "rain": {
        "3h": number,
    },
    "sys": {
        "pod": string,
    },
    "dt_txt": string,
}
export interface OpenWeatherForecastApiResponse {
    "cod": string,
    "message": number,
    "cnt": number,
    "list": OpenWeatherDay[],
    "city": {
        "id": number,
        "name": string,
        "coord": {
            "lat": number,
            "lon": number,
        },
        "country": string,
        "population": number,
        "timezone": number,
        "sunrise": number,
        "sunset": number,
    }
}

interface WeatherProps {
    city: string;
}
interface WeatherState {
    data: null | OpenWeatherForecastApiResponse;
    loading: boolean;
    error: null | any;
}
export class Weather extends React.Component<WeatherProps, WeatherState> {
    constructor(props: WeatherProps) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            error: null,
        };
    }

    componentDidMount(): void {
        if (this.props.city) {
            this.handleFetch();
        }
    }

    componentDidUpdate(prevProps: Readonly<WeatherProps>, prevState: Readonly<WeatherState>, snapshot?: any): void {
        if (prevProps.city !== this.props.city && this.props.city) {
            this.handleFetch();
        }
    }

    handleFetch() {
        this.setState({
            loading: true
        });

        fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=abdd4534fe73e0245449d2a7dee7ca3a&q=${this.props.city}&lang=fr&units=metric`)
            .then(response => response.json())
            .then((data : OpenWeatherForecastApiResponse)=> {
                this.setState({
                    data
                });
            })
            .catch(e => this.setState({
                error: e
            }))
            .finally(() => this.setState({
                loading: false
            }));
        ;
    }

    render() {

        const { data, loading, error } = this.state;

        if (loading) {
            return <span>Loading</span>
        }

        if (!data) {
            return <span>No data to display</span>
        }

        console.log(data);

        const todayIcon = data!.list[0].weather[0].icon;

        return null;

        // return (
        //     <div className="rw-box">
        //         <div className="rw-main">
        //             <div className="rw-box-left">
        //                 <h2>{data.cityName}</h2>
        //                 <div className="rw-today">
        //                     <div className="date">
        //                         <FormattedDate
        //                             value={getMoment(values.current.dt).toDate()}
        //                             timeZone={timeZone}
        //                         />
        //                     </div>
        //                     <div className="hr"/>
        //                     <div className="current">
        //                         {values.current.main.temp} C
        //                         <div className="range">
        //         <span>
        //           <Icon icon={ICONS.down} width={12} height={12}/>
        //         </span>
        //                             <span>{values.current.main.temp_min} C</span>
        //                             <span>/</span>
        //                             <span>
        //           <Icon icon={ICONS.up} width={12} height={12}/>
        //         </span>
        //                             <span>{values.current.main.temp_max}</span>
        //                         </div>
        //                     </div>
        //                     <div className="hr"/>
        //                     <div className="info">
        //                         <div>
        //                             <FormattedMessage id="weather.wind"/>:{" "}
        //                             <b>{values.current.wind.speed.toFixed(0)}</b> km/h
        //                         </div>
        //                         <div>
        //                             <FormattedMessage id="weather.humidity"/>:{" "}
        //                             <b>{values.current.main.humidity}</b> %
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="rw-box-right">
        //                 <WeatherIcon icon={todayIcon}/>
        //             </div>
        //         </div>
        //         <div
        //             className={classNames("rw-box-days", {
        //                 empty: !values.list || values.list.length === 0
        //             })}
        //         >
        //             {values.list && values.list.length > 0 ? (
        //                 values.list.map((day, i) => (
        //                     <React.Fragment key={i}>
        //                         <div key={`day-${i}`} className="rw-day">
        //                             <div className="rw-date">
        //                                 <FormattedDate
        //                                     value={getMoment(day.dt).toDate()}
        //                                     timeZone={timeZone}
        //                                 />
        //                             </div>
        //                             <WeatherIcon icon={day.weather[0].icon}/>
        //                             <div className="rw-desc">{day.weather[0].description}</div>
        //                             <div className="rw-range">
        //           <span>
        //             <Icon icon={ICONS.down} width={12} height={12}/>
        //           </span>
        //                                 <span>{day.main.temp_min} C</span>
        //                                 <span>/</span>
        //                                 <span>
        //             <Icon icon={ICONS.up} width={12} height={12}/>
        //           </span>
        //                                 <span>{day.main.temp_max}</span>
        //                             </div>
        //                             <div>
        //                                 <FormattedMessage id="weather.wind"/>:{" "}
        //                                 <b>{day.wind.speed.toFixed(0)}</b> km/h
        //                             </div>
        //                             <div>
        //                                 <FormattedMessage id="weather.humidity"/>:{" "}
        //                                 <b>{day.main.humidity}</b> %
        //                             </div>
        //                         </div>
        //                     </React.Fragment>
        //                 ))
        //             ) : (
        //                 <FormattedMessage id="weather.oversightFlight"/>
        //             )}
        //         </div>
        //     </div>
        // );
    }
}
