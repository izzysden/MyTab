import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Banner from "./components/banner";
import Collection from "./components/collection";
import DateInfo from "./components/dateInfo";
import Menu from "./components/menu";
import TodoList from "./components/todoList";
import WeatherInfo from "./components/weatherInfo";
import { GlobalStyle } from "./styles/globalStyle";
import theme from "./styles/theme";

function App() {
  const [showArticleState, setShowArticleState] = useState<boolean>(false);

  useEffect(() => {
    const toggleArticle = (e: WheelEvent) => {
      if (document.body.offsetHeight - window.innerHeight === 0 && e.deltaY > 0)
        setShowArticleState(true);
      else if (e.deltaY < 0 && window.scrollY === 0) setShowArticleState(false);
    };
    document.addEventListener("wheel", (e) => toggleArticle(e));
    return () => document.removeEventListener("wheel", (e) => toggleArticle(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper showArticleState={showArticleState}>
        <Banner
          showArticleState={showArticleState}
          setShowArticleState={setShowArticleState}
          size={showArticleState === false ? "maximize" : "minimize"}
        />
        <article>
          <Menu showArticleState={showArticleState} />
          <div>
            <DateInfo />
            <WeatherInfo />
            <TodoList />
          </div>
          <Collection />
        </article>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

interface WrapperProps {
  showArticleState: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  ${(props) =>
    props.showArticleState === false && "height: 100vh; overflow: hidden;"};

  > article {
    > div {
      padding-left: 10%;
      padding-right: 10%;
      margin-top: 16px;

      display: flex;

      > div {
        width: 100%;

        :nth-of-type(2) {
          margin-left: 1.5%;
          margin-right: 1.5%;

          width: calc(100% - 32px);
        }
      }
    }
  }
`;
