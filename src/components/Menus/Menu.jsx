import React, { useState } from 'react'
import { Popover, Space } from 'antd'
import { FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'

const AppMenu = (props) => {
  const { placement = "bottomRight", trigger = "click" } = props;
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  function filterMenuVisibleChange() {
    setFilterMenuVisible(!filterMenuVisible);
  };

  function sortMenuVisibleChange() {
    setSortMenuVisible(!sortMenuVisible);
  };
  return (
    <>
      <Space>
        <Popover
          content={<FilterMenu handleVisible={filterMenuVisibleChange} />}
          placement={placement}
          trigger={trigger}
          arrowPointAtCenter
          visible={filterMenuVisible}
          onVisibleChange={filterMenuVisibleChange}
        >
          <FilterOutlined className="label-small" />
        </Popover>
        <Popover
          content={<SortMenu handleVisible={sortMenuVisibleChange} />}
          placement={placement}
          trigger={trigger}
          arrowPointAtCenter
          visible={sortMenuVisible}
          onVisibleChange={sortMenuVisibleChange}
        >
          <SortAscendingOutlined className="label-small" />
        </Popover>
      </Space>
    </>
  )
}

export default AppMenu