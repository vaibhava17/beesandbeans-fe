import React from "react";
import { Row, Col } from "antd";
import SignUpForm from "../../components/SignUp/SignUpForm";
import logo from "../../assets/images/logo-2.png";
import styles from "./auth.module.css";

const SignUp = () => {
  return (
    <Row className={`${styles.cover}`}>
      <Col
        md={24}
        lg={8}
        xl={10}
        className={`d-flex justify-content-center align-items-center position-relative ${styles.imgBg}`}
      >
        <div className={`${styles.overlay} position-absolute`} />
        <img src={logo} alt="logo" className={styles.logo} />
      </Col>
      <Col
        md={24}
        lg={16}
        xl={14}
        className={`w-100 d-flex justify-content-center flex-column align-items-center ${styles.formBg}`}
      >
        <SignUpForm />
      </Col>
    </Row>
  );
};

export default SignUp;
