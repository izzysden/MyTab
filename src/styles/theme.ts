const fontSizes = {
  title: "32px",
  inputText: "28px",
  subTitle: "24px",
  text: "24px",
  subText: "20px",
  description: "16px",
};

const colors = {
  main: "#5A1ABF",
  subMain: "#451D97",
  white: "#fff",
  black: "#000",
  grey: "#b9b9b9",
  background: "#444",
  translucent: "rgba(0, 0, 0, 0.25)",
};

const common = {
  boxShadow: `box-shadow: 0 0 8px ${colors.translucent};`,
  ellipsis: "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
  hoverEffect: `transition: filter 0.25s ease; cursor: pointer; :hover { filter: brightness(125%) drop-shadow(0 0 0.5rem ${colors.translucent}); }`,
};

const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;
