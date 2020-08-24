import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '33%',
    marginRight: 5,
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCount: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    color: '#f00',
  },
  totalCount: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const InfoBox = ({title, cases, todayCases, color}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} style={{color}}>{title}</Typography>
        <Typography className={classes.todayCount}> + {todayCases}</Typography>
        <Typography className={classes.totalCount}>{cases}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
