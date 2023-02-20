import React from "react";
import { Form, Select, Space } from "antd";
import styles from "./form-input.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Option } = Select;

function FormSelectInput(props) {
  const {
    value,
    defaultValue,
    label,
    mode = "default",
    placeholder = "Choose",
    onChange,
    filterOption,
    options = [],
    errors,
    touched,
    disabled,
    showSearch = false,
    allowClear = false,
    size = "large",
    style,
    containerClassnames = "",
    containerProps = {},
    selectEleClassnames = "",
    dropdownRender,
    required = false,
    deletable = false,
    onDelete,
    editable = false,
    onEdit,
  } = props;

  let formSelectInputClassNames = styles.formSelectInputPrimary;
  return (
    <Form.Item
      label={label}
      validateStatus={errors && touched && "error"}
      help={touched && errors}
      className={`${styles.formSelectInputContainer} ${containerClassnames} mb-0`}
      {...containerProps}
    >
      <Select
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        showSearch={showSearch}
        mode={mode}
        style={style}
        onChange={onChange}
        className={`${formSelectInputClassNames} ${selectEleClassnames}`}
        filterOption={filterOption}
        datasource={options}
        disabled={disabled}
        size={size}
        allowClear={allowClear}
        dropdownRender={dropdownRender}
        required={required}
        optionLabelProp="label"
        autoFocus
      >
        {options.map((i) => (
          <Option
            key={i.value}
            value={i.value}
            {...i}
            label={<span className="text-capitalize">{i.label}</span>}
            className="text-capitalize"
          >
            <Space
              align="center"
              className="justify-content-between w-100"
              style={{ padding: "0 8px 4px" }}
            >
              {i.label}
              <>
                {editable && <EditOutlined onClick={()=>onEdit(i.value)} />}
                {deletable && <DeleteOutlined onClick={()=>onDelete(i.value)} />}
              </>
            </Space>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default FormSelectInput;
