import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  mainCont: { width: "100%" },

  title: {
    display: "flex",
    justifyContent: "center",
  },

  buttonsCont: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },

  labeledComponent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    width: "60%",
  },

  content: {
    width: "30%",
    display: "flex",
    justifyContent: "right",
  },

  deviceCode: {
    width: "15vw",
  },

  deviceDescription: {
    margin: "0.1rem 0.4rem",
    padding: " 0.15rem",
  },

  parameterContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },

  parameterDataContainer: {
    width: "75%",
    padding: "0.2rem 0",
  },

  parameterDeleteButton: {
    height: "1.2rem",
  },

  parameterID: {
    width: "3vw",
  },

  parameterKey: {
    width: "10vw",
  },

  parameterValue: {
    width: "10vw",
  },

  parameterType: {
    float: "right",
    width: "10vw",
  },

  parameterName: {
    color: "#00E0FF",
    backgroundcolor: " #363636 !important",
  },

  parameterControlsContainerHeader: {
    padding: "0.2rem 0",
    display: "flex",
    justifyContent: "space-between",
  },

  parameterControlsContainerControls: {
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
