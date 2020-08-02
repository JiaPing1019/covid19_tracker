import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';
import './InfoBox.css';

const useStyles = makeStyles({
  root: {
    width: 200,
		marginRight: 5
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
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
		color: '#f00'
	},
	totalCount: {
    fontSize: 16,
		display: 'flex',
  	alignItems: 'center',	
		justifyContent: 'center',
	},
});

const InfoBox = props => {
  const classes = useStyles();
  const {title, cases, todayCases} = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.todayCount}> + {todayCases}</Typography>
        <Typography className={classes.totalCount}>{cases}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
