import { Card, Button, Icon, Layout } from "antd";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DividerProps } from "antd/lib/divider";
import styles from "./MyButton.st.css";
export default class MyButton extends React.Component {
  render() {
    return (
      <div {...styles("root")}>
        <Button> foo</Button>
      </div>
    );
  }
}
