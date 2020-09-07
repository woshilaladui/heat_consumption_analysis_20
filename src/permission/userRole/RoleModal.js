import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
} from 'antd'

const FromItem = Form.Item
const { Option } = Select

class EditModal extends Component {
  componentDidMount() {
    // this.props.information('editModal', this)
  }
//   _information = (key, single) => {
//     this.single[key] = single
//   }
// }

  render() {
    const {
      visible,
      editItem,
      currentUserRoleArr,
      form
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        title="用户角色管理"
        width="800px"
        centered={true}
        closable={false}
        visible={visible}
        destroyOnClose={true}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={this._saveData}
          >保存</Button>,
          <Button
            key="back"
            type="primary"
            ghost
            onClick={this._closeModal}
          >取消</Button>
        ]}
      >
        <Form>
          <Row gutter={80}>
            <Col span={12}>
              <FromItem label="用户名">
                {getFieldDecorator('username', {
                  initialValue: editItem.username,
                  rules: [
                    { required: true, message: '请输入注册用户名' },
                  ]
                })(
                  <Input placeholder="请输入注册用户名" />
                )}
              </FromItem>
            </Col>
            <Col span={12}>
              <FromItem label="手机号码">
                {getFieldDecorator('phone', {
                  initialValue: editItem.phone,
                  rules: [
                    { required: true, message: '请输入手机号' },
                  ]
                })(
                  <InputNumber placeholder="请输入手机号码" />
                )}
              </FromItem>
            </Col>
            <Col span={24}>
              <FromItem label="用户角色选择">
                {getFieldDecorator('roles', {
                  initialValue: currentUserRoleArr,
                  rules: [
                    { required: true, message: '请选择用户角色' },
                  ]
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择用户角色"
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
                )}
              </FromItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }

  _closeModal = () => {
    this.props.handelChangeVisible(true)
    this._fromEmpty()//清空表单
  }

  _saveData = () => {
    const {
      form,
      editItem,
      submitTempInfo,
      submitRolesSelect,
      updateRoleList
    } = this.props
    form.validateFields((err, values) => {
      if (err) return
      console.log("表单数据：",values)

      submitTempInfo(editItem.id, values.username, values.phone)
      submitRolesSelect(editItem.id, values.roles)
      updateRoleList({
        ...values,
        id: editItem.id
      })
      this._closeModal()
    })
  }

  _fromEmpty = () => {
    const { form } = this.props
    form.resetFields()
  }
}

const mapState = (state) => ({
  visible: state.getIn(['userRole', 'visible']),
  editItem: state.getIn(['userRole', 'editItem']),
  currentUserRoleArr: state.getIn(['userRole', 'currentUserRoleArr']),
})

const mapDispatch = (dispatch) => ({
  handelChangeVisible(visible) {
    dispatch(actionCreators.ChangeVisible(visible))
  },
  submitTempInfo(id, username, phone) {
    dispatch(actionCreators.submitTempInfo(id, username, phone))
  },
  submitRolesSelect(id, RolesArr) {
    dispatch(actionCreators.submitRolesSelect(id, RolesArr))
  },
  updateRoleList(item) {
    dispatch(actionCreators.updateRoleList(item))
  }
})


export default connect(
  mapState,
  mapDispatch
)(Form.create()(EditModal))