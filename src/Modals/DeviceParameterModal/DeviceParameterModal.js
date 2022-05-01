import React, { Component } from "react";
import { Button, Input, MenuItem, Select } from "rtc-ui-library";
import Modal from "../../Components/Modal";
import Styles from "./styles.module.css";
import {
  createDeviceParameter,
  fetchDeviceParameter,
  selectDeviceParameter,
  setDeviceParameter,
  setDeviceParameterCreatedCallback,
  setDeviceParameterUpdatedCallback,
  updateDeviceParameter,
} from "./redux/duck";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  deviceParameter: selectDeviceParameter(state),
});

const mapDispatchToProps = {
  fetchDeviceParameter,
  setDeviceParameter,
  updateDeviceParameter,
  createDeviceParameter,
  setDeviceParameterUpdatedCallback,
  setDeviceParameterCreatedCallback,
};

/**
 * This modal corresponds for creating and editing device parameters.
 *
 * @property buttonText - text of modal button
 * @property mode - one of "EDIT", "CREATE"
 * @param [props.onUpdate] - () => void, triggered when parameter updated(it does not mean that modal already fetched new data)
 * @param [props.onCreate] - () => void, triggered when parameter created(it does not mean that modal already fetched new data)
 * @property parameterID - if we are in edit mode this is used to fetch data
 * @property deviceID - Required if we are in CREATE mode
 */
class DeviceParameterModal extends Component {
  constructor(props) {
    super(props);

    console.log("props: ", this.props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    if (this.props.onUpdate) {
      this.props.setDeviceParameterUpdatedCallback(this.props.onUpdate);
    }
    if (this.props.onCreate) {
      this.props.setDeviceParameterCreatedCallback(this.props.onCreate);
    }
    if (this.props.parameterID) {
      // we are in edit mode
      this.props.fetchDeviceParameter(this.props.parameterID);
    } else {
      // we are in create mode
    }
  }

  /**
   * Call to close current modal
   */
  onClose() {
    this.setState({ visible: false });
  }

  render() {
    console.log("this.props.deviceParameter: ", this.props.deviceParameter);
    return (
      <span>
        <Button onClick={() => this.setState({ visible: true })}>
          {this.props.buttonText}
        </Button>
        <Modal
          title={
            this.props.mode === "EDIT"
              ? "Edit parameter of device"
              : "Create parameter for device"
          }
          visible={this.state.visible}
          onClose={() => {
            this.onClose();
          }}
          footer={
            <div>
              <Button
                onClick={() => {
                  if (this.props.mode === "EDIT") {
                    this.props.updateDeviceParameter();
                  } else {
                    this.props.createDeviceParameter(this.props.deviceID);
                  }

                  this.onClose();
                }}
              >
                {this.props.mode === "EDIT" ? "UPDATE" : "CREATE"}
              </Button>
            </div>
          }
        >
          <div className={Styles.contentContainer}>
            <div className={Styles.item}>
              <Input
                value={this.props.deviceParameter.key}
                label="Key"
                onChange={(e) =>
                  this.props.setDeviceParameter({ key: e.target.value })
                }
              />
            </div>
            <div className={Styles.item}>
              <Input
                value={this.props.deviceParameter.value}
                label="Value"
                onChange={(e) =>
                  this.props.setDeviceParameter({ value: e.target.value })
                }
              />
            </div>
            <div className={Styles.item}>
              <Select
                value={this.props.deviceParameter.type || "CUSTOM"}
                label="Key"
                onChange={(e) =>
                  this.props.setDeviceParameter({ type: e.target.value })
                }
                style={{
                  width: "50%",
                }}
              >
                <MenuItem value={"CUSTOM"}>CUSTOM</MenuItem>
                <MenuItem value={"STRING"}>STRING</MenuItem>
                <MenuItem value={"BOOLEAN"}>BOOLEAN</MenuItem>
                <MenuItem value={"NUMBER"}>NUMBER</MenuItem>
                <MenuItem value={"FLOAT"}>FLOAT</MenuItem>
              </Select>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceParameterModal);
