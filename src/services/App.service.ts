import { log } from '@utils/LoggerUtil';
import { HEADERS } from 'apisauce';
import axios from 'axios';
// import Config from 'react-native-config';
// import Api from './Api.service';

const clientBody = {
  grant_type: `client_credentials`,
  scope: '*'
};

const API_BASE_URL = 'https://api.openbrewerydb.org';

const getBreweryApi = (data: any) => {
  return axios.get(`${API_BASE_URL}/breweries?per_page=10`)
}

const getMoreBrewery = (page: any) => {
  log('getMoreBrewery_API', page)
  return axios.get(`${API_BASE_URL}/breweries?per_page=${page}`)
}

const searchBreweries = (search: string) => {
  log('searchBreweries_API', search)
  return axios.get(`${API_BASE_URL}/v1/breweries?by_name=${search}&per_page=15`)
}

export default {
  getBreweryApi,
  getMoreBrewery,
  searchBreweries,
}