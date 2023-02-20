import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Row, Col, Typography } from "antd";
import Cart from "components/CartDrawer/CartDrawer";
import styles from "./navbar.module.css";
import logo from "assets/images/logo/logo.svg";
import companyName from "assets/images/logo/name.svg"

function Navbar(props) {
  const { userStore, categoryStore, productStore, popupStore, bg = false, color = false } = props;
  const { getProductCategories, productCategories } = categoryStore;
  const {
    getProductLists,
    productsByRecent,
    productsByLikes,
    productsByBestSeller,
  } = productStore;
  const { user } = userStore;
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getProductCategories();
    getProductLists();
  }, [getProductLists, getProductCategories]);

  return (
    <>
      <nav
        className={`app-menu navbar navbar-expand-lg flex-column fixed-top ${bg ? styles.bgColor : ""
          } w-100 ${offset > 200
            ? styles.navbarBg + " p-0 " + styles.scroll
            : styles.navbarBg
          } ${active || toggle ? styles.scroll : ""}`}
        onMouseLeave={() => {
          setActive(false);
        }}
        style={{ zIndex: 1000 }}
      >
        <div className="container-fluid px-md-4">
          <Link
            to="/"
            className="navbar-brand"
            onMouseEnter={() => {
              setActive(false);
            }}
          >
            <img
              src={companyName}
              alt="logo"
              className={`${styles.logo} ${offset > 200 ? styles.scroll : ""}`}
              id="nav-logo"
            />
          </Link>
          <button
            className={`navbar-toggler ${toggle ? "collapsed" : ""}`}
            type="button"
            style={{ boxShadow: "none" }}
            aria-expanded={toggle}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <i className="fas fa-bars text-white" />
          </button>
          <div className={`${toggle ? "show" : ""} collapse navbar-collapse`}>
            <ul
              className={`navbar-nav ms-auto mb-2 mb-lg-0 ${color && !active ? styles.itemColor : ""
                }`}
            >
              <li className="nav-item position-relative me-2">
                <Link
                  className={`nav-link ${styles.navItemColor}`}
                  onMouseEnter={() => {
                    setActive(false);
                  }}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item position-relative me-2">
                <div
                  className={`nav-link ${styles.navItemColor}`}
                  onMouseEnter={() => setActive(true)}
                  onClick={() => {
                    if (toggle) {
                      navigate("/products");
                    }
                  }}
                >
                  Products
                </div>
              </li>
              <li className="nav-item position-relative me-2">
                <Link
                  className={`nav-link ${styles.navItemColor}`}
                  onMouseEnter={() => {
                    setActive(false);
                  }}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item position-relative me-2">
                <Link
                  className={`nav-link ${styles.navItemColor}`}
                  to="/contact"
                  onMouseEnter={() => {
                    setActive(false);
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item position-relative me-2">
                <Link
                  className={`nav-link ${styles.navItemOnlyColor}`}
                  onMouseEnter={() => {
                    setActive(false);
                  }}
                  to={user ? "/profile" : "/login"}
                >
                  {toggle ? (
                    <>{user ? "Profile" : "Login"}</>
                  ) : (
                    <i className={`fas fa-user fs-5`} />
                  )}
                </Link>
              </li>
              <li className="nav-item position-relative me-2">
                <div
                  className={`nav-link ${styles.navItemOnlyColor}`}
                  onMouseEnter={() => {
                    setActive(false);
                  }}
                  onClick={() => {
                    popupStore.togglePopup("showCartDrawer", true);
                  }}
                >
                  {toggle ? (
                    <>Cart</>
                  ) : (
                    <i className={`fas fa-shopping-cart fs-5`} />
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Row
          type="flex"
          className={`${styles.menu} ${active ? styles.active : ""
            } container-fluid`}
          gutter={[50, 10]}
        >
          <Col lg={8} md={6} className="text-center d-none d-md-block">
            <img src={logo} alt="logo" width={"25%"} id="nav-logo" />
          </Col>
          <Col lg={16} md={18}>
            <Row gutter={50}>
              <Col md={6} span={12}>
                <ul className="list-unstyled">
                  <li className="fw-bold pb-3">
                    <Typography.Text className={`${styles.navItemHeading}`}>Category</Typography.Text>
                  </li>
                  {productCategories &&
                    productCategories.length > 0 &&
                    productCategories.map((category, i) => (
                      <li
                        className="position-relative pb-2 text-capitalize"
                        key={i}
                      >
                        <Typography.Text ellipsis className={`${styles.navItemColor}`}>
                          {category.name}
                        </Typography.Text>
                      </li>
                    ))}
                </ul>
              </Col>
              <Col md={6} span={12}>
                <ul className="list-unstyled">
                  <li className="fw-bold pb-3">
                    <div className={`${styles.navItemHeading}`}>
                      Newly Added
                    </div>
                  </li>
                  {productsByRecent &&
                    productsByRecent.length > 0 &&
                    productsByRecent.map((product, i) => (
                      <li
                        className="position-relative pb-2 text-capitalize"
                        key={i}
                      >
                        <Typography.Text ellipsis className={`${styles.navItemColor}`}>
                          {product.name}
                        </Typography.Text>
                      </li>
                    ))}
                </ul>
              </Col>
              <Col md={6} span={12}>
                <ul className="list-unstyled">
                  <li className="fw-bold pb-3">
                    <div className={`${styles.navItemHeading}`}>
                      Most Popular
                    </div>
                  </li>
                  {productsByLikes &&
                    productsByLikes.length > 0 &&
                    productsByLikes.map((product, i) => (
                      <li
                        className="position-relative pb-2 text-capitalize"
                        key={i}
                      >
                        <Typography.Text ellipsis className={`${styles.navItemColor}`}>
                          {product.name}
                        </Typography.Text>
                      </li>
                    ))}
                </ul>
              </Col>
              <Col md={6} span={12}>
                <ul className="list-unstyled">
                  <li className="fw-bold pb-3">
                    <div className={`${styles.navItemHeading}`}>
                      Best Sellers
                    </div>
                  </li>
                  {productsByBestSeller &&
                    productsByBestSeller.length > 0 &&
                    productsByBestSeller.map((category, i) => (
                      <li
                        className="position-relative pb-2 text-capitalize"
                        key={i}
                      >
                        <Typography.Text ellipsis className={`${styles.navItemColor}`}>
                          {category.name}
                        </Typography.Text>
                      </li>
                    ))}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </nav>
      <Cart />
    </>
  );
}

export default inject((stores) => ({
  userStore: stores.store.userStore,
  categoryStore: stores.store.categoryStore,
  productStore: stores.store.productStore,
  popupStore: stores.store.popupStore,
}))(observer(Navbar));
