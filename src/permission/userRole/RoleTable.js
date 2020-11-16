import React, {Component} from 'react'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import {
  Table,
  Button,
  Switch,
} from 'antd'

const {Column} = Table;

class RoleTable extends Component {
  componentDidMount() {
    this._initData()
  }

  render() {
    const {data} = this.props
    return (
      <div>

        <Table
          rowKey="id"
          dataSource={data}
          pagination={false}
          bordered={true}
        >
          <Column
            title="用户ID"
            dataIndex="id"
          />
          <Column
            title="用户名"
            dataIndex="username"
          />
          <Column
            title="手机号码"
            dataIndex="phone"
          />
          <Column
            title="用户状态"
            dataIndex="enabled"
            render={
              (text, record) => {
                // console.log("开始")
                // console.log("text"+text)
                // console.log("record"+record)
                // console.log(record)
                // console.log("开始")

                return(
                  <Switch
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    checked={record.enabled === 1 ? true : false}
                    onChange={e => this.props.changeEnabled(record.username, e)}
                  />
                )
              }
            }
          />
          <Column
            title="部门ID"
            dataIndex="departmentId"
            render={
              (text, record) => {
                console.log("开始")
                console.log("text" + text)
                console.log("record" + record)
                console.log(record)
                console.log("开始")
                if (record.departmentId === 1) {
                  return '化验室'
                } else if (record.departmentId === 2) {
                  return '中控室'
                } else if (record.departmentId === 3) {
                  return '行政部门'
                } else if (record.departmentId === 4) {
                  return '总部'
                }
              }
            }
          />
          <Column
            title="操 作"
            width="20%"
            render={(text, record) => (
              <div>
                <Button
                type="primary"
                onClick={() => this._editItem(record, text)}
                style={{margin:"0 10px 0 10px"}}
              >
                编辑
              </Button>
                <Button
                  type="primary"
                  onClick={() => this._editPassword(record, text)}
                >
                  重置密码
                </Button>
              </div>


            )}
          />
        </Table>
      </div>
    )
  }

  _initData = () => {
    this.props.getAllRole()
    this.props.setOldData()
  }

  _editItem = (item, test) => {
    console.log("item")
    console.log(item)
    console.log(test)
    console.log("item")

    this.props.setEditItem(item)
    this.props.getCurrentUserRole(item.username)
  }
  _editPassword = (item, test) => {


    this.props.resetPassword(item.id)
  }
}

const mapState = state => {
  return {
    data: state.getIn(['userRole', 'data']),
  }
}

const mapDispatch = dispatch => ({
  setOldData() {//拿到全部的用户
    dispatch(actionCreators.getData())
  },
  getAllRole() {//拿到所有的角色信息
    dispatch(actionCreators.getAllRole())
  },
  getCurrentUserRole(username) {
    dispatch(actionCreators.getCurrentUserRole(username))
  },
  changeEnabled(username, enabledValue) {
    dispatch(actionCreators.changeEnabledValue(username, enabledValue))
  },
  setEditItem(item) {
    dispatch(actionCreators.setEditItem(item))
  },
  resetPassword(id) {
    dispatch(actionCreators.resetPassword(id))
  }
})

export default connect(
  mapState,
  mapDispatch,
  // null,
  // { forwardRef: true }
)(RoleTable)
