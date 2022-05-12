import { Box } from "@mui/system";
import useStyles from "./styles";

const SoundWave = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.box1} />
      <Box className={classes.box2} />
      <Box className={classes.box3} />
      <Box className={classes.box4} />
      <Box className={classes.box5} />
    </Box>
  );
};

export default SoundWave;
