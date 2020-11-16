import React,{Component} from "react";
import {Form, Input, Button, message} from "antd";
import {requestChangePhoneNum} from "../../http/request/RequestUser";

class changePhone extends Component{



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        requestChangePhoneNum(window.localStorage.id,values.newPhoneNum)
          .then((res) => {
            window.localStorage.phone = values.newPhoneNum;
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
          <Form.Item  label="旧手机号" hasFeedback>
            {getFieldDecorator('oldPhoneNum', {
              initialValue:window.localStorage.phone,
              rules: [
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ],
            })(<Input disabled/>)}
          </Form.Item>
          <Form.Item label="新手机号" hasFeedback>
            {getFieldDecorator('newPhoneNum', {
              rules: [
                {
                  required: true,
                  message: 'Please input your newPhone!',
                },
              ],
            })(<Input />)}
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

const WrappedNormaPasswordForm = Form.create()(changePhone);
export default WrappedNormaPasswordForm