import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Slider, Typography, Radio, Space } from 'antd'
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons'
import AppButton from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

const FilterMenu = (props) => {
  const { productStore, categoryStore, handleVisible } = props
  const { setCategory, category, getAllProducts, setPriceRange, priceRange } = productStore
  const { getAllCategories, categoriesList, categoryLoading } = categoryStore

  useEffect(() => {
    getAllCategories({ type: "product" })
  }, [getAllCategories])

  const formatter = (value) => `₹ ${value}`;
  return (
    <Card
      bordered={false}
      style={{ width: 300 }}
      actions={[
        <AppButton
          textSmall
          label=" Apply"
          prefixIcon={<SettingOutlined />}
          onClick={() => {
            getAllProducts(false);
            handleVisible();
          }}
        />,
        <AppButton
          textSmall
          label=" Reset"
          prefixIcon={<DeleteOutlined />}
          onClick={() => {
            setCategory(undefined);
            setPriceRange({ min: 250, max: 5000 });
            getAllProducts(false);
            handleVisible();
          }}
        />
      ]}
    >
      <Typography.Title level={4} className="label">Filter Menu</Typography.Title>
      <Space direction="vertical" className='w-100'>
        <Typography.Text className='fw-bold label-small'>Price Range</Typography.Text>
        <Slider
          range
          // value={[priceRange.min, priceRange.max]}
          defaultValue={[250, 5000]} max={10000}
          tipFormatter={formatter}
          onChange={e => {
            setPriceRange(`${e[0]}-${e[1]}`);
          }}
        />
        <Typography.Text className='fw-bold label-small'>Category</Typography.Text>
        {categoryLoading ? (<Loader className={"justify-self-center"} />) : (
          <>
            {categoriesList && categoriesList.length > 0 ? (
              <Radio.Group onChange={(e) => setCategory(e.target.value)} value={category}>
                <Space direction="vertical">
                  {categoriesList.map((category) => (
                    <Radio
                      key={category._id}
                      value={category._id}
                      className="text-capitalize"
                    >
                      {category.name}
                    </Radio>
                  ))}
                  <Radio key={"default"} value={undefined}>All</Radio>
                </Space>
              </Radio.Group>
            ) : (
              <Typography.Text>No Categories Found</Typography.Text>
            )}
          </>
        )}
      </Space>
    </Card>
  )
}

export default inject((stores) => ({
  productStore: stores.store.productStore,
  categoryStore: stores.store.categoryStore
}))(observer(FilterMenu));