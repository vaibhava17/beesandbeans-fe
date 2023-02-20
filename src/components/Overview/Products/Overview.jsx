import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import Loader from "components/Loader/Loader";
import FlipCard from "components/Cards/FlipCard/FlipCard";
import styles from "./overview.module.css";

const ProductsOverview = (props) => {
  const { categoryStore } = props;
  const { productCategories } = categoryStore;

  return (
    <>
      <div className="p-5">
        <Row gutter={20}>
          <Col offset={3} className="col-md-offset-0" md={6}>
            <Row justify="center" gutter={[20, 20]}>
              {productCategories &&
                productCategories.length > 0 ?
                productCategories.map((category, index) => (
                  <Col sm={12} key={index}>
                    <Link to={`/categories/${category._id}`}>
                      <FlipCard
                        img={category.image}
                        label={category.name}
                        className={"mx-auto"}
                      />
                    </Link>
                  </Col>
                )) : (
                  <Col span={24} className="text-center" >
                    <Loader />
                  </Col>
                )}
            </Row>
          </Col>
          <Col offset={3} md={12} className="d-none d-md-block pe-xl-5 ps-xl-0 py-5 text-center my-auto">
            <div className={`mx-auto ${styles.deluxeText}`}>
              <Typography.Title level={1}>Products Made with Love</Typography.Title>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default inject((stores) => ({
  categoryStore: stores.store.categoryStore,
}))(observer(ProductsOverview));
