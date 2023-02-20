import React from "react";
import Heading from "components/Heading/Heading";
import AppButton from "components/Button/Button";
import { Col, Row } from "antd";

const btnData = [
  {
    label: "WhatsApp",
    href: "https://wa.me/message/PVK6QHZT7VHZK1",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/truffleescapechocolates/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/truffleescapechocolates/",
  },
];

const ContactButtons = () => {
  return (
    <>
      <Heading label="Contacts" />
      <Row type="flex" justify="center" className="mb-3" gutter={[20,20]}>
        {btnData.map((btn, i) => (
          <Col span={20} className="text-center" key={i}>
            <a
              href={btn.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <AppButton fixWidth label={btn.label} />
            </a>
            <div className="w-100" />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ContactButtons;
