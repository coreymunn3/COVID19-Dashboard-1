import React, { createContext } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({
  dataTotals: { confirmed, recovered, deaths, lastUpdate },
}) => {
  // create ideal data structure for mapping
  let dataMap = [
    {
      type: 'Confirmed',
      data: confirmed,
      desc: 'Number of Active Cases of COVID-19',
      key: '1',
    },
    {
      type: 'Recovered',
      data: recovered,
      desc: 'Number of Recoveries of COVID-19',
      key: '2',
    },
    {
      type: 'Deaths',
      data: deaths,
      desc: 'Number of Deaths from COVID-19',
      key: '3',
    },
  ];
  // data will take a second to load, make sure it's loaded
  if (!confirmed) {
    return 'Loading...';
  }
  return (
    <div>
      <Grid container spacing={3} justify='center'>
        {dataMap.map((dataItem) => (
          <Grid
            item
            component={Card}
            key={dataItem.key}
            xs={12}
            md={3}
            className={cx(
              styles.card,
              dataItem.type === 'Confirmed'
                ? styles.Confirmed
                : dataItem.type === 'Recovered'
                ? styles.Recovered
                : styles.Deaths
            )}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                {dataItem.type}
              </Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={dataItem.data.value}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant='body2'>{dataItem.desc}</Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
