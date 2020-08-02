import React,{Component} from "react";


class CreateModal extends Component {
    constructor() {
        super();
    }

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;//检查Form表单填写的数据是否满足rules的要求
            this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
        })
    };
    onCancel = () => {
        this.props.form.resetFields();//重置Form表单的内容
        this.props.onCancel()//调用父组件给的方法
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={this.onCancel}
                visible={this.props.visible}
                title='新增自动升级'
            >
                <Form>
                    <FormItem label="升级计划名称">
                        {getFieldDecorator('planName', {
                            rules: [{required: true, message: '请填写升级计划名称'}],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="自动升级时间">
                        {getFieldDecorator('upgradeTime', {
                            initialValue: moment(),
                            rules: [{required: true, message: '请选择自动升级时间'}],
                        })(
                            <DatePicker
                                style={{width: 300}}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="选择自动升级时间"
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export const CreateModalFormModal = Form.create()(CreateModal);

// //以下父组件里的代码
// <CreatePlanModal
//     visible={this.state.createPlanModalVisible}
//     onOk={(values) => this.judgeCreatePlan(values)}
//     onCancel={this.handleCancel}
// />