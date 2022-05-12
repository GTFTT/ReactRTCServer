import { Checkbox } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const SpeechMicrophone = ({ ...props }) => {
  return (
    <Checkbox
      sx={{ borderRadius: "50%" }}
      icon={<MicOffIcon style={{ fontSize: "40px", fill: "#c1f4ff" }} />}
      checkedIcon={<MicIcon style={{ fontSize: "40px", fill: "#c1f4ff" }} />}
      {...props}
    />
  );
};

export default SpeechMicrophone;
