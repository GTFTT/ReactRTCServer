import { Box } from "@mui/system";
import Block from "Components/Block";
import Loader from "Components/Loader/Loader";
import SpanBlock from "Components/SpanBlock";
import DeviceParametersModal from "Modals/DeviceParametersModal/DeviceParametersModal";
import NewDeviceModal from "Modals/NewDeviceModal/NewDeviceModal";
import {
  getDeviceByIdAction,
  selectDeviceParameters,
  selectDevicesLoading,
  selectEditDevice,
} from "Pages/Devices/redux/duck";
import { COLORS } from "Pages/SmartPlugControl";
import { fetchSmartPlug } from "Pages/SmartPlugControl/redux/duck";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { Button, Switcher, Text, TitleText } from "rtc-ui-library";
import { fetchAPI } from "utils";
import useStyles from "./styles";

const selector = createSelector(
  selectEditDevice,
  selectDevicesLoading,
  selectDeviceParameters,
  (editDevice, loading, deviceParameters) => ({
    editDevice,
    loading,
    deviceParameters,
  })
);

const DeviceDetails = () => {
  const { editDevice, loading, deviceParameters } = useSelector(selector);
  const { deviceId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [parametersModalOpen, setParametersModalOpen] = useState(false);

  useEffect(() => {
    if (deviceId) dispatch(getDeviceByIdAction(deviceId));
  }, [deviceId, dispatch]);

  return (
    <Box className={classes.mainCont}>
      <NewDeviceModal
        isOpen={deviceModalOpen}
        handleClose={() => {
          setDeviceModalOpen(false);
        }}
        editDevice={editDevice}
      />
      <DeviceParametersModal
        isOpen={parametersModalOpen}
        handleClose={() => setParametersModalOpen(false)}
      />
      <Loader isLoading={loading} />
      <Box className={classes.title}>
        <TitleText>{editDevice?.name} control</TitleText>
      </Box>
      <Block>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Box>
              <SpanBlock>ID: {editDevice?.id}</SpanBlock>
              <SpanBlock className={classes.deviceCode}>
                Code: {editDevice?.code}
              </SpanBlock>
              <span>{editDevice?.name}</span>
            </Box>
            <Box className={classes.deviceDescription}>
              <Text>{editDevice?.description}</Text>
            </Box>
          </Box>
          <Box>
            <Button onClick={() => setDeviceModalOpen(true)}>Edit</Button>
          </Box>
        </Box>
      </Block>

      <br />

      {deviceParameters.map((parameter) => (
        <div key={parameter.id} className={classes.parameterContainer}>
          <div className={classes.parameterDataContainer}>
            <Block>
              <div>
                <SpanBlock className={classes.parameterID}>
                  {parameter.id}
                </SpanBlock>
                <SpanBlock className={classes.parameterKey}>
                  {parameter.key}
                </SpanBlock>
                {
                  <SpanBlock className={classes.parameterValue}>
                    {parameter.value || "NO_VALUE"}
                  </SpanBlock>
                }
                <SpanBlock className={classes.parameterType}>
                  {parameter.type}
                </SpanBlock>
              </div>
              <div className={classes.parameterControlsContainer}>
                <div className={classes.parameterControlsContainerHeader}>
                  <div
                    title={parameter.description || "No description provided"}
                  >
                    <SpanBlock className={classes.parameterName}>
                      {parameter.name || "NO_NAME"}
                    </SpanBlock>
                  </div>
                  <div>
                    <Text>
                      {parameter.description || "No description provided"}
                    </Text>
                  </div>
                </div>
                <div className={classes.parameterControlsContainerControls}>
                  {(() => {
                    switch (parameter.type) {
                      case "CUSTOM":
                        return (
                          <Text>Custom types bust be supported manually</Text>
                        );
                      case "BOOLEAN":
                        return (
                          <Switcher
                            onClick={() => {
                              // this.handleOnOff(!this.state.onOff);
                              const currentParamValue =
                                parameter.value === "true";

                              const newValue = !currentParamValue;

                              fetchAPI(
                                "POST",
                                `/updateDeviceParameter/${parameter.id}`,
                                { value: newValue }
                              ).then(() => {
                                dispatch(fetchSmartPlug(deviceId));
                              });
                            }}
                            type="rectangular"
                            color={
                              parameter.value === "true"
                                ? COLORS.neutral
                                : COLORS.disabled
                            }
                          />
                        );
                      default:
                        return (
                          <Text>
                            Yet unsupported data type, no handler available
                          </Text>
                        );
                    }
                  })()}
                </div>
              </div>
            </Block>
          </div>

          {/* <DeviceParameterModal
            buttonText={"EDIT"}
            parameterID={parameter.id}
            onUpdate={() => {
              const currentDeviceID = this.props.match.params.id;
              this.props.fetchSmartPlug(currentDeviceID);
            }}
          /> */}
          <div className={classes.parameterDeleteButton}>
            <Button
              onClick={() => {
                // Hardcoded
                // eslint-disable-next-line no-restricted-globals
                const result = confirm("Are you sure you want ot delete?");
                if (result) {
                  fetchAPI("DELETE", "/deleteDeviceParameter/" + parameter.id)
                    .then(async () => {
                      this.props.fetchSmartPlug(this.state.currentDeviceID);
                    })
                    .catch((e) => {
                      console.error(e);
                    });
                }
              }}
            >
              DEL
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={() => setParametersModalOpen(true)}>
        Create parameter
      </Button>
      {/* <DeviceParameterModal
        buttonText={"CREATE"}
        mode={"CREATE"}
        deviceID={this.state.currentDeviceID}
        onCreate={() => {
          this.props.fetchSmartPlug(this.state.currentDeviceID);
        }}
      /> */}
    </Box>
  );
};

export default DeviceDetails;
