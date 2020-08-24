import React, {useState, useEffect, useContext} from 'react';
import {Map, TileLayer} from 'react-leaflet';
import {showDataOnMap} from './../util';
import appContext from '../context/appContext';

import './CovidMap.css';

const fetchLocation = country => {
  // Set default to Tokyo
  const lat = country.countryInfo ? country.countryInfo.lat : 35.6804;
  const long = country.countryInfo ? country.countryInfo.long :  139.769;

  return {lat: lat, lng: long};
};

const CovidMap = ({countries}) => {
  const props = useContext(appContext);
  const countryInfo = props.countryInfo
  const [casesType, setCasesType] = useState('cases');
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState({lat: 35.6804, lng: 139.769});

  useEffect(() => {
    const locationHash = fetchLocation(countryInfo);
    setCenter(locationHash);
  }, [countryInfo]);

  return (
    <div className="map">
      <Map center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      {showDataOnMap(countries, casesType)}
    </div>
  );
};

export default CovidMap;
