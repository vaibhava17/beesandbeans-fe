import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Formik, Form as FormikForm } from "formik";
import FormInput from "components/FormItems/FormInput";
import AppButton from "components/Button/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid mobile number")
    .required("Mobile is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = (props) => {
  const { mailStore } = props;
  const { addMail } = mailStore;
  const [success, setSuccess] = useState();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    message: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          addMail(values)
            .then(() => {
              resetForm(initialValues);
              setSubmitting(false);
              setSuccess(true);
            })
            .finally(() => {
              setTimeout(() => {
                setSuccess(false);
              }, 5000);
            });
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
            <FormInput
              placeholder="Full Name"
              values={values.name}
              errors={errors.name}
              touched={touched.name}
              onChange={handleChange}
              name="name"
            />
            <FormInput
              placeholder="Email Address"
              values={values.email}
              errors={errors.email}
              touched={touched.email}
              onChange={handleChange}
              name="email"
              type="email"
            />
            <FormInput
              placeholder="Mobile No."
              values={values.mobile}
              errors={errors.mobile}
              touched={touched.mobile}
              onChange={handleChange}
              name="mobile"
            />
            <FormInput
              textarea
              placeholder="Type a message"
              values={values.message}
              errors={errors.message}
              touched={touched.message}
              onChange={handleChange}
              name="message"
            />
            <AppButton
              label={
                isSubmitting ? (
                  <>
                    <LoadingOutlined /> Sending...
                  </>
                ) : (
                  "Send Message"
                )
              }
              type="submit"
              disabled={isSubmitting}
            />
            {success && "Your message has been sent successfully."}
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default inject((stores) => ({
  mailStore: stores.store.mailStore,
}))(observer(ContactForm));
