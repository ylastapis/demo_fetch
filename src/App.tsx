import React, { useCallback, useState } from 'react';
import './App.scss';
import { Container, FormControl, FormControlLabel, FormGroup, Switch, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Moment } from 'moment';
import { getMoment } from './date';
import { Weather } from './Weather';

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [date, setDate] = useState<Moment | null>(getMoment());
    const [visible, setVisible] = useState(true);
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
                                minDate={getMoment()}
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
                    <br/>
                    <FormControl>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={<Switch
                                    checked={visible}
                                    onChange={() => setVisible(oldState => !oldState)}
                                    value="checkedB"
                                    color="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                                label="Visible"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <div className="right">
                    {visible  && (<Weather city={city} date={date} />)}
                </div>
            </Container>
        </div>
    );
};

export default App;
