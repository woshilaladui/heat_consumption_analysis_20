import React,{Component} from "react";
import {Form, Input, Button, message} from "antd";
import {requestChangePassword} from "../../http/request/RequestUser";

class changePassword extends Component{
   state = {
     confirmDirty: false,
     autoCompleteResult: [],
     email: null,
     name: null,//姓名
     password: null,//密码
     errorMessage: null,
     tel: null,
     messageInfo: [],
   };
   /**确认密码框失去焦点时触发**/
   handleConfirmBlur = e => {
     const value = e.target.value;
     this.setState({confirmDirty: this.state.confirmDirty || !!value});
     if (value !== this.state.password) {
       this.setState({
         errorMessage: '两次输入的密码不同'
       })

     } else {
       this.setState({
         errorMessage: null
       })
     }
   };
   handleSubmit = e => {
     e.preventDefault();
     this.props.form.validateFieldsAndScroll((err, values) => {
       if (!err) {
         console.log('Received values of form: ', values);
         if (values.newPassword != values.confirm) {
           message.error('两次密码不一样,请重新输入')
           return
         }
         requestChangePassword(window.localStorage.id,values.oldPassword,values.newPassword)
           .then((res)=>{
             console.log(res)
             message.info(res.msg)
           })

       }
     });
   };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 5 }
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
        md: {
          span:10,
          offset:9,
        }
      },
    };
    const { getFieldDecorator } = this.props.form;
    return(
      <div >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}  style={{marginTop:'100px'}}>
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