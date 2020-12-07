import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { 
    Form,
    Input,
    Cascader,
    Button,
} from 'antd';

import { roleJudge } from '../../Helper/judge';
 
class Detail extends Component{

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.saveFeedBack(values);
            }
        });
    };

    render(){

        const { TextArea } = Input;

        const { getFieldDecorator } = this.props.form;

        let resDisplay = null;
        let residences = [];
        
        console.log(window.localStorage.roles);

        let flag = roleJudge(window.localStorage.roles);
        console.log(flag);
        if(!flag){
            resDisplay = '';
            residences = [
                {
                  value: '问题',
                  label: '问题',
                },
                {
                  value: '需求',
                  label: '需求',
                },
            ];
        }else{
            resDisplay = 'none';
            residences = [
                {
                  value: '问题',
                  label: '问题',
                },
            ];
        }
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{marginTop:'100px'}}>
                <Form.Item label="标题">
                    {
                        getFieldDecorator('title', 
                            {
                                rules: 
                                    [
                                        {
                                            required: true,
                                            message: '请输入标题',
                                        },
                                    ],
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item label="反馈类型" style={{display:resDisplay}}>
                    {
                        getFieldDecorator('residence', 
                            {
                                initialValue: ['问题'],
                                rules: [
                                    { type: 'array', required: true, message: '请选择您的反馈类型' },
                                ],
                            }
                        )(<Cascader options={residences} />)
                    }
                </Form.Item>
                <Form.Item label="详细说明">
                    {
                    getFieldDecorator('content', {
                        rules: 
                            [
                                {
                                    required: true,
                                    message: '请输入详细的情况说明',
                                },
                            ],
                        })(<TextArea style={{height:'150px'}}/>)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        saveFeedBack(values){
            dispatch(actionCreators.savefb(values))
        },
    }//end return
};

const WrappedRegistrationForm = Form.create()(Detail);

export default connect(mapStateToProps, mapDispathToProps)(WrappedRegistrationForm);
