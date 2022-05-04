import React from "react";
import Styles from "./styles.module.css";
import { Button } from "rtc-ui-library";

/**
 * Added this modal, but it is not finished, and it doesn't work completely
 * @param props.onClose
 * @param props.visible
 * @param props.footer - Custom footer
 * @param props.title
 * @param props.children - children node
 * @constructor
 */
export class Modal extends React.Component {
  render() {
    return (
      <div
        className={this.props.visible ? Styles.modal : Styles.modalInvisible}
        onClick={this.props.onClose}
      >
        <div
          className={Styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={Styles.modalHeader}>
            <h4 className={Styles.modalTitle}>{this.props.title}</h4>
          </div>
          <div className={Styles.modalBody}>{this.props.children}</div>
          <div className={Styles.modalFooter}>
            {this.props.footer ? (
              this.props.footer
            ) : (
              <Button onClick={this.props.onClose}>Close</Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
