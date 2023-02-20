import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormInput from "components/FormItems/FormInput";
import Button from "components/Button/Button";

const validaitonSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = (props) => {
  const { userStore } = props;
  const { userLogin } = userStore;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const initalValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validaitonSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          userLogin(values)
            .then(() => {
              setLoading(false);
              navigate("/");
            })
            .catch((err) => {
              setError(err.data.message);
              setLoading(false);
            });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mx-auto w-75  px-sm-5">
              <Col span={24}>
                <FormInput
                  name="email"
                  type="text"
                  placeholder="Email"
                  errors={errors.email}
                  touched={touched.email}
                  onChange={handleChange}
                  values={values.email}
                />
              </Col>
              <Col span={24}>
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  errors={errors.password}
                  touched={touched.password}
                  onChange={handleChange}
                  values={values.password}
                />
              </Col>
              <Col span={24} className="text-end mb-3">
                <Link to="/password-recovery" className="text-decoration-none">
                  <small>Forgot Password?</small>
                </Link>
              </Col>
              {error && (
                <Col span={24} className="text-center mb-3">
                  <small className="text-danger">{error}</small>
                </Col>
              )}
              <Col span={24} className="text-center">
                <Button
                  type="submit"
                  label={
                    <>{loading && <LoadingOutlined className="me-2" />}Login</>
                  }
                  disabled={isSubmitting}
                />
              </Col>
              <Col span={24} className="text-center mt-3">
                <small>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    <p>
                      <span>SignIn</span>
                    </p>
                  </Link>
                </small>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default inject((stores) => ({
  userStore: stores.store.userStore,
}))(observer(LoginForm));
