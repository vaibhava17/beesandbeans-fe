import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Image, Typography, Row, Col } from "antd";
import CartBtn from "../../Cart/CartBtn";
import img from "../../../assets/images/img2.jpg";

const CartCard = (props) => {
  const { id, product, price, quantity, cartStore } = props;
  const { removeFromCart } = cartStore;
  return (
    <>
      <Card className={`border-color rounded-3 m-2`}>
        <Row type="flex" justify="between" gutter={[20, 20]} align="middle">
          <Col md={5} span={24} className="text-center">
            <Image
              src={img}
              width="auto"
              height={"100px"}
              className="rounded"
            />
          </Col>
          <Col md={5} span={12} className="d-block d-md-none">
            <Typography.Text ellipsis className="label">
              Product
            </Typography.Text>
          </Col>
          <Col md={5} span={12} className="text-center">
            <Typography.Text ellipsis className="label">
              {product.name}
            </Typography.Text>
          </Col>
          <Col md={5} span={12} className="d-block d-md-none">
            <Typography.Text ellipsis className="label">
              Qty
            </Typography.Text>
          </Col>
          <Col md={6} span={12} className="text-center">
            <CartBtn quantity={quantity} id={id} />
          </Col>
          <Col md={5} span={12} className="d-block d-md-none">
            <Typography.Text ellipsis className="label">
              Price
            </Typography.Text>
          </Col>
          <Col md={3} span={12} className="text-center">
            <Typography.Text className="label">Rs. {price}</Typography.Text>
          </Col>
          <Col md={5} span={12} className="d-block d-md-none">
            <Typography.Text ellipsis className="label">
              SubTotal
            </Typography.Text>
          </Col>
          <Col md={4} span={12} className="text-center">
            <Typography.Text className="label">
              Rs. {price * quantity}
            </Typography.Text>
          </Col>
          <Col md={1} span={24} className="text-center">
            <i
              className="fas fa-trash-alt text-danger"
              type="button"
              onClick={() => removeFromCart(id)}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default inject((stores) => ({
  cartStore: stores.store.cartStore,
}))(observer(CartCard));
