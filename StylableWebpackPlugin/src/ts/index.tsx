import { Card, Button, Icon, Layout } from "antd";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MyButton from "./MyButton";
let appDom = document.getElementById("app");
class WebContainer extends React.Component {
  render() {
    return (
      <Card>
        <Button>ahhhh</Button>
        <Icon type="file" />
        <MyButton />
      </Card>
    );
  }
}
const render = () => {
  ReactDOM.render(<WebContainer />, appDom);
};
render();
