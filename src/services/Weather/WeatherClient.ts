import axios from 'axios';
import { BASE_WEATHER_URL } from '@/configs/consts';

const WeatherClient = axios.create({
  baseURL: BASE_WEATHER_URL,
});

export default WeatherClient;