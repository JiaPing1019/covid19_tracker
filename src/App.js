import React, {useState, useEffect} from 'react';
import InfoBox from './components/InfoBox';
import CovidMap from './components/CovidMap';
import RightSidebar from './components/RightSidebar';
import {FormControl, Select, MenuItem} from '@material-ui/core';
import {sortDataByCases} from './util';
import {COLOR_CASES, COLOR_DEATHS, COLOR_RECOVERED} from './Constants';
import appContext from './context/appContext';

import './App.css';

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  // cases, deaths, recovered
  const [casesType, setCasesType] = useState('cases');

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
    <appContext.Provider value={{country: country, countryInfo: countryInfo}}>
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
            <InfoBox
              title="Today Cases"
              cases={cases}
              todayCases={todayCases}c
              color={COLOR_CASES}
            />
            <InfoBox
              title="Death Cases"
              cases={deaths}
              todayCases={todayDeaths}
              color={COLOR_DEATHS}
            />
            <InfoBox
              title="Recovered Cases"
              cases={recovered}
              todayCases={todayRecovered}
              color={COLOR_RECOVERED}
            />
          </div>
          <CovidMap countries={countries} />
        </div>

        <div className="app__right">
          <RightSidebar tableData={tableData} casesType={casesType} />
        </div>
      </div>
    </appContext.Provider>
  );
};

export default App;
