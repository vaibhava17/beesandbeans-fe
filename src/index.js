import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from 'antd';
import App from "./App";
import 'antd/dist/antd.variable.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

require('dotenv').config();

// ANTD COLOR CONFIGURATION
ConfigProvider.config({
  theme: {
    primaryColor: '#97801c',
  },
});

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
