import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography, Image, Divider } from "antd";
import logo from "assets/images/logo-2.png";
import AppButton from "components/Button/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ height: "100vh" }}
    >
      <Col md={12} sm={18} span={24} className="text-md-end text-start px-3 align-self-end align-self-md-center">
        <Image src={logo} style={{
          width: "150px",
        }} preview={false} />
      </Col>
      <Col md={12} sm={18} span={24} className="text-start px-3 align-self-start align-self-md-center">
        <Typography.Title level={2} className="not-found">404 Page Not Found</Typography.Title>
        <Typography.Text level={2} className="not-found">Oh no! Looks like you got lost.</Typography.Text>
        <Divider style={{
          height: "2px",
          backgroundColor: "var(--main-color)",
          width: "300px",
          minWidth: "120px",
        }} />
        <AppButton label={"Return Home"} onClick={() => navigate("/")} />
      </Col>
    </Row>
  );
};

export default PageNotFound;
