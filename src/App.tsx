import React, { useCallback, useState } from 'react';
import './App.scss';
import { Container, FormControl, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Moment } from 'moment';
import { getMoment } from './date';
import { WeatherFetcher } from './WeatherFetcher';

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [date, setDate] = useState<Moment | null>(getMoment());
    const handleKeyUp = useCallback((e) => {
        if (e.key === 'Enter') {
            setCity(e.target.value);
            console.log('searching for a City: ' + e.target.value)
        }
    }, [setCity]);
    return (
        <div className="App">
            <Container maxWidth="md" className="container">
                <div className="left">
                    <FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                label="Date"
                                value={date} onChange={m => setDate(m)}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                    <br/>
                    <FormControl>
                        <TextField
                            label="Ville"
                            onKeyUp={handleKeyUp}
                            id="city"
                        />
                    </FormControl>
                </div>
                <div className="right">
                    <WeatherFetcher city={city} date={date} />
                </div>

            </Container>
        </div>
    );
};

export default App;
