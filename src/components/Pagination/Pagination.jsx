import React from 'react'
import { Pagination, Col } from 'antd'

const AppPagination = (props) => {
  const {
    current = 1,
    total = 0,
    pageSize = 12,
    onChange,
    onSizeChange,
    showSizeChanger = true,
    ...rest
  } = props;
  return (
    <Col span={24} className="text-end mb-3">
      <Pagination
        defaultCurrent={current}
        total={total}
        pageSize={pageSize}
        onChange={(page) => onChange(page)}
        onShowSizeChange={(page, pageSize) => onSizeChange(pageSize)}
        showSizeChanger={showSizeChanger}
        {...rest}
      />
    </Col>
  )
}

export default AppPagination