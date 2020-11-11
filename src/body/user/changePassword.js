import React,{Component} from "react";
import {Form, Input, Button, message} from "antd";

 class changePassword extends Component{
   handleSubmit = e => {
     e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         console.log('Received values of form: ', values);
         if (values.newPassword != values.confirm) {
           message.error('两次密码不一样,请重新输入')
           return
         }
         const jsonData = {
           oldPassword: values.confirm,
           newPassword: values.newPassword,
         }
         fetch("/api/UserManage/changePassword", {
           method: 'POST',
           credentials: "include",
           body: JSON.stringify(jsonData),
           headers: {
             'Content-Type': 'application/json',
             'authorization': window.localStorage.authorization,
           }
         })
           .then(res => res.json())
           .then(data => {
             console.log(data)
             if (data['code'] === 0) //判定是否成功
               message.info('修改成功！')
             else if (data['code'] === 1)
               message.error('密码错误，修改失败！')
             else
               message.error('修改失败！')
           })
           .catch(error => console.error('Error:', error))
       }
     });
   };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <div >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item  label="oldPassword" hasFeedback>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="newPassword" hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedNormaPasswordForm = Form.create()(changePassword);
export default WrappedNormaPasswordForm