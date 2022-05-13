import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  "@keyframes quiet": {
    "25%": {
      transform: "scaleY(0.6)",
    },
    "50%": {
      transform: "scaleY(0.4)",
    },
    "75%": {
      transform: "scaleY(0.8)",
    },
  },

  "@keyframes normal": {
    "25%": {
      transform: "scaleY(1)",
    },
    "50%": {
      transform: "scaleY(0.4)",
    },
    "75%": {
      transform: "scaleY(0.6)",
    },
  },
  "@keyframes loud": {
    "25%": {
      transform: "scaleY(1)",
    },
    "50%": {
      transform: "scaleY(0.4)",
    },
    "75%": {
      transform: "scaleY(1.2)",
    },
  },

  //   .box{
  //     transform: scaleY(.4);
  //     height: 100%;
  //     width: var(--boxSize);
  //     background: #12E2DC;
  //     animation-duration: 1.2s;
  //     animation-timing-function: ease-in-out;
  //     animation-iteration-count: infinite;
  //     border-radius: 8px;
  //   }

  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "34px",
    position: "absolute",
    gap: "2px",
    // top: 10,
    left: 50,
    // width: "50px",
    "& > .MuiBox-root": {
      height: "34px",
      width: "5px",
      transform: "scaleY(0.4)",
      background: "#12E2DC",
      animationDuration: "1.2s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      borderRadius: "8px",
    },
  },

  box1: {
    animationName: "$quiet",
  },

  box2: {
    animationName: "$normal",
  },

  box3: {
    animationName: "$quiet",
  },

  box4: {
    animationName: "$loud",
  },

  box5: {
    animationName: "$quiet",
  },
}));

export default useStyles;
