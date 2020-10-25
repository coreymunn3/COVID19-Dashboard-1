import axios from 'axios';

export const fetchDataTotals = async (country) => {
  // create URL path based on country selection
  let url = '';
  if (country) {
    url = `https://covid19.mathdro.id/api/countries/${country}`;
  } else {
    url = 'https://covid19.mathdro.id/api';
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataDaily = async () => {
  const url = 'https://api.covidtracking.com/v1/us/daily.json';
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCountries = async () => {
  try {
    const res = await axios.get('https://covid19.mathdro.id/api/countries');
    // extract country names
    const countryArr = res.data.countries.map((country) => country.name);
    return countryArr;
  } catch (error) {
    console.error(error);
  }
};
