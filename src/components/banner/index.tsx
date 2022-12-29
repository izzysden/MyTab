import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ScrollDown, Wallpaper } from "../../assets/images";
import SearchBar from "../searchBar";

interface BannerProps {
  showArticleState: boolean;
  setShowArticleState?: React.Dispatch<React.SetStateAction<boolean>>;
  size: "minimize" | "maximize";
}

const Banner = ({
  showArticleState,
  setShowArticleState,
  size,
}: BannerProps) => {
  const [time, setTime] = useState<string>();
  const [inputFocusState, setInputFocusState] = useState<string>("");

  useEffect(() => {
    setTime(`${dayjs().format("HH:mm:ss")}`);
    const timer = setInterval(() => {
      setTime(`${dayjs().format("HH:mm:ss")}`);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Wrapper
      inputFocusState={inputFocusState}
      showArticleState={showArticleState}
      size={size}
    >
      <img src={Wallpaper} alt="Wallpaper" />
      <div>
        <h1>{time}</h1>
        <SearchBar
          inputFocusState={inputFocusState}
          setInputFocusState={setInputFocusState}
        />
      </div>
      <img
        src={ScrollDown}
        alt="Scroll down"
        onClick={() => {
          if (!showArticleState) setShowArticleState!(!showArticleState);
        }}
      />
    </Wrapper>
  );
};

export default Banner;

interface WrapperProps {
  inputFocusState: string;
}

const Wrapper = styled.header<WrapperProps & BannerProps>`
  width: 100vw;
  height: 480px;

  ${(props) => props.size === "maximize" && "height: 100vh;"}

  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-reduced-motion: no-preference) {
    transition: height 0.25s ease;
  }

  > img:first-of-type {
    width: 100vw;
    height: 480px;

    ${(props) => props.size === "maximize" && "height: 100vh;"}

    object-fit: cover;

    @media (prefers-reduced-motion: no-preference) {
      transition: height 0.25s ease;
    }
  }

  > img:last-of-type {
    position: absolute;

    bottom: 16px;

    height: 67.2px;

    transition: opacity 0.25s ease;

    ${(props) => !props.showArticleState && "cursor: pointer;"};

    @media (prefers-reduced-motion: no-preference) {
      animation: flash 3s ease-in-out infinite;
      ${(props) => props.showArticleState && "opacity: 0;"};
    }
  }

  > div {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 0;

    > h1 {
      margin-bottom: 16px;

      font-size: ${({ theme }) => theme.fontSizes.title};

      transition: opacity 0.25s ease;

      @media (prefers-reduced-motion: no-preference) {
        ${(props) => props.inputFocusState !== "" && "opacity: 0.25;"}
      }
    }
  }
`;
