import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PlaylistType } from "../../assets/types/playlist";
import { scrollNext, scrollPrev } from "../../utils/scroll";
const usetube = require("usetube");

const Collection = () => {
  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);
  const [playlistState, setPlaylistState] = useState<PlaylistType[]>([]);
  const wrapperRef = useRef<HTMLUListElement>(null);

  const resizeItem = () => {
    if (wrapperRef && wrapperRef.current) {
      if (wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth)
        setHasScrollbar(true);
      else setHasScrollbar(false);
    }
  };

  const addPlaylist = async () => {
    const text = prompt("Please type your youtube playlist link.", "");
    if (text) {
      const playlistInfo = await usetube.getPlaylistVideos(
        text.replace("https://youtube.com/playlist?list=", "")
      );
      if (playlistInfo) {
        const data: PlaylistType = {
          url: text,
          thumbnail: `http://img.youtube.com/vi/${playlistInfo[0].id}/hqdefault.jpg`,
          title: `Mix - ${playlistInfo[0].title}`,
          songs: playlistInfo.map((v: { title: string }) => v.title),
          duration: playlistInfo
            .map((v: { duration: number }) => v.duration)
            .reduce((a: number, b: number) => a + b),
        };
        localStorage.setItem(
          "playlist",
          JSON.stringify([data, ...playlistState])
        );
        setPlaylistState([data, ...playlistState]);
      } else alert("Invalid Link Error.");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeItem);
    return () => window.removeEventListener("resize", resizeItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resizeItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistState]);

  return (
    <Wrapper>
      <h2>
        Your Playlist
        <button type="button" onClick={() => addPlaylist()}>
          +
        </button>
      </h2>
      <div>
        <Scroll>
          <div
            onClick={() =>
              scrollPrev(wrapperRef as React.MutableRefObject<HTMLUListElement>)
            }
          >
            ◀
          </div>
          <div
            onClick={() =>
              scrollNext(wrapperRef as React.MutableRefObject<HTMLUListElement>)
            }
          >
            ▶
          </div>
        </Scroll>
        <List ref={wrapperRef} hasScrollbar={hasScrollbar}>
          {playlistState.length > 0 ? (
            playlistState.map((v) => {
              return (
                <li>
                  <span>a</span>
                </li>
              );
            })
          ) : (
            <strong>Playlist Not Found</strong>
          )}
        </List>
      </div>
    </Wrapper>
  );
};

export default Collection;

const Wrapper = styled.div`
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  > h2 {
    padding-bottom: 8px;
    margin-bottom: 8px;

    display: flex;
    justify-content: space-between;

    font-size: ${({ theme }) => theme.fontSizes.text};

    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

    > button {
      background-color: transparent;

      color: ${({ theme }) => theme.colors.grey};
      font-size: ${({ theme }) => theme.fontSizes.text};

      border: none;

      ${({ theme }) => theme.common.hoverEffect}
    }
  }
`;

interface ListProps {
  hasScrollbar: boolean;
}

const List = styled.ul<ListProps>`
  position: absolute;

  padding-bottom: 10px;

  width: calc(100% - 60px);

  list-style-type: none;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  > strong {
    background-color: ${({ theme }) => theme.colors.background};

    transform: translateY(9px);

    width: 100%;
    height: 224px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
  }

  > li {
    background-color: ${({ theme }) => theme.colors.background};

    margin-right: 10px;

    width: 362px;
    ${(props) =>
      props.hasScrollbar === true
        ? "height: 204px;"
        : "height: 224px; transform: translateY(9px);"}

    display: inline-flex;

    border-radius: 10px;

    ${({ theme }) => theme.common.hoverEffect}

    :last-of-type {
      margin-right: 0;
    }
  }
`;

const Scroll = styled.div`
  width: 100%;
  height: 224px;

  display: flex;
  justify-content: space-between;

  > div {
    background-color: ${({ theme }) => theme.colors.background};

    width: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${({ theme }) => theme.colors.subText};

    user-select: none;
    border-radius: 10px;

    ${({ theme }) => theme.common.hoverEffect}
  }
`;
