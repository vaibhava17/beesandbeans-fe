import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const AppBreadcrumb = (props) => {
  const { breadcrumb } = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {breadcrumb.map((item, index) => (
        <Breadcrumb.Item key={item.path}>
          <Link to={item.path} className="text-capitalize">
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
