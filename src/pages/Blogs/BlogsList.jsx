import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Col, Row, Typography } from "antd";
import Heading from "components/Heading/Heading";
import BlogCard from "components/Cards/BlogCard/BlogCard";
// import AppButton from "components/Button/Button";
import Image from "components/SupportItems/Image/Image";
import Loader from "components/Loader/Loader";
import cover from "assets/images/chocolates.jpg";

const Blogs = (props) => {
  const { blogStore } = props;
  const { getAllBlogs, blogsList, loading } = blogStore;

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);
  return (
    <div className="container top-space">
      <Heading secondary label="Blogs" />
      <Image src={cover} alt={"blog"} />
      <Row
        type="flex"
        className="justify-content-md-start justify-content-center"
      >
        {loading ? (
          <Col span={24} className="text-center pb-5" >
            <Loader />
          </Col>
        ) : (
          <>
            {blogsList && blogsList.length > 0 ? blogsList.map((card, index) => (
              <Col sm={12} key={index}>
                <BlogCard src={card} />
              </Col>
            )) : (
              <Typography.Text className="w-100 text-center label pb-5">Oh no! We cannot find any blogs yet.</Typography.Text>
            )}
          </>
        )}
      </Row>
    </div>
  );
};

export default inject((stores) => ({
  blogStore: stores.store.blogStore,
}))(observer(Blogs));
