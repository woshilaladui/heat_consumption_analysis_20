import React, { Component } from 'react'
import { connect } from 'react-redux'
import { action } from './store'
import {
  Select,
  Button,
  message,
} from 'antd'
import PermissionTable from './PermissionTable'


const { Option } = Select;

class RolePermission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleId: undefined
    }
  }
  componentDidMount() {
    this.props.getPermissionList();
  }

  render() {
    const {
      roleId
    } = this.state
    return (
      <>
        <div>
          <Select
            value={roleId}
            style={{ width: 300, marginBottom: 30 }}
            placeholder="请选择角色"
            onChange={this._onChangeRoleId}
          >
            <Option value={61}>化验室荧光分析员</Option>
            <Option value={62}>化验室荧光控制员</Option>
            <Option value={1}>中控室主任</Option>
            <Option value={2}>总工程师</Option>
            <Option value={3}>化验室主任</Option>
            <Option value={4}>超级管理员</Option>
            <Option value={50}>中控室操作员</Option>
            <Option value={51}>实地操作员(仅针对手机web版本)</Option>
            <Option value={71}>化验室分析员</Option>
            <Option value={72}>化验室物检员</Option>
          </Select>
        </div>
        <div>
          <Button
            key="submit"
            type="primary"
            style={{
              float: "right",
              marginTop: -62
            }}
            onClick={this._saveData}
          >保存信息</Button>
        </div>
        <div>
          <PermissionTable />
        </div>
      </>
    )
  }

  _onChangeRoleId = value => {
    this.setState({
      roleId: value
    })

    this.props.handleRequestGetCurrentRolePermission(value);
  }

  _saveData = () => {
    const { roleId } = this.state
    const { permissionIds } = this.props
    if (!roleId) {
      message.error("请选择角色！")
      return
    }
    if (permissionIds.length === 0) {
      message.error("请分配权限！")
      return
    }

    this.props.savePermission({
      roleId,
      permissionIds
    })
  }
}

const mapState = state => ({
  permissionIds: state.getIn(['rolePermission', 'permissionIds']),
})

const mapDispatch = dispatch => ({
  setTableSelectedId(record, selected) {
    dispatch(action.setTableSelectedId(record, selected))
  },
  setTableSelectAll(status) {
    dispatch(action.setTableSelectAll(status))
  },
  savePermission(data) {
    dispatch(action.savePermission(data))
  },
  handleRequestGetCurrentRolePermission(roleId){
    dispatch(action.GetCurrentRolePermission(roleId))
  },
  getPermissionList(){
    dispatch(action.getPermissionList())
  }
})

export default connect(
  mapState,
  mapDispatch
)(RolePermission)


