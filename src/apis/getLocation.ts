import dayjs from "dayjs";
import Geocode from "react-geocode";
import { LocationType } from "../assets/types/location";
import {
  getCachedLocation,
  validateCachedLocationDate,
} from "../utils/validateCachedDate";

export const getLocation = async (): Promise<LocationType | undefined> => {
  const now: Date = new Date();

  if (validateCachedLocationDate()) {
    console.log(now + ", F. LOCATION");
    Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_APIS_KEY}`);
    navigator.geolocation.getCurrentPosition(async (position) => {
      await Geocode.fromLatLng(
        position.coords.latitude.toString(),
        position.coords.longitude.toString()
      ).then(
        (response) => {
          const address: string[] =
            response.plus_code.compound_code.split(", ");
          const data = {
            refreshDate: now,
            city: address[0].split(" ")[1],
            country: address[1],
          };
          localStorage.setItem("cachedLocation", JSON.stringify(data));
          return data;
        },
        (error) => console.error(error)
      );
    });
  }

  console.log(now + ", C. LOCATION");
  const cachedLocation: LocationType = getCachedLocation();
  cachedLocation.refreshDate = dayjs(cachedLocation.refreshDate).toDate();
  return cachedLocation;
};
