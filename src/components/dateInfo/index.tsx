import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDay, getMonth, getWeek, getYear } from "../../utils/getRemaining";

interface DateStateType {
  year: number;
  month: number;
  week: number;
  day: number;
}

const DateInfo = () => {
  const inputRef = useRef<HTMLInputElement[]>([]);

  const [dateState, setDateState] = useState<DateStateType>({
    year: getYear(),
    month: getMonth(),
    week: getWeek(),
    day: getDay(),
  });

  const styleProgress = (input: HTMLInputElement) => {
    input.style.setProperty("--value", input.value);
    input.style.setProperty("--min", input.min === "" ? "0" : input.min);
    input.style.setProperty("--max", input.max === "" ? "100" : input.max);
    input.style.setProperty("--value", input.value);
  };

  const tick = () =>
    setDateState({
      year: getYear(),
      month: getMonth(),
      week: getWeek(),
      day: getDay(),
    });

  useEffect(() => {
    inputRef.current.forEach((v) => styleProgress(v));
    const timer = setInterval(() => {
      tick();
      inputRef.current.forEach((v) => styleProgress(v));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <div>
        <label htmlFor="year">
          Year <span>{Math.round(dateState.year)}%</span>
        </label>
        <input
          ref={(input) => (inputRef.current[0] = input!)}
          id="year"
          type="range"
          disabled={true}
          min="0"
          max="100"
          value={dateState.year}
        />
      </div>
      <div>
        <label htmlFor="month">
          Month <span>{Math.round(dateState.month)}%</span>
        </label>
        <input
          ref={(input) => (inputRef.current[1] = input!)}
          id="month"
          type="range"
          disabled={true}
          min="0"
          max="100"
          value={dateState.month}
          onLoad={() => styleProgress(this!)}
        />
      </div>
      <div>
        <label htmlFor="week">
          Week <span>{Math.round(dateState.week)}%</span>
        </label>
        <input
          ref={(input) => (inputRef.current[2] = input!)}
          id="week"
          type="range"
          disabled={true}
          min="0"
          max="100"
          value={dateState.week}
          onLoad={() => styleProgress(this!)}
        />
      </div>
      <div>
        <label htmlFor="day">
          Day <span>{Math.round(dateState.day)}%</span>
        </label>
        <input
          ref={(input) => (inputRef.current[3] = input!)}
          id="day"
          type="range"
          disabled={true}
          min="0"
          max="100"
          value={dateState.day}
          onLoad={() => styleProgress(this!)}
        />
      </div>
    </Wrapper>
  );
};

export default DateInfo;

const Wrapper = styled.div`
  height: 228px;
  max-height: 228px;

  > div {
    margin-bottom: 16px;

    display: flex;
    flex-direction: column;

    :last-of-type {
      margin-bottom: 0;
    }

    > label {
      display: flex;
      align-items: flex-end;

      font-size: ${({ theme }) => theme.fontSizes.text};

      > span {
        margin-left: 8px;

        color: ${({ theme }) => theme.colors.grey};
        font-size: ${({ theme }) => theme.fontSizes.subText};
        font-weight: 100;
      }
    }

    input[type="range"] {
      --range: calc(var(--max) - var(--min));
      --ratio: calc((var(--value) - var(--min)) / var(--range));
      --sx: calc(0.5 * 10px + var(--ratio) * (100% - 10px));

      height: 16px;

      :focus {
        outline: none;
      }

      ::-webkit-slider-thumb {
        opacity: 0;
      }
      ::-moz-range-thumb {
        opacity: 0;
      }
      ::-ms-thumb {
        opacity: 0;
      }
      ::-ms-track {
        background: linear-gradient(
              ${({ theme }) => theme.colors.white},
              ${({ theme }) => theme.colors.white}
            )
            0 / var(--sx) 100% no-repeat,
          ${({ theme }) => theme.colors.background};

        height: 16px;

        border-radius: 25px;
      }
      ::-webkit-slider-runnable-track {
        background: linear-gradient(
              ${({ theme }) => theme.colors.white},
              ${({ theme }) => theme.colors.white}
            )
            0 / var(--sx) 100% no-repeat,
          ${({ theme }) => theme.colors.background};

        width: 576px;
        height: 16px;

        border-radius: 25px;
      }
    }
  }
`;
