import './Weather.scss'
import React from 'react';
import { OpenWeatherForecastApiResponse, processData } from './WeatherApi';
import { Moment } from 'moment';
import { Weather } from './Weather';

interface WeatherFetcherProps {
    city: string;
    date: Moment | null;
}
interface WeatherFetcherState {
    data: null | OpenWeatherForecastApiResponse;
    loading: boolean;
    error: null | any;
}
export class WeatherFetcher extends React.Component<WeatherFetcherProps, WeatherFetcherState> {
    constructor(props: WeatherFetcherProps) {
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

    componentDidUpdate(prevProps: Readonly<WeatherFetcherProps>, prevState: Readonly<WeatherFetcherState>, snapshot?: any): void {
        if (prevProps.city !== this.props.city && this.props.city) {
            this.handleFetch();
        }
    }

    handleFetch() {
        this.setState({
            loading: true,
            error: null,
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
    }

    render() {
        const { data, loading, error } = this.state;
        const { city, date } = this.props;

        if ( !date || !city ) {
            return <span>empty</span>
        }

        if (loading) {
            return <span>Loading</span>
        }

        if (error) {
            return <span>Some error</span>
        }

        if (!data) {
            return <span>Nothing to display</span>
        }

        const processedData = processData(data, date);

        if (!processedData || !processedData.current) {
            return <span>Nothing to display</span>
        }

        return (
            <Weather
                {...processedData}
            />
        );
    }
}
