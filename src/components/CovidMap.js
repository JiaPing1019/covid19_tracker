import React, {useState} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import { showDataOnMap } from "./../util";

import './CovidMap.css';


const CovidMap = ({countries}) => {
  const [casesType, setCasesType] = useState("cases");
  const [zoom, setZoom] = useState(11)
  // Locate to Tokyo for now
  const [center, setCenter] = useState({ lat: 35.6804, lng: 139.7690 })

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
