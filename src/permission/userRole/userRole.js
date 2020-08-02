import React, {Component} from "react";
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../Helper/Copy";
import {Switch, Table, Button, Modal, Input, Form, Icon, Select} from 'antd';
import index from "styled-components/dist/styled-components-macro.esm";

const FormItem = Form.Item;
const {Option} = Select;


class UserRole extends Component {
    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, roleData, setOldData, requestFlag, getAllRole} = this.props;

        if (requestFlag) {
            getAllRole(deepCopy(roleData));
            setOldData(deepCopy(data));
        }

    }

    state = {visible: false};
    handleModal = () => {

    };


    showConfirm = (Data, i, children) => {
        {/*<Modal*/}
        {/* title="Basic Modal"*/}
        {/*visible={this.state.visible}*/}
        {/*    onOk={this.handleOk}*/}
        {/*  onCancel={this.handleCancel}*/}
        {/* destroyOnClose='true'*/}
        {/*>*/}
        {/*<span>用户名<Input value={Data[i].username} /></span>*/}
        {/*    手机号<Input value={Data[i].phone} />*/}
        {/*</Modal>*/}
        {/*this.setState({*/}
        {/*    visible:true*/}
        {/*})*/}
        let currentUserRoleArr = [];
        const modal = Modal.confirm();
        const {getFieldDecorator,getFieldValue} = this.props.form;

        this.props.getCurrentUserRole(Data[i].username);
        this.props.userRoleData.map((item, index) => {
            currentUserRoleArr.push(item.roleName)
        });
        modal.update({
            title: '标题',
            okText: '保存',//默认为确认
            cancelText: '关闭',//默认为取消
            destroyOnClose: true,
            //默认false。默认关闭后状态不会自动清空, 如果希望每次打开都是新内容需要设置true
            content: (
                <div>
                    {console.log(Data)}
                    <Form>
                        <FormItem label="用户名" style={{marginBottom: '10px'}}>
                            {getFieldDecorator('username', {
                                initialValue: Data[i].username,//不能通过input中设置value值来默认显示
                                rules: [{required: true, message: '请填写用户名'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="请输入注册手机号"/>
                            )}
                        </FormItem>
                        <FormItem label="手机号">
                            {getFieldDecorator('phone', {
                                initialValue: Data[i].phone,//不能通过input中设置value值来默认显示
                                rules: [{required: true, message: '请填写手机号'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                    <p><Icon type='user'/>用户角色选择：</p>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={currentUserRoleArr}
                        // onChange={handleChange}
                        >
                        {children}
                    </Select>,
                </div>
            ),
            onOk() {
                const userName = getFieldValue('username');
                const userPhone = getFieldValue('phone');
                console.log('userName')
                console.log(userName,userPhone)
                console.log('userName')
                //调用点击确定时回调的方法
            },
            onCancel() {
                //点击取消/遮罩层的时候回调的方法
                modal.destroy();//这是调用Modal.confirm()后返回的引用，可以通过该引用更新和关闭弹窗
            },
        })




    }
    showModal = (Data, i) => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleChangeEnabled = (e, username) => {
        if (e === true) {
            this.props.changeEnabled(username, 0)
        } else {
            this.props.changeEnabled(username, 1)
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'username',
                dataIndex: 'username',
            },
            {
                title: 'phone',
                dataIndex: 'phone',
            },
            {
                title: 'userState',
                dataIndex: 'userState',
            },
            {
                title: 'role',
                dataIndex: 'role',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
            },
        ];
        const dataSource = [];
        const {data} = this.props;
        const children = [];
        this.props.roleData.map((item, index) => {
            children.push(<Option key={item.roleName}>{item.roleName}</Option>);
        });
        const Data = deepCopy(data);
        for (let i = 0; i < Data.length; i++) {
            dataSource.push({
                id: Data[i].id,
                username: Data[i].username,
                phone: Data[i].phone,
                userState: <Switch
                    checkedChildren="启用" checked={Data[i].enabled} unCheckedChildren="禁用"
                    onChange={(e) => this.handleChangeEnabled(e, Data[i].username)}
                />,
                role: Data[i].departmentId,
                operation: <div><Button type="primary" onClick={() => this.showConfirm(Data, i, children)}>
                    编辑
                </Button>
                    {/*<Modal*/}
                    {/*    title="Basic Modal"*/}
                    {/*    visible={this.state.visible}*/}
                    {/*    onOk={this.handleOk}*/}
                    {/*    onCancel={this.handleCancel}*/}
                    {/*    destroyOnClose='true'*/}
                    {/*>*/}
                    {/*    <span>用户名<Input value={Data[i].username} /></span>*/}
                    {/*    手机号<Input value={Data[i].phone} />*/}

                    {/*</Modal>*/}
                </div>

            })
        }
        return (
            <div>
                <Table
                    columns={columns} bordered dataSource={dataSource} pagination={false}
                />
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        date: state.getIn(['userRole', 'date']),
        data: state.getIn(['userRole', 'data']),
        requestFlag: state.getIn(['userRole', 'requestFlag']),
        roleData: state.getIn(['userRole', 'roleData']),
        userRoleData: state.getIn(['userRole', 'userRoleData']),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOldData(data) {//拿到全部的用户
            dispatch(actionCreators.getData(data));//派发函数
        },
        getAllRole(data) {//拿到所有的角色信息
            dispatch(actionCreators.getAllRole(data))
        },
        getCurrentUserRole(username) {
            dispatch(actionCreators.getCurrentUserRole(username))
        },
        changeEnabled(username, enabledValue) {
            dispatch(actionCreators.changeEnabledValue(username, enabledValue))
        }
    }//end return
};
const WrappedUserRoleForm = Form.create()(UserRole);
//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserRoleForm);