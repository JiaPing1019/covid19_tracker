import React, {useState, useEffect} from 'react';
import InfoBox from './InfoBox';
import {FormControl, Select, MenuItem} from '@material-ui/core';

import './App.css';

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            id: data[0].countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = () => {};

  const {cases, todayCases, deaths, todayDeaths, recovered, todayRecovered} = countryInfo;

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
        </div>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem
                key={country.name}
                value={country.value}
                onChange={onCountryChange}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="app__infobox">
					<InfoBox title="Today Cases" cases={cases} todayCases={todayCases} />
					<InfoBox title="Death Cases" cases={deaths} todayCases={todayDeaths} />
					<InfoBox title="Recovered Cases" cases={recovered} todayCases={todayRecovered} />
				</div>

        {/* Table */}
        {/* Graph */}

        {/* Map */}
      </div>
    </div>
  );
};

export default App;
