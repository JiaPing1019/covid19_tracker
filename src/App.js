import React, {useState, useEffect} from 'react';
import InfoBox from './InfoBox';
import CovidMap from './components/CovidMap';
import RightSidebar from './components/RightSidebar';
import {FormControl, Select, MenuItem} from '@material-ui/core';
import {sortDataByCases} from './util';
import 'leaflet/dist/leaflet.css';

import './App.css';

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);

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
          let sortedData = sortDataByCases(data);

          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async e => {
    const countryCode = e.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };

  const {
    cases,
    todayCases,
    deaths,
    todayDeaths,
    recovered,
    todayRecovered,
  } = countryInfo;

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
        </div>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem key={country.name} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="app__infobox">
          <InfoBox title="Today Cases" cases={cases} todayCases={todayCases} />
          <InfoBox
            title="Death Cases"
            cases={deaths}
            todayCases={todayDeaths}
          />
          <InfoBox
            title="Recovered Cases"
            cases={recovered}
            todayCases={todayRecovered}
          />
        </div>
        <CovidMap countries={countries} />
      </div>

      <div className="app__right">
        <RightSidebar tableData={tableData} />
      </div>
    </div>
  );
};

export default App;
