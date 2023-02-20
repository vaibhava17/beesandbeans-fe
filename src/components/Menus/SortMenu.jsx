import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Typography, Radio, Space } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import AppButton from 'components/Button/Button';
import { sortMenu } from 'constants/common.constants';

const SortMenu = (props) => {
  const { productStore, handleVisible } = props;
  const { setSortOrder, getAllProducts } = productStore;
  const [value, setValue] = useState(1);

  useEffect(() => {
    setSortOrder({ field: sortMenu[value].field, order: sortMenu[value].order })
  }, [value])

  return (
    <Card
      bordered={false}
      style={{ width: 300 }}
      actions={[
        <AppButton textSmall label=" Apply" prefixIcon={<SettingOutlined />} onClick={() => {
          getAllProducts(false);
          handleVisible();
        }} />,
        <AppButton textSmall label=" Reset" prefixIcon={<DeleteOutlined />} onClick={() => {
          setValue(1);
          getAllProducts(false);
          handleVisible();
        }} />
      ]}
    >
      <Typography.Title level={4} className="label">Sort Menu</Typography.Title>
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Space direction="vertical">
          {sortMenu.map((item) => (
            <Radio key={item} value={item.key}>{item.label}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  )
}

export default inject((stores) => ({
  productStore: stores.store.productStore
}))(observer(SortMenu));
