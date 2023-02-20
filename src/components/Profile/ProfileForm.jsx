import React from 'react';
import { Row, Col } from "antd";
import FormInput from 'components/FormItems/FormInput';
import Image from 'components/SupportItems/Image/Image';
import AppButton from 'components/Button/Button';

const ProfileForm = () => {
 
  return (
    <Row type="flex" gutter={20}>
      <Col md={8}>
        <Image />
      </Col>
      <Col md={16}>
        <Row type="flex" gutter={[20, 20]}>
          <Col span={12}>
            <FormInput name="fname" />
          </Col>
          <Col span={12}>
            <FormInput name="lname" />
          </Col>
          <Col span={12}>
            <FormInput name="gender" />
          </Col>
          <Col span={12}>
            <FormInput name="age" />
          </Col>
          <Col span={24}>
            <FormInput name="mobile" />
          </Col>
          <Col span={24}>
            <AppButton label="Edit" />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProfileForm