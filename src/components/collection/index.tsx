import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Delete, Playlist } from "../../assets/images";
import { PlaylistType } from "../../assets/types/playlist";
import { scrollNext, scrollPrev } from "../../utils/scroll";

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
    if (text)
      if (playlistState.findIndex((v) => v.url === text) === -1) {
        const now = new Date();
        const Data: PlaylistType = {
          url: text,
          createdDate: `${
            now.getMonth() + 1
          }/${now.getDate()}/${now.getFullYear()}`,
          playedTimes: 0,
        };
        localStorage.setItem(
          "playlist",
          JSON.stringify([Data, ...playlistState])
        );
        setPlaylistState([Data, ...playlistState]);
      } else alert("The item already exists.");
  };

  useEffect(() => {
    window.addEventListener("resize", resizeItem);

    const cachedPlaylist: PlaylistType[] = JSON.parse(
      localStorage.getItem("playlist")!
    ) as PlaylistType[];

    if (cachedPlaylist && playlistState.length === 0)
      setPlaylistState([...playlistState, ...cachedPlaylist]);

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
        <span>
          <img src={Playlist} alt="playlist" /> Your Playlist
        </span>
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
                <li key={v.url}>
                  <ReactPlayer
                    url={v.url}
                    loop={true}
                    width={362}
                    height={224}
                    pip={true}
                    stopOnUnmount={false}
                    onStart={() => {}}
                  />
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      ) {
                        const temp: PlaylistType[] = playlistState.filter(
                          (playlist) => playlist.url !== v.url
                        );
                        setPlaylistState(temp);
                        localStorage.setItem("playlist", JSON.stringify(temp));
                      }
                    }}
                  />
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

    > span {
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        margin-right: 8px;
        object-fit: contain;
      }
    }

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

  transform: translateY(5px);

  width: calc(100% - 60px);
  ${(props) =>
    props.hasScrollbar === true
      ? "transform: translateY(0px); height: 222px; padding-bottom: 8px;"
      : "height: 234px;"}

  white-space: nowrap;

  list-style-type: none;
  overflow-x: scroll;
  overflow-y: hidden;

  > strong {
    background-color: ${({ theme }) => theme.colors.background};

    width: 100%;
    ${(props) =>
      props.hasScrollbar === true ? "height: 204px;" : "height: 224px;"}

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
  }

  > li {
    background-color: ${({ theme }) => theme.colors.background};

    margin-right: 8px;

    width: 362px;
    ${(props) =>
      props.hasScrollbar === true ? "height: 204px;" : "height: 224px;"}

    display: inline-flex;
    justify-content: center;

    border-radius: 8px;

    ${({ theme }) => theme.common.hoverEffect}

    :last-of-type {
      margin-right: 0;
    }

    :hover {
      > img {
        display: flex;
      }
    }

    > img {
      background-color: ${({ theme }) => theme.colors.translucent};

      position: absolute;
      left: 8px;
      bottom: 8px;

      padding: 8px;

      display: none;

      border-radius: 8px;

      ${({ theme }) => theme.common.hoverEffect}
    }

    div,
    iframe {
      width: 100%;
      ${(props) =>
        props.hasScrollbar === true
          ? "height: 204px !important;"
          : "height: 224px !important;"}

      border-radius: 8px;
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
    border-radius: 8px;

    ${({ theme }) => theme.common.hoverEffect}
  }
`;
