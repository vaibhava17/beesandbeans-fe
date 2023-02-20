import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Col, Row, Typography } from "antd";
import AppCollapse from "components/Collapse/Collapse";
import Heading from "components/Heading/Heading";
import BottomMargin from "components/BottomMargin/BottomMargin";
import Loader from "components/Loader/Loader";

const FAQs = (props) => {
  const { faqStore } = props;
  const { getFaqs, faqsList, faqLoading } = faqStore;

  useEffect(() => {
    getFaqs();
  }, [getFaqs]);

  return (
    <div className="container top-space">
      <Heading secondary label="FAQs" />
      <Row gutter={20} type="flex">
        {faqLoading ? (
          <Col span={24} className="text-center pb-5" >
            <Loader />
          </Col>
        ) : (
          <Col span={24}>
            {faqsList && faqsList.length > 0 ? (
              <AppCollapse data={faqsList} />
            ) : (
              <Typography.Text className="w-100 text-center label pb-5">Oh no! We cannot find any FAQs yet.</Typography.Text>
            )}
          </Col>
        )}
      </Row>
      <BottomMargin />
    </div>
  );
};

export default inject((stores) => ({
  faqStore: stores.store.faqStore
}))(observer(FAQs));
