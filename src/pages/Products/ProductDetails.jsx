import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { Col, Row, Divider, Carousel, Image } from "antd";
import Heading from "components/Heading/Heading";
import SubHeading from "components/Heading/SubHeading";
import AppBreadcrumb from "components/Breadcrumb/Breadcrumb";
import Loader from "components/Loader/Loader";
import AppButton from "components/Button/Button";
import AppCollapse from "components/Collapse/Collapse";

const ProductDetails = (props) => {
  const { productStore } = props;
  const { getProductById, product, productsLoading } = productStore;
  const { id } = useParams();

  useEffect(() => {
    getProductById(id);
  }, []);

  const breadcrumb = [
    {
      label: "All Products",
      path: "/products",
    },
    {
      label: product?.name,
      path: "/products/${id}",
    },
  ];

  let details = product?.subDescription.map((item)=>{
    let newItem = JSON.parse(item);
    return{
      question: newItem.key,
      answer: newItem.value
    }
  });

  return (
    <div className="container top-space bottom-space">
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <Heading secondary label={product?.name} />
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="mb-3">
        <Col span={24}>
          <AppBreadcrumb breadcrumb={breadcrumb} />
        </Col>
      </Row>
      <Row type="flex" className="justify-content-md-start justify-content-center" gutter={[16, 16]}>
        {productsLoading ? (
          <Col span={24} className="text-center pb-5" >
            <Loader />
          </Col>
        ) : (
          <>
            <Col span={24} md={8} lg={10}>
              <Row type="flex" gutter={[16, 16]} justify="center">
                <Col span={24}>
                  {product && product?.images.length > 1 ? (
                    <Carousel autoplay>
                      {product.images.map((image, i) => (
                        <Image
                          src={image}
                          key={i}
                          alt="product"
                          className={"img-fluid"}
                        />
                      ))}
                    </Carousel>
                  ) : (
                    <Image
                      src={product?.image}
                      alt="product"
                      className={"img-fluid"}
                    />
                  )}
                </Col>
                <Col span={12} className="text-end">
                  <AppButton
                    label="Add to Cart"
                    withoutBg
                  />
                </Col>
                <Col span={12} className="text-start">
                  <AppButton label="Buy Now" />
                </Col>
              </Row>
            </Col>
            <Col span={24} md={16} lg={14}>
              <Row justify="end" gutter={[16, 16]}>
                <Col span={22} lg={6}>
                  <SubHeading label={"Category"} left />
                </Col>
                <Col span={22} lg={16}>
                  <div className="text">
                    {product?.category && product.category.name}
                  </div>
                </Col>
                <Col span={22}>
                  <Divider />
                </Col>
                <Col span={22} lg={6}>
                  <SubHeading label={"Description"} left />
                </Col>
                <Col span={22} lg={16}>
                  <div className="text">{product?.description}</div>
                </Col>
                <Col span={22}>
                  <Divider />
                </Col>
                <Col span={22} lg={6}>
                  <SubHeading label={"Price"} left />
                </Col>
                <Col span={22} lg={16}>
                  <div className="text">Rs {product?.price}</div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <SubHeading label={"Product Details"} large />
            </Col>
            <Col span={24}>
              <AppCollapse data={details} />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default inject((stores) => ({
  productStore: stores.store.productStore,
  cartStore: stores.store.cartStore,
  popupStore: stores.store.popupStore,
  userStore: stores.store.userStore,
}))(observer(ProductDetails));
