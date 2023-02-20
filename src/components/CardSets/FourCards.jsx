import React, { useMemo } from "react";
import { inject, observer } from "mobx-react";
import { Col, Row } from "antd";
import Heading from "components/Heading/Heading";
import ProductCard from "components/Cards/ProductCard/ProductCard";
import Loader from "components/Loader/Loader";

function FourCards(props) {
  const { label, productStore, sortField } = props;
  const {
    productsByRecent,
    productsByLikes,
  } = productStore;

  const products = useMemo(() => {
    if (sortField === "likes") {
      return productsByLikes;
    }
    return productsByRecent;
  }, [productsByRecent, productsByLikes, sortField]);

  return (
    <>
      <Heading label={label} />
      <div className="container">
        <Row
          gutter={16}
          type="flex"
          className="justify-content-md-start justify-content-center"
        >
          {products &&
            products.length > 0 ?
            products.map((card, index) => (
              <Col xxl={6} lg={8} sm={12} key={index}>
                <ProductCard src={card} />
              </Col>
            )) : (
              <Col span={24} className="text-center" >
                <Loader />
              </Col>
            )}
        </Row>
      </div>
    </>
  );
}

export default inject((stores) => ({
  productStore: stores.store.productStore,
}))(observer(FourCards));
