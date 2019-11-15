import { getMoment } from './date';
import { Moment } from 'moment';

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
    "message": string,
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

export const processData = (
    data: OpenWeatherForecastApiResponse | null,
    date: Moment | null
) => {
    if (!data || data.cod !== "200" || data.list.length === 0 || !date) {
        return {
            current: null,
            err: (data && data.cod) ? data.message : undefined,
        };
    }

    const availableDays = {};
    data.list.forEach((day: OpenWeatherDay) => {
        const momentDay = getMoment(day.dt);
        const d = momentDay.format('YYYYMMDD');
        if (
            momentDay.isSameOrAfter(date, 'day') && // at least today
            !availableDays.hasOwnProperty(d)  // not already added to the list (1 per day)
        ) {
            availableDays[d] = day;
        }
    });
    const list = Object.keys(availableDays).map(k => availableDays[k]);
    const current = list.shift();

    return {
        todayIcon: data.list[0].weather[0].icon,
        cityName: data.city.name,
        current,
        list,
        err: null,
    };
};

