import { useState } from "react";
import styled from "styled-components";
import { Search } from "../../assets/images";

interface SearchBarProps {
  inputFocusState: string;
  setInputFocusState: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ inputFocusState, setInputFocusState }: SearchBarProps) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  return (
    <Wrapper
      inputFocusState={inputFocusState}
      isEmpty={isEmpty}
      action="https://www.google.com/search"
      method="GET"
      target="_blank"
      rel="noreferrer"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        const input: HTMLInputElement = e.currentTarget[1] as HTMLInputElement;
        if (input.value.length <= 0) e.preventDefault();
      }}
      onMouseEnter={() => {
        if (inputFocusState !== "focus") setInputFocusState("mouseEnter");
      }}
      onMouseLeave={() => {
        if (inputFocusState === "mouseEnter") setInputFocusState("");
      }}
    >
      <label htmlFor="q">
        <button type="submit">
          <img src={Search} alt="search" />
        </button>
        <input
          type="search"
          id="q"
          title="Search bar"
          name="q"
          autoComplete="off"
          maxLength={250}
          placeholder="Search the web"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsEmpty(e.currentTarget.value.length <= 0);
          }}
          onFocus={() => {
            setInputFocusState("focus");
          }}
          onBlur={() => {
            if (inputFocusState === "focus") setInputFocusState("");
          }}
        />
      </label>
    </Wrapper>
  );
};

export default SearchBar;

interface WrapperProps {
  inputFocusState: string;
  isEmpty: boolean;
}

const Wrapper = styled.form<WrapperProps>`
  border-radius: 25px;
  transition: transform 0.25s ease;

  ${({ theme }) => theme.common.boxShadow}

  @media (prefers-reduced-motion: no-preference) {
    ${(props) =>
      props.inputFocusState === "" &&
      `transform: scale(0.9); > label { opacity: 0.25; }`};
  }

  > label {
    background-color: ${({ theme }) => theme.colors.white};

    padding: 16px;

    width: 80.5vw;
    height: 67.2px;

    display: flex;
    align-items: center;

    border-radius: 25px;
    cursor: text;
    transition: opacity 0.25s ease;

    @media screen and (min-width: 720px) {
      width: 60vw;
    }

    @media screen and (min-width: 1440px) {
      width: 40vw;
    }

    > button {
      background-color: transparent;

      display: flex;

      border: none;

      > img {
        ${(props) => !props.isEmpty && "filter: brightness(0);"}

        cursor: pointer;
      }
    }

    > input {
      margin-left: 16px;

      width: 100%;

      color: ${({ theme }) => theme.colors.black};
      font-size: ${({ theme }) => theme.fontSizes.inputText};

      border: none;
      outline: none;

      ::placeholder {
        color: ${({ theme }) => theme.colors.grey};
      }
    }
  }
`;
