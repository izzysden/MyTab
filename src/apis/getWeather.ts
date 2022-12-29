import axios from "axios";
import dayjs from "dayjs";
import { WeatherType } from "../assets/types/weather";
import {
  getCachedLocation,
  getCachedWeather,
  validateCachedWeatherDate,
} from "../utils/validateCachedDate";

export const getWeather = async (city: string): Promise<WeatherType> => {
  const now: Date = new Date();

  if (validateCachedWeatherDate()) {
    console.log(now + ", F. WEATHER");
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          city ? city : getCachedLocation().city
        }&appid=${process.env.REACT_APP_OPENWEATHER_APIS_KEY}`
      )
      .then((response) => {
        const data: WeatherType = {
          refreshDate: now,
          temperature: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          main: response.data.weather[0].main,
          icon: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
        };
        localStorage.setItem("cachedWeather", JSON.stringify(data));
        return data;
      })
      .catch((error) => console.error(error));
  }

  console.log(now + ", C. WEATHER");
  const cachedWeather: WeatherType = getCachedWeather();
  cachedWeather.refreshDate = dayjs(cachedWeather.refreshDate).toDate();
  return cachedWeather;
};
