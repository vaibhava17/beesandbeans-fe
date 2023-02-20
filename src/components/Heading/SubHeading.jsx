import React from "react";
import { Typography } from "antd";
import styles from "./heading.module.css";

function SubHeading({ className, label, left = false, right = false, small = false, large = false }) {
  return (
    <div
      className={`${styles.head} text-uppercase ${className} ${
        left ? "text-left" : right ? "text-right" : "text-center"
      }`}
    >
      <Typography.Title level={4} className={`${small ? "fs-6" : ""} ${styles.subHeading} ${large ? "fs-4" : ""}`}>{label}</Typography.Title>
    </div>
  );
}

export default SubHeading;
