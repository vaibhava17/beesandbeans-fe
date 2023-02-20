import React from "react";
import { Row, Col, Divider } from "antd";
import logo from "assets/images/logo-2.png";

const BottomMargin = () => {
  const dividerStyle = {
    height: "2px",
    background: "var(--main-color)",
  }
  return (
    <Row type="flex" justify="center" align="middle" className="py-3">
      <Col span={4}>
        <Divider style={dividerStyle} />
      </Col>
      <Col span={4} className="text-center">
        <img src={logo} alt="logo" width={80} />
      </Col>
      <Col span={4}>
        <Divider style={dividerStyle} />
      </Col>
    </Row>
  );
};

export default BottomMargin;
