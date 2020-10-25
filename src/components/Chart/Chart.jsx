import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
// styles
import styles from './Chart.module.css';

const Chart = ({
  dailyData,
  dataTotals: { confirmed, recovered, deaths },
  country,
}) => {
  // build bar chart
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current Infections in ${country}` },
      }}
    />
  ) : null;
  // build line chart
  const lineChart =
    dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ positive }) => positive),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map(({ recovered }) => recovered),
              label: 'Recovered',
              borderColor: 'rgba(0, 255, 0, 0.5)',
              fill: true,
            },
            {
              data: dailyData.map(({ death }) => death),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  // show the bar chart if a country is selected, else show the line chart
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
