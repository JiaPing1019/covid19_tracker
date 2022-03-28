import React, {useState, useEffect, useContext} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';
import appContext from '../context/appContext';
import {fetchURL} from '../util';

import './LineGraph.css';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const LineGraph = ({casesType, color}) => {
  const props = useContext(appContext);
  const [historyData, setHistoryData] = useState({});
  const country = props.country;
  const url = fetchURL(country);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${url}?lastdays=30`)
        .then(response => response.json())
        .then(data => {
          // Need to have this line because
          // the format of world and country is different  
          data = data['timeline'] ? data['timeline'] : data
          let typeData = data[casesType];
          let caseChart = buildChartData(typeData);

          setHistoryData(caseChart);
        });
    };

    fetchData();
  }, [casesType, country, url]);

  const buildChartData = (data) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[date];
    }

    return chartData;
  };

  return (
      <div className="graph__information">
        {historyData.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: color, 
                  data: historyData,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
  );
};

export default LineGraph;
