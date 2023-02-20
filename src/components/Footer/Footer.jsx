import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import logo from "assets/images/logo/logo.svg";
import styles from "./footer.module.css";

function Footer() {
  const Year = new Date().getFullYear();
  return (
    <>
      <footer className={styles.footer}>
        <Row type="flex" className="app-menu">
          <Col span={24}>
            <Row className="px-4 px-md-0 py-5">
              <Col md={6} sm={4} className="text-center">
                <Link to="/">
                  <img src={logo} alt="logo" style={{ width: 100 }} />
                </Link>
              </Col>
              <Col md={18} sm={20}>
                <Row>
                  <Col lg={6} md={8} sm={12} xs={24}>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">
                        <Link to="/about" className={styles.footerItem}>
                          About Us
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/blogs" className={styles.footerItem}>
                          Blogs
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/contact" className={styles.footerItem}>
                          Corporate Order
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/contact" className={styles.footerItem}>
                          Contact Us
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/faqs" className={styles.footerItem}>
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6} md={8} sm={12} xs={24}>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">
                        <Link to="/terms-and-condition" className={styles.footerItem}>
                          Terms And Conditions
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/privacy-policy" className={styles.footerItem}>
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/payment-and-security" className={styles.footerItem}>
                          Payment and Security
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/refund-policy" className={styles.footerItem}>
                          Refund and Cancellation Policy
                        </Link>
                      </li>
                      <li className="return-policy">
                        <Link to="/faqs" className={styles.footerItem}>
                          Shipping and Return Policy
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6} md={8} sm={12} xs={24}>
                    <ul className="list-unstyled text-start d-none">
                      {/* <li className="mb-2">
                        <Link to="/about" className={styles.footerItem}>
                          About Us
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/tnc" className={styles.footerItem}>
                          Blogs
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/contact" className={styles.footerItem}>
                          Corporate Order
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/contact" className={styles.footerItem}>
                          Contact Us
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link to="/faqs" className={styles.footerItem}>
                          FAQs
                        </Link>
                      </li> */}
                    </ul>
                  </Col>
                  <Col lg={6} md={8} sm={12} xs={24}>
                    <Row>
                      <a href="https://www.facebook.com/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-facebook-f"></i>
                        </div>
                      </a>
                      <a href="https://www.instagram.com/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-instagram"></i>
                        </div>
                      </a>
                      <a href="https://www.twitter.com/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-twitter"></i>
                        </div>
                      </a>
                    </Row>
                    <Row>
                      <a href="https://www.linkedin.com/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-linkedin-in"></i>
                        </div>
                      </a>
                      <a href="https://www.pinterest.com/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-pinterest-p"></i>
                        </div>
                      </a>
                      <a href="https://www.reddit.com/r/beesandbeanschocolates" target="_blank" rel="noreferrer">
                        <div className={`me-2 mb-2 ${styles.brandLinks}`}>
                          <i className="fab fa-reddit-alien"></i>
                        </div>
                      </a>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="bg-white">
            <Row className={styles.bottomText}>
              <Col md={12} className="text-center">
                <span>
                  Truffle Escape Chocolates Company. Making World's Finest
                  Chocolates
                </span>
              </Col>
              <Col md={12} className="text-center">
                <span>
                  © {Year} Truffle Escape Chocolates - All Rights Reserved.
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </footer>
    </>
  );
}

export default Footer;
