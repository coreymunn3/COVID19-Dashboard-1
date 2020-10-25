import React, { useState, useEffect } from 'react';
// components
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
// images
import coronaImage from './img/image.png';
// data fetching
import { fetchDataTotals, fetchDataDaily } from './api/index';

const App = () => {
  // hook to store data as app state
  const [covidDataTotals, setCovidDataTotals] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [chosenCountry, setChosenCountry] = useState('US');
  // make data request on render
  useEffect(() => {
    const fetchAPI = async () => {
      // get data for covidDataTotals
      setCovidDataTotals(await fetchDataTotals('US'));
      // get data for dailyData
      const daily = await fetchDataDaily();
      setDailyData(daily.reverse());
    };
    fetchAPI();
  }, []);

  const handleCountryChange = async (country) => {
    // set country to state
    setChosenCountry(country);
    // fetch country-specific data & set to state
    setCovidDataTotals(await fetchDataTotals(country));
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt='COVID-19' />
      <Cards dataTotals={covidDataTotals} country={chosenCountry} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart
        dailyData={dailyData}
        dataTotals={covidDataTotals}
        country={chosenCountry}
      />
    </div>
  );
};

export default App;
