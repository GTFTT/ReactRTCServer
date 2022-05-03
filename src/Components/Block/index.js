import React, { Component } from "react";
import Styles from "./styles.module.css";

/**
 * This is visual component
 * TODO: Move to UI library
 */
export default class Block extends Component {
  render() {
    return <div className={Styles.container}>{this.props.children}</div>;
  }
}
