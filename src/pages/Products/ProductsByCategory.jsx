import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import Image from "components/SupportItems/Image/Image";
import ProductCard from "components/Cards/ProductCard/ProductCard";
import TwoCards from "components/CardSets/TwoCards";
import Heading from "components/Heading/Heading";
import AppBreadcrumb from "components/Breadcrumb/Breadcrumb";
import Loader from "components/Loader/Loader";
import AppMenu from "components/Menus/Menu";
import AppPagination from "components/Pagination/Pagination";
import { getRandom } from "constants/products.constants";

const ProductsByCategory = (props) => {
  const { productStore, categoryStore } = props;
  const { getAllProducts, productsList, productsLoading, setPage, setPageSize, total, pageSize, current, setCategory } = productStore;
  const { getAllCategories, categoriesList, getCategoryById, category, categoryLoading } = categoryStore;
  const { id } = useParams();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts, current, pageSize, category]);

  useEffect(() => {
    setCategory(id);
  }, [setCategory, id]);
  
  useEffect(() => {
    getAllCategories({ type: "product" });
    getCategoryById(id);
  }, [getAllCategories, getCategoryById, id]);

  const breadcrumb = [
    {
      label: "All Products",
      path: "/products",
    },
    {
      label: category?.name,
      path: `/products/category/${id}`,
    },
  ];

  return (
    <div className="container top-space">
      <Heading secondary label={category?.name} />
      <Image src={category?.image} alt={"category"} />
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <AppBreadcrumb breadcrumb={breadcrumb} />
        </Col>
        <Col span={4} className="text-end">
          <AppMenu />
        </Col>
      </Row>
      <Row type="flex" className="justify-content-md-start justify-content-center">
        {productsLoading ? (
          <Col span={24} className="text-center pb-5" >
            <Loader />
          </Col>
        ) : (
          <>
            {productsList && productsList.length > 0 ? productsList.map((card, index) => (
              <Col xxl={6} lg={8} sm={12} key={index}>
                <ProductCard src={card} />
              </Col>
            )) : (
              <Typography.Text className="w-100 text-center label pb-5">Oh no! We cannot find any products yet.</Typography.Text>
            )}
          </>
        )}
        {total > pageSize && (
          <AppPagination
            current={current}
            total={total}
            onChange={setPage}
            onSizeChange={setPageSize}
            pageSize={pageSize}
          />
        )}
      </Row>
      <TwoCards
        label="Other Categories"
        src={!categoryLoading && categoriesList.length > 2 && getRandom(categoriesList && categoriesList, 2)}
      />
    </div>
  );
};

export default inject((stores) => ({
  productStore: stores.store.productStore,
  categoryStore: stores.store.categoryStore,
}))(observer(ProductsByCategory));
