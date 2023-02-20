import React, { useState } from "react";
import styles from "./category-card.module.css";
import { Link } from "react-router-dom";

function Card(props) {
  const { src, large = false } = props;
  const [active, setActive] = useState(false);
  return (
    <div
      className={`my-3 ${styles.card}`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <Link to={`/products/category/${src?._id}`}>
        <div className={styles.cardImg}>
          <div className={active ? styles.coverText : "d-none"}>
            {src?.name} <i className="fas fa-arrow-right ms-3" />
          </div>
          <img
            src={src?.image}
            alt={src?.name}
            className={`mx-auto ${active ? styles.cover : styles.image} ${
              large ? styles.large : ""
            }`}
          />
        </div>
      </Link>
      <div className="pe-none">
        <div className={`${styles.cardTitle}`}>{src?.name}</div>
      </div>
    </div>
  );
}

export default Card;
