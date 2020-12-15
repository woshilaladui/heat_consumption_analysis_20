import React, { Component } from 'react'
import { connect } from 'react-redux'
import { action } from './store'
import {
  Table,
} from 'antd'

const { Column } = Table

class PermissionTable extends Component {
  
  render() {
    const {
      permissionList,
      permissionIds
    } = this.props

    const rowSelection = {
      onSelect: (record, selected) => {
        this.props.setTableSelectedId(record, selected)
      },
      onSelectAll: selected => {
        this.props.setTableSelectAll(selected)
      },
      selectedRowKeys: permissionIds
    }

    return (
      <>
        <Table
          rowKey="id"
          dataSource={permissionList}
          pagination={false}
          bordered={true}
          // defaultExpandAllRows={true}
          defaultExpandedRowKeys={[1]}
          rowSelection={rowSelection}
          // expandedRowKeys={[1,10]}
        >
          <Column
            align ="left"
            title="菜单名称"
            dataIndex="name"
          />
          {/*<Column*/}
          {/*  title="排序"*/}
          {/*  dataIndex="order"*/}
          {/*/> */}
          <Column
            align ="left"
            title="菜单名称"
            dataIndex="request"
          />
          <Column
            align ="left"
            title="类型"
            dataIndex="type"
          />
        </Table>
      </>
    )
  }

}

const mapState = state => ({
  permissionIds: state.getIn(['rolePermission', 'permissionIds']),
  permissionList: state.getIn(['rolePermission', 'permissionList']),
})

const mapDispatch = dispatch => ({
  setTableSelectedId(record, selected) {
    dispatch(action.setTableSelectedId(record, selected))
  },
  setTableSelectAll(status) {
    dispatch(action.setTableSelectAll(status))
  }
})

export default connect(
  mapState,
  mapDispatch,
  null,
  { forwardRef: true }
)(PermissionTable)
