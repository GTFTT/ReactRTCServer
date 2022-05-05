import React, { Component } from "react";
import Styles from "./styles.module.css";

/**
 * This is small visual component
 * TODO: Move to UI library
 *
 * @property className - used to override styles
 */
export default class SpanBlock extends Component {
  render() {
    return (
      <span className={`${Styles.container} ${this.props.className}`}>
        {this.props.children}
      </span>
    );
  }
}
