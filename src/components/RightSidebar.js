import React, {useState} from 'react';
import Table from './Table';

import './RightSidebar.css';
import {Card, CardContent} from '@material-ui/core';

const RightSidebar = ({tableData}) => {
  return (
    <Card>
      <CardContent>
        <div className="app__information">
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RightSidebar;
