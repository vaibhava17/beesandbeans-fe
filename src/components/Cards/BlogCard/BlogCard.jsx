import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "constants/initial"
import styles from "./blog-card.module.css";

function BlogCard(props) {
  const { src } = props;
  return (
    <div
      className={`my-3 mx-auto ${styles.card}`}
    >
      <Link to={`/blogs/${src?._id}`}>
        <div className={styles.cardImg}>
          <img
            src={`${IMAGE_URL}${src?.image}`}
            alt={src?.name}
            className={`mx-auto ${styles.image}`}
          />
        </div>
      </Link>
      <div className="pe-none">
        <div className={`${styles.cardTitle} text-center`}>{src?.name}</div>
      </div>
    </div>
  );
}

export default BlogCard;
