import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "constants/initial"
import styles from "./product-card.module.css";

function Card(props) {
  const { src } = props;
  const [active, setActive] = useState(false);
  return (
    <div
      className={`my-3 mx-auto ${styles.card}`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <Link to={`/products/${src?._id}`}>
        <div className={styles.cardImg}>
          {/* <div
            className={`${styles.likeIcon} position-absolute ${
              user?.likedProducts.includes(src._id) ? styles.active : ""
            }`}
            onClick={() => {
              console.log("clicked");
            }}
          >
            <i className="fas fa-heart" />
          </div> */}
          <div className={!src?.inStock ? styles.alert : "d-none"}>
            Currently Unavailable
          </div>
          <img
            src={IMAGE_URL + src?.image}
            alt={src?.alt}
            className={`mx-auto ${!src?.inStock ? styles.outOfStock : styles.image
              }`}
          />
        </div>
      </Link>
      <div className="pe-none">
        <div className={`${styles.cardTitle} text-center`}>{src?.name}</div>
        <div
          className={`${styles.cardPrice} ${active ? styles.active : ""
            } text-center`}
        >
          {src?.price ? `Rs. ${src?.price}` : "Price not available"}
        </div>
      </div>
    </div>
  );
}

export default inject((stores) => ({
  userStore: stores.store.userStore,
}))(observer(Card));
