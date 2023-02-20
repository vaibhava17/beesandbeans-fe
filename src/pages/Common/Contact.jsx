import React from "react";
import { Row, Col } from "antd";
import Heading from "components/Heading/Heading";
import ContactForm from "components/Contact/ContactForm/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="top-space">
        <Heading secondary label="Contact Us" className="text-capitalize" />
        <Row justify="center" className="pb-4">
          <Col span={10} className="d-none d-md-block">
            <div className={`shadow rounded m-3 p-3`}>
              Mapps
            </div>
          </Col>
          <Col xs={24} sm={24} md={14}>
            <div className={`shadow rounded m-3 p-3`}>
              <ContactForm />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Contact;
