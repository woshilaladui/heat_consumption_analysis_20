import {
    Form, Input, Tooltip, Icon, message, Button, 
} from 'antd';
import React from "react";
import {Divider} from "antd";
import "./reg.css";

class Registration extends React.Component {
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

    /**表格提交事件**/
    handleSubmit = e => {
        e.preventDefault();
        let jsonData = {};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                jsonData = {
                    'name': values['username'],
                    'phone': values['phone'],
                    'password': values['password'],
                };
            }
        });
        // console.log(jsonData);
        fetch("/api/register", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data['code'] === 0) {//判定是否成功
                    this.props.history.push("/login");
                }
                else {
                    message.error('注册失败');
                }
            })
            .catch(error => console.error('Error:', error))
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

    /**对比两个密码**/
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两个密码不一样！');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value.length < 6) {
            callback('请输入至少六位密码')
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <div className="register">
                <div className="welcomeRegister">
                    <Divider>新增人员</Divider>
                </div>
                <Form className="pleaseRegister" {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label={(
                            <span>姓名&nbsp;<Tooltip title="请使用实际姓名"><Icon type="question-circle-o"/></Tooltip></span>)}
                    >
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入您的姓名!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{
                                pattern: '\\d{11}', message: '请输入11位手机号！',
                            }, {
                                required: true, message: '请输入您的手机号!',
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码！',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码！',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" >确定</Button>
                        <Button type="primary" htmlType="submit" >返回</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create({name: 'register'})(Registration);

export default WrappedRegistrationForm;
