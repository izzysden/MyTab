import dayjs from "dayjs";
import { LocationType } from "../assets/types/location";
import { WeatherType } from "../assets/types/weather";

export const getCachedWeather = (): WeatherType => {
  return JSON.parse(localStorage.getItem("cachedWeather")!);
};
export const getCachedLocation = (): LocationType => {
  return JSON.parse(localStorage.getItem("cachedLocation")!);
};

export const validateCachedWeatherDate = (): boolean => {
  const now: Date = new Date();
  if (getCachedWeather()) {
    const cachedWeather: WeatherType = getCachedWeather();
    cachedWeather.refreshDate = dayjs(cachedWeather.refreshDate).toDate();
    const diffTime: number =
      Math.abs(now.valueOf() - cachedWeather.refreshDate.valueOf()) / 1000;

    if (cachedWeather.refreshDate === undefined || diffTime > 3600) return true;
    else return false;
  } else return true;
};

export const validateCachedLocationDate = (): boolean => {
  const now: Date = new Date();
  if (getCachedLocation()) {
    const cachedLocation: LocationType = getCachedLocation();
    cachedLocation.refreshDate = dayjs(cachedLocation.refreshDate).toDate();
    const diffTime: number =
      Math.abs(now.valueOf() - cachedLocation.refreshDate.valueOf()) / 1000;

    if (cachedLocation.refreshDate === undefined || diffTime > 3600)
      return true;
    else return false;
  } else return true;
};
