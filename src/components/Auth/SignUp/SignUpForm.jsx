import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Row, Col, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import FormSelectInput from "../FormInput/FormSelectInput";

const validaitonSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  countryCode: Yup.string(),
  mobile: Yup.string()
    .min(10, "Mobile number must be at least 10 characters")
    .matches(/^[0-9]+$/, "Mobile number must be numeric")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpForm = (props) => {
  const { userStore } = props;
  const { userSignup, user } = userStore;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const initalValues = {
    name: "",
    email: "",
    countryCode: "91",
    mobile: "",
    password: "",
    passwordConfirm: "",
  };

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validaitonSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          userSignup(values)
            .then(() => {
              setLoading(false);
              if (location.state) {
                navigate(location.state.pathname);
              } else {
                navigate("/");
              }
            })
            .catch((err) => {
              setError(err.data.error);
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
          <FormikForm onSubmit={handleSubmit}>
            <Row className="mx-auto w-75 px-sm-5">
              <Col span={24}>
                <FormInput
                  name="name"
                  type="text"
                  placeholder="Name"
                  errors={errors.name}
                  touched={touched.name}
                  onChange={handleChange}
                  values={values.name}
                />
              </Col>
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
                <Form.Item style={{ margin: 0 }}>
                  <Input.Group compact>
                    <FormSelectInput
                      containerProps={{
                        style: {
                          display: "inline-block",
                          width: "calc(30% - 1rem)",
                        },
                      }}
                      containerClassnames="me-3"
                      name="countryCode"
                      type="text"
                      placeholder="+91"
                      errors={errors.countryCode}
                      touched={touched.countryCode}
                      onChange={handleChange}
                      values={values.countryCode}
                      options={[{ value: "91", label: "+91" }]}
                    />
                    <FormInput
                      containerProps={{
                        style: {
                          display: "inline-block",
                          width: "70%",
                        },
                      }}
                      name="mobile"
                      type="text"
                      placeholder="Mobile No."
                      errors={errors.mobile}
                      touched={touched.mobile}
                      onChange={handleChange}
                      values={values.mobile}
                    />
                  </Input.Group>
                </Form.Item>
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
              <Col span={24}>
                <FormInput
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  errors={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                  onChange={handleChange}
                  values={values.passwordConfirm}
                />
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
                    <>
                      {loading && <LoadingOutlined className="me-2" />}Sign Up
                    </>
                  }
                  className="mt-3 py-0 px-3"
                  disabled={isSubmitting || user}
                />
              </Col>
              <Col span={24} className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <div
                    className="text-decoration-none"
                    type="button"
                    onClick={() =>
                      navigate("/login", { state: location.state })
                    }
                  >
                    <p>
                      <span>Login</span>
                    </p>
                  </div>
                </small>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default inject((stores) => ({
  userStore: stores.store.userStore,
}))(observer(SignUpForm));
