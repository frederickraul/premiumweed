import { State, Country, City } from 'country-state-city';


const formatedCountries = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
  flag: country.flag,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const formatedStates = State.getStatesOfCountry('US').map((country) => ({
  value: country.isoCode,
  label: country.name,
  flag: country.countryCode,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const formatedCities = City.getCitiesOfState('US','CA').map((country) => ({
  value: country.countryCode,
  label: country.name,
  flag: country.countryCode,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const useCountries = () => {
  const getAll = () => formatedCountries;

  const getStatesOfCountry = (country: string) => {
      return State.getStatesOfCountry(country).map((country) => ({
        value: country.isoCode,
        label: country.name,
        flag: country.countryCode,
        latlng: [country.latitude,country.longitude],
        //region: country.region
      }));
  };

  const getCitiesOfState = (country: string, state: string) => {
      return City.getCitiesOfState(country, state).map((country) => ({
        value: country.countryCode,
        label: country.name,
        flag: country.countryCode,
        latlng: [country.latitude,country.longitude],
        //region: country.region
      }));
  };

  const getByValue = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  }
  
  return{
    getAll,
    getByValue,
    getStatesOfCountry,
    getCitiesOfState
  }
}

export default useCountries;