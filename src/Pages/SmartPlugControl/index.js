import React, { Component } from "react";
import Styles from "./styles.module.css";
import { TitleText, Text, Switcher, Button } from "rtc-ui-library";
import { withRouter } from "react-router";
import {
  selectSmartPlug,
  fetchSmartPlug,
  selectParameters,
  selectParametersStats,
} from "./redux/duck";
import { connect } from "react-redux";

import { fetchAPI } from "utils";
import Block from "../../Components/Block";
import SpanBlock from "../../Components/SpanBlock";
import Modal from "../../Components/Modal";
import DeviceParameterModal from "../../Modals/DeviceParameterModal/DeviceParameterModal";

export const COLORS = {
  success: "#28C438",
  error: "#F12F2F",
  disabled: "#6B6B6B",
  neutral: "#28C4C4",
};

const mapStateToProps = (state) => ({
  smartPlug: selectSmartPlug(state),
  parameters: selectParameters(state),
  parametersStats: selectParametersStats(state),
});

const mapDispatchToProps = {
  fetchSmartPlug,
};

class SmartPlugControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onOff: false, //On Off value of the lamp
      visible: false,
      currentDeviceID: this.props.match.params.id,
    };
  }

  componentDidMount() {
    const currentDeviceID = this.props.match.params.id;
    this.props.fetchSmartPlug(currentDeviceID);
  }

  handleOnOff = (newValue) => {
    this.setState({ onOff: newValue }, () => {
      fetchAPI("PUT", "/updater", null, {
        deviceCode: "z8bf0qhB",
        cmd: "TRANSFER",
        transferToDevice: "HbJ7VX6m",
        deviceState: {
          variables: {
            status: this.state.onOff,
          },
        },
      });
    });
  };

  renderLabeledComponent = (label, content) => {
    return (
      <div className={Styles.labeledComponent}>
        <div className={Styles.label}>
          <Text>{label}</Text>
        </div>
        <div className={Styles.content}>{content}</div>
      </div>
    );
  };

  renderParameter = (parameter) => {
    return (
      <div key={parameter.id} className={Styles.parameterContainer}>
        <div className={Styles.parameterDataContainer}>
          <Block>
            <div>
              <SpanBlock className={Styles.parameterID}>
                {parameter.id}
              </SpanBlock>
              <SpanBlock className={Styles.parameterKey}>
                {parameter.key}
              </SpanBlock>
              {
                <SpanBlock className={Styles.parameterValue}>
                  {parameter.value || "NO_VALUE"}
                </SpanBlock>
              }
              <SpanBlock className={Styles.parameterType}>
                {parameter.type}
              </SpanBlock>
            </div>
            <div className={Styles.parameterControlsContainer}>
              <div className={Styles.parameterControlsContainerHeader}>
                <div title={parameter.description || "No description provided"}>
                  <SpanBlock className={Styles.parameterName}>
                    {parameter.name || "NO_NAME"}
                  </SpanBlock>
                </div>
                <div>
                  <Text>
                    {parameter.description || "No description provided"}
                  </Text>
                </div>
              </div>
              <div className={Styles.parameterControlsContainerControls}>
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
                              this.props.fetchSmartPlug(
                                this.state.currentDeviceID
                              );
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

        <DeviceParameterModal
          buttonText={"EDIT"}
          parameterID={parameter.id}
          onUpdate={() => {
            const currentDeviceID = this.props.match.params.id;
            this.props.fetchSmartPlug(currentDeviceID);
          }}
        />
        <div className={Styles.parameterDeleteButton}>
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
    );
  };

  render() {
    const plug = this.props.smartPlug;
    return (
      <div className={Styles.mainCont}>
        <div className={Styles.title}>
          <TitleText>smart plug control</TitleText>
        </div>
        <Block>
          <div>
            <SpanBlock>ID: {plug.id}</SpanBlock>
            <SpanBlock className={Styles.deviceCode}>
              Code: {plug.code}
            </SpanBlock>
            <span>{plug.name}</span>
          </div>
          <div className={Styles.deviceDescription}>
            <Text>{plug.description}</Text>
          </div>
        </Block>

        <br />

        {this.props.parameters.map((parameter) => {
          return this.renderParameter(parameter);
        })}
        <DeviceParameterModal
          buttonText={"CREATE"}
          mode={"CREATE"}
          deviceID={this.state.currentDeviceID}
          onCreate={() => {
            this.props.fetchSmartPlug(this.state.currentDeviceID);
          }}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SmartPlugControl));
