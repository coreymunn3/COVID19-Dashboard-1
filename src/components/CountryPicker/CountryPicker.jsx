import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api/index';
// styles
import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
  // hook to store countries as state
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        default=''
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value=''>Global</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
