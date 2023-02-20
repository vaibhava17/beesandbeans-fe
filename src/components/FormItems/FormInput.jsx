import React from "react";
import { Form, Input } from "antd";
import styles from "./form-input.module.css";

function FormInput(props) {
  const {
    label,
    value,
    onChange,
    name,
    placeholder = "Enter",
    type = "text",
    size = "large",
    prefix,
    suffix,
    errors,
    rows,
    touched,
    disabled,
    containerClassname = "",
    inputClassname = "",
    containerProps = {},
    inputProps = {},
    required = false,
    textarea = false,
  } = props;
  let finalClassNames = styles.formInputPrimary;

  return (
    <Form.Item
      label={label}
      validateStatus={errors && touched ? "error" : ""}
      help={touched && errors ? errors : ""}
      className={`${finalClassNames} ${containerClassname}`}
      {...containerProps}
    >
      {!textarea ? (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          prefix={prefix}
          suffix={suffix}
          size={size}
          className={`${inputClassname}`}
          disabled={disabled}
          {...inputProps}
          required={required}
        />
      ) : (
        <Input.TextArea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          prefix={prefix}
          suffix={suffix}
          rows={rows}
          size={size}
          className={`${inputClassname}`}
          disabled={disabled}
          {...inputProps}
          required={required}
        />
      )}
    </Form.Item>
  );
}

export default FormInput;
