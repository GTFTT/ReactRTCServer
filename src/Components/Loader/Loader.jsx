import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ isLoading }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
