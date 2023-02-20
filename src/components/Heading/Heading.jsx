import React from "react";
import { Typography } from "antd";
import styles from "./heading.module.css";

function Heading({ className, label, secondary }) {
  return (
    <div className={`${styles.head} pb-md-4 ${className} text-center`}>
      {!secondary ? (
        <>
          <Typography.Title level={1} className={styles.heading}>{label}</Typography.Title>
          <hr className="mx-auto mt-2 mb-0" />
        </>
      ) : (
        <Typography.Title level={1} className={styles.secondaryHeading}>{label}</Typography.Title>
      )}
    </div>
  );
}

export default Heading;
