import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams, useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Col, Row, Tag, Typography } from "antd";
import Header from "components/Header/Header";
import Loader from "components/Loader/Loader";
import { IMAGE_URL, BASE_URL } from "constants/initial";

const Blog = (props) => {
  const { blogStore } = props;
  const { blog, getBlogById, loading } = blogStore;
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    getBlogById(id);
  }, [getBlogById, id]);
  return (
    <>
      {!loading ? (
        <>
          <Header headerName={blog?.name} img={`${IMAGE_URL}${blog?.image}`} />
          <div className="container py-5">
            <Typography.Paragraph className="label">
              {blog?.content}
              <br />- {blog?.author}
            </Typography.Paragraph>
            <hr />
            <Row>
              <Col sm={6} span={24}>
                <div className="label">Category</div>
              </Col>
              <Col sm={18} span={24}>
                <div className="text">{blog?.category && blog?.category.name}</div>
              </Col>
            </Row>
            <Row>
              <Col sm={6} span={24}>
                <div className="label">Tags</div>
              </Col>
              <Col sm={4} span={24}>
                {blog?.tags &&
                  blog?.tags.map((tag, i) => (
                    <Tag color="var(--main-color)" className="text-capitalize" key={i}>
                      {tag.name}
                    </Tag>
                  ))}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col span={24}>
                <div className="action-label">Share</div>
              </Col>
              <Col sm={16} span={24} className="d-flex flex-row">
                <FacebookShareButton url={`${BASE_URL}${location.pathname}`}>
                  <div className="circle-icon d-flex align-items-center justify-content-center me-2">
                    <i className="fab fa-facebook-f" />
                  </div>
                </FacebookShareButton>
                <LinkedinShareButton url={`${BASE_URL}${location.pathname}`}>
                  <div className="circle-icon d-flex align-items-center justify-content-center me-2">
                    <i className="fab fa-linkedin" />
                  </div>
                </LinkedinShareButton>
                <TwitterShareButton url={`${BASE_URL}${location.pathname}`}>
                  <div className="circle-icon d-flex align-items-center justify-content-center me-2">
                    <i className="fab fa-twitter" />
                  </div>
                </TwitterShareButton>
              </Col>
              <Col
                sm={8}
                span={24}
                className="d-flex flex-row align-items-center justify-content-end"
              >
                <div className="action-label me-2">Leave a like</div>
                <div className="circle-icon active d-flex align-items-center justify-content-center">
                  <i className="fas fa-heart" />
                </div>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className="ultimate-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default inject((stores) => ({
  blogStore: stores.store.blogStore,
}))(observer(Blog));
