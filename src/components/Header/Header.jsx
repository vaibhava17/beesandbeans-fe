import React from "react";
import { Carousel, Typography, Image } from "antd";
import styles from "./header.module.css";

const Header = (props) => {
  const { img, content, data, headerName } = props;
  return (
    <div className="position-relative">
      {headerName ? (
        <Typography.Title level={2} className={`${styles.textHead} position-absolute`} >
          {headerName}
        </Typography.Title>
      ):(
        <Typography.Paragraph className={`${styles.text} position-absolute`} >
          {content}
        </Typography.Paragraph>
      )}
      {img ? (
        <Image src={img} className={`${styles.image} w-100`} alt="image" preview={false} rootClassName="w-100" />
      ) : (
        <Carousel autoplay dots={false} effect="fade">
          {data && data.map((item) => (
            <Image src={item.img} className={`${styles.image} w-100`} alt={item.alt} preview={false} rootClassName="w-100" />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Header;
