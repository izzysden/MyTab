import styled from "styled-components";
import { Github, Twitch, Youtube } from "../../assets/images";

interface MenuProps {
  showArticleState: boolean;
}

const Menu = ({ showArticleState }: MenuProps) => {
  return (
    <Wrapper showArticleState={showArticleState}>
      <button id="twitch" type="button">
        <img src={Twitch} alt="Twitch" />
        <span>PODCAST</span>
      </button>
      <button id="youtube" type="button">
        <img src={Youtube} alt="Youtube" />
        <span>PLAYLIST</span>
      </button>
      <button id="github" type="button">
        <img src={Github} alt="Github" />
        <span>WORK</span>
      </button>
    </Wrapper>
  );
};

export default Menu;

const Wrapper = styled.menu<MenuProps>`
  transform: translateY(-6.71px);

  width: 100%;
  height: 67.1px;

  display: flex;
  align-items: flex-end;

  ${(props) => !props.showArticleState && "pointer-events: none;"}

  > button {
    background-color: ${({ theme }) => theme.colors.subMain};

    width: 33.333%;
    height: 60.39px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.text};
    text-decoration: none;

    border: none;
    cursor: pointer;

    ${({ theme }) => theme.common.hoverEffect}

    transition: height 0.25s ease, filter 0.25s ease;

    > img {
      margin-right: 8px;
    }

    :nth-of-type(2) {
      background-color: ${({ theme }) => theme.colors.main};
    }

    ::before {
      position: absolute;
      top: -28px;

      display: flex;
      justify-content: center;

      opacity: 0;
      transition: top 0.25s ease, opacity 0.25s ease;
      content: "▽";
    }

    :hover {
      height: 67.1px;

      border: 1px solid ${({ theme }) => theme.colors.white};

      ::before {
        top: -36px;

        opacity: 1;
      }
    }
  }
`;
