// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchDevices, selectDevices } from "./redux/duck";
import Styles from "./styles.module.css";
import history from "store/history";
// import Block from "../../Components/Block";
// import SpanBlock from "../../Components/SpanBlock";

import { Box } from "@mui/system";
import Block from "Components/Block";
import SpanBlock from "Components/SpanBlock";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  fetchDevices,
  getDeviceByIdAction,
  selectDevices,
  selectEditDevice,
  setDeviceById,
} from "./redux/duck";
import { Button } from "rtc-ui-library";
import NewDeviceModal from "Modals/NewDeviceModal/NewDeviceModal";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";
// import { Button } from "@mui/material";

// const mapStateToProps = (state) => ({
//   devices: selectDevices(state),
// });

// const mapDispatchToProps = {
//   fetchDevices,
// };

// class Devices extends Component {
//   componentDidMount() {
//     this.props.fetchDevices();
//   }

//   renderDevice(device) {
//     return (
//       <Block key={device.id}>
//         <SpanBlock>ID: {device.id}</SpanBlock>
//         <SpanBlock className={Styles.deviceCode}>
//           Code: {device.deviceCode}
//         </SpanBlock>
//         <span>{device.name}</span>
//       </Block>
//     );
//   }

//   render() {
//     console.log("devices: ", this.props.devices);
//     return (
//       <div className={Styles.container}>
//         <button
//           onClick={() => {
//             const id = 3;
//             // TODO: This path is hardcoded
//             history.push(`/smartPlug/${id}`);
//           }}
//         >
//           Open plug with id 3
//         </button>
//         {this.props.devices.map((device) => {
//           return this.renderDevice(device);
//         })}
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Devices);

const selector = createSelector(
  selectDevices,
  selectEditDevice,
  (devicesList, editDevice) => ({
    devicesList,
    editDevice,
  })
);

const DevicesPage = () => {
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  const { devicesList, editDevice } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  return (
    <Box className={Styles.container}>
      <NewDeviceModal
        isOpen={deviceModalOpen}
        handleClose={() => {
          setDeviceModalOpen(false);
        }}
        editDevice={editDevice}
      />
      {/* <button
        onClick={() => {
          const id = 3;
          history.push(`/smartPlug/${id}`);
        }}
      >
        Open plug with id 3
      </button> */}
      <Grid
        container
        sx={{ backgroundColor: "#4B4F4F", height: "35px" }}
        alignItems="center"
      >
        <Grid item xs={0.5}>
          <SpanBlock className={Styles.gridCentered}>ID</SpanBlock>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <SpanBlock>Code</SpanBlock>
        </Grid>
        <Grid item>
          <SpanBlock>Name</SpanBlock>
        </Grid>
      </Grid>
      {devicesList.map((device) => (
        <Box
          sx={{
            cursor: "pointer",
            transition: "0.3s all ease",
            "&:hover": {
              filter: "brightness(1.3)",
            },
            mb: "5px",
          }}
          key={device.id}
          onClick={() => history.push(`/devices/${device.id}`)}
        >
          <Block>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <SpanBlock>{device.id}</SpanBlock>
                <SpanBlock className={Styles.deviceCode}>
                  {device.deviceCode}
                </SpanBlock>
                <span>{device.name}</span>
              </Box>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDeviceModalOpen(true);
                  dispatch(getDeviceByIdAction(device.id));
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Block>
        </Box>
      ))}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={() => {
            dispatch(setDeviceById(null));
            setDeviceModalOpen(true);
          }}
        >
          Create Device
        </Button>
      </Box>
    </Box>
  );
};

export default DevicesPage;
