import React, {useCallback, useState} from 'react';
import './App.css';
import {Weather} from "./Weather";

const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const handleKeyUp = useCallback((e) => {
        if (e.key === 'Enter') {
            setCity(e.target.value);
            console.log('searching for a new city: ' + e.target.value)
        }
    }, [setCity]);
  return (
      <div className="App">
          <input type="text" name="city" onKeyUp={handleKeyUp}/>
          {city && (<Weather city={city}/>)}
      </div>
  );
};

export default App;
