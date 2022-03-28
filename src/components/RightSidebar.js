import React from 'react';
import Table from './Table';
import LineGraph from './LineGraph';
import {COLOR_CASES, COLOR_DEATHS, COLOR_RECOVERED} from './../Constants';
import {Card, CardContent} from '@material-ui/core';

import './RightSidebar.css';

const RightSidebar = ({tableData, casesType}) => {
  console.log(tableData);
  return (
    <div>
      <Card>
        <CardContent>
          <div className="app__information">
            <h3>History graph</h3>
            <LineGraph casesType="cases" color={COLOR_CASES} />
            <LineGraph casesType="deaths" color={COLOR_DEATHS} />
            <LineGraph casesType="recovered" color={COLOR_RECOVERED} />
          </div>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
