import React from "react";
import { Col, Row } from "antd";
import Heading from "components/Heading/Heading";
import Card from "components/Cards/CategoryCard/CategoryCard";
import Loader from "components/Loader/Loader";

function TwoCards(props) {
  const { label, src } = props;

  return (
    <>
      <Heading label={label} />
      <div className="container">
        <Row type="flex" justify="center" gutter={20}>
          {src ? src.map((card, index) => (
            <Col md={10} span={20} key={index}>
              <Card src={card} large />
            </Col>
          )) : (
            <Col span={24} className="text-center" >
              <Loader className="mb-3" />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default TwoCards;
