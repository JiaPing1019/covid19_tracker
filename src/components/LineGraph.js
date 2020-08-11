import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

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
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
        .then(response => response.json())
        .then(data => {
          let typeData = data[casesType];
          let caseChart = buildChartData(typeData);

          setHistoryData(caseChart);
        });
    };

    fetchData();
  }, [casesType]);

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
    <div>
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
