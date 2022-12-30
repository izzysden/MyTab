import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getLocation } from "../../apis/getLocation";
import { getWeather } from "../../apis/getWeather";
import { LocationType } from "../../assets/types/location";
import { WeatherType } from "../../assets/types/weather";

const WeatherInfo = () => {
  const [locationState, setLocationState] = useState<LocationType>({
    refreshDate: "",
    city: "Awaiting Permission...",
    country: "",
  });
  const [weatherState, setWeatherState] = useState<WeatherType>({
    refreshDate: "",
    temperature: 273,
    feels_like: 273,
    main: "",
    icon: "https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const data: LocationType = (await getLocation()) as LocationType;
      if (data) setLocationState(data);
      return data;
    };
    fetchLocation().then((response) => {
      const fetchWeather = async () => {
        const data: WeatherType = (await getWeather(
          response.city
        )) as WeatherType;
        if (data) setWeatherState(data);
      };
      fetchWeather();
    });
  }, []);

  return (
    <Wrapper>
      <h2>
        {locationState.city}
        {locationState.country === "South Korea"
          ? ", Korea"
          : locationState.country !== "" && ", " + locationState.country}
      </h2>
      {weatherState.main !== "" && (
        <div>
          <img src={weatherState.icon} alt={weatherState.main} />
          <h3>{(weatherState.temperature - 273).toFixed(1)}°C</h3>
          <div>
            <h3> {weatherState.main}</h3>
            <span>
              FEELS LIKE{" "}
              <strong>{(weatherState.feels_like - 273).toFixed(1)}°C</strong>
            </span>
          </div>
        </div>
      )}
      {`${dayjs(weatherState.refreshDate).format("HH:mm")}` !==
      "Invalid Date" ? (
        <span>
          Updated on {dayjs(weatherState.refreshDate).format("HH:mm")}
        </span>
      ) : (
        <>
          <span>Update Failed.</span>
          <span>
            Please refresh the website as soon as permission is granted.
          </span>
        </>
      )}
    </Wrapper>
  );
};

export default WeatherInfo;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  padding: 16px;

  height: 228px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 25px;

  h2 {
    display: flex;
    align-items: flex-end;

    font-size: ${({ theme }) => theme.fontSizes.title};

    > span {
      margin-left: 8px;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.description};
  }

  > div {
    display: flex;
    align-items: center;

    > img {
      margin-right: calc(4px - 0.1vw);

      width: 80px;
      height: 80px;

      object-fit: contain;
    }

    > h3 {
      margin-right: 8px;

      font-size: ${({ theme }) => theme.fontSizes.title};
    }

    > div {
      width: 50%;

      display: flex;
      flex-direction: column;

      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }
`;
