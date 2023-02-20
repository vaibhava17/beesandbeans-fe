import React from 'react'
import styles from "../support-items.module.css";

const Image = (props) => {
  const { src, alt, height, width } = props;
  return (
    <>
      <img src={src} height={height} width={width} alt={alt} className={`mb-3 ${styles.image}`}/>
    </>
  )
}

export default Image