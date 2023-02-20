import React from "react";
import { Typography } from "antd";
import styles from "./flip-card.module.css";

function FlipCard({ img, label, className }) {
  return (
    <div className={`${styles.flipCard} text-center ${className}`}>
      <div className={styles.flipCardInner}>
        <div className={`${styles.flipCardFront}`}>
          <img src={img} alt={label} />
        </div>
        <div className={`${styles.flipCardBack} shadow text-capitalize`}>
          <Typography.Title level={1} ellipsis>{label}</Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
