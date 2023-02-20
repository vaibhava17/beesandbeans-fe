import React from 'react'
import { Row, Col } from "antd";
import ProfileForm from 'components/Profile/ProfileForm'
import AppBreadcrumb from "components/Breadcrumb/Breadcrumb";

const Profile = () => {
  const breadcrumb = [
    {
      label: "Profile",
      path: "/profile",
    },
  ];
  return (
    <div className="container top-space">
      <Row type="flex">
        <Col span={24}>
          <AppBreadcrumb breadcrumb={breadcrumb} />
        </Col>
        <Col md={5}>Menu</Col>
        <Col md={19}>
          <ProfileForm />
        </Col>
      </Row>
    </div>
  )
}

export default Profile