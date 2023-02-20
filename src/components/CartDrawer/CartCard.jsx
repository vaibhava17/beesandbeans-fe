import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Card, Col, Row, Popconfirm } from "antd";
import SubHeading from "../Heading/SubHeading";
import CartBtn from "./CartBtn";
import styles from "./cart.module.css";

function CartCard(props) {
  const { product, price, id, cartStore, quantity } = props;
  const { removeFromCart } = cartStore;

  return (
    <>
      <Card className="rounded border-0 shadow my-3 position-relative">
        <Row gutter={20}>
          <Col span={8}>
            <img
              src={product.image}
              alt="logo"
              id="nav-logo"
              className={styles.img}
            />
          </Col>
          <Col span={16} className="align-items-center">
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <SubHeading left label={product.name} small />
            </Link>
          </Col>
          <Col span={12} className="mt-2">
            <CartBtn quantity={quantity} id={id}  />
          </Col>
          <Col span={12} className="mt-2 text-end">
            <h6
              className="fw-bold text-wrap m-0 lh-base text"
              style={{ fontSize: "inherit" }}
            >
              Rs {price * quantity}
            </h6>
          </Col>
        </Row>
        <Popconfirm
          title="Do you want to remove this item from cart?"
          onConfirm={() => removeFromCart(id)}
          okText="Yes"
          cancelText="No"
          placement="bottomRight"
        >
          <div className={styles.closeBtn}>
            <i className="fas fa-times" />
          </div>
        </Popconfirm>
      </Card>
    </>
  );
}

export default inject((stores) => ({
  cartStore: stores.store.cartStore,
}))(observer(CartCard));
