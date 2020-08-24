import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet';

export const fetchURL = (countryCode) => {
  if (countryCode === 'worldwide') {
     return 'https://disease.sh/v3/covid-19/historical/all'
  } else {
    return `https://disease.sh/v3/covid-19/historical/${countryCode}`;
  }
};

export const sortDataByCases = (data) => {
  return data.sort((a, b) => a.cases > b.cases ? -1 : 1);
};

export const showDataOnMap = (data, casesType) =>
  data.map(
    country =>
      country.countryInfo && (
        <Circle center={[country.countryInfo.lat, country.countryInfo.long]}>
          <Popup>
            <div className="info-container">
              <div
                className="info-flag"
                style={{
                  backgroundImage: `url(${country.countryInfo.flag})`,
                }}></div>
              <div className="info-name">{country.country}</div>
              <div className="info-confirmed">
                Cases: {numeral(country.cases).format('0,0')}
              </div>
              <div className="info-recovered">
                Recovered: {numeral(country.recovered).format('0,0')}
              </div>
              <div className="info-deaths">
                Deaths: {numeral(country.deaths).format('0,0')}
              </div>
            </div>
          </Popup>
        </Circle>
      ),
  );
