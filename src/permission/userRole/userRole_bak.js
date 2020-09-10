import React, {Component} from "react";
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../Helper/Copy";
import {Switch, Table, Button, Modal, Input, Form, Icon, Select} from 'antd';
import index from "styled-components/dist/styled-components-macro.esm";

const FormItem = Form.Item;
const {Option} = Select;


class UserRole extends Component {
    state={
        name:'',
        phone:'',
    };
    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, roleData, setOldData, requestFlag, getAllRole} = this.props;

        if (requestFlag) {
            getAllRole(deepCopy(roleData));
            setOldData(deepCopy(data));
        }

    }


    handleModal = () => {

    };


    showConfirm = (Data, i, children) => {

        let currentUserRoleArr = [];
        const modal = Modal.confirm();
        const {getFieldDecorator, getFieldValue} = this.props.form;

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
                console.log(userName, userPhone)
                console.log('userName')
                //调用点击确定时回调的方法
            },
            onCancel() {
                //点击取消/遮罩层的时候回调的方法
                modal.destroy();//这是调用Modal.confirm()后返回的引用，可以通过该引用更新和关闭弹窗
            },
        })


    }
    showModal = (i) => {
        let currentUserRoleArr = [];
        const {handelChangeVisible, visible, data, updatePresentUserData} = this.props;
        handelChangeVisible(visible);
        const Data = deepCopy(data);
        updatePresentUserData(Data[i]);
        this.setState({
            name:Data[i].username,
            phone:Data[i].phone,
        });
        this.props.getCurrentUserRole(Data[i].username);

    };

    handleOk = e => {
        // console.log(e);

        const { submitRolesSelect,presentUser, visible,handelChangeVisible,submitTempInfo,data,setOldData,updatePresentUserData} = this.props;
        handelChangeVisible(visible)
        submitTempInfo(presentUser.id,this.state.name,this.state.phone)
        setOldData(deepCopy(data));
        submitRolesSelect(presentUser.id,this.state.changeSelectValue)
    };

    handleCancel = e => {
        // console.log(e);
        const {handelChangeVisible, visible} = this.props;
        handelChangeVisible(visible);
    };

    handleChangeEnabled = (e, username) => {
        if (e === true) {
            this.props.changeEnabled(username, 0)
        } else {
            this.props.changeEnabled(username, 1)
        }

    };
    handleChangePresentUsername = e => {
        this.setState({
            name:e.target.value,
        })
    };
    handleChangePresentPhone = e => {
        this.setState({
            phone:e.target.value,
        })
    };
    handleChangeSelect = (e) => {
        console.log('e')
        console.log(e)
        console.log('e')
        this.setState({
            changeSelectValue:e,
        })
    }
    render() {
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
        const {data, presentUser, visible} = this.props;
        // const children = [];
        // const {getFieldDecorator, getFieldValue} = this.props.form;
        // this.props.roleData.map((item, index) => {
        //     children.push(<Option key={item.id}>{item.roleName}</Option>);
        // });

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
                operation: <div><Button type="primary" onClick={() => this.showModal(i)}>
                    编辑
                </Button>
                </div>

            })
        }
        return (
            <div>
                <Table
                    columns={columns} bordered dataSource={dataSource} pagination={false}
                />
                <Modal
                    title='用户角色管理'
                    visible={visible}
                    onOk={this.handleOk}
                    // width='240px'
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <div>
                        用户名
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入注册用户名"
                            defaultValue={presentUser.username}
                            onChange={e=>this.handleChangePresentUsername(e)}
                        />
                    </div>
                    <div>手机号
                        <Input
                            placeholder="请输入手机号"
                            defaultValue={presentUser.phone}
                            onChange={e=>this.handleChangePresentPhone(e)}
                        />
                    </div>

                    <p><Icon type='user'/>用户角色选择：</p>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={this.props.currentUserRoleArr}
                        loading={true}
                        onChange={this.handleChangeSelect}
                    >
                        <Option value={61} key={61}>化验室荧光分析员</Option>
                        <Option value={62} key={62}>化验室荧光控制员</Option>
                        <Option value={1} key={1}>中控室主任</Option>
                        <Option value={2} key={2}>总工程师</Option>
                        <Option value={3} key={3}>化验室主任</Option>
                        <Option value={4} key={4}>超级管理员</Option>
                        <Option value={50} key={50}>中控室操作员</Option>
                        <Option value={51} key={51}>实地操作员(仅针对手机web版本)</Option>
                        <Option value={71} key={71}>化验室分析员</Option>
                        <Option value={72} key={72}>化验室物检员</Option>


                    </Select>,
                </Modal>
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
        visible: state.getIn(['userRole', 'visible']),
        presentUser: state.getIn(['userRole', 'presentUser']),
        currentUserRoleArr: state.getIn(['userRole', 'currentUserRoleArr']),
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
        },
        handelChangeVisible(visible) {
            dispatch(actionCreators.ChangeVisible(visible))
        },
        updatePresentUserData(presentUserData) {
            dispatch(actionCreators.updatePresentUserData(presentUserData))
        },
        handleChangePresentUsername(presentUsername){
            dispatch(actionCreators.ChangePresentUsername(presentUsername))
        },
        submitTempInfo(id,username,phone) {
            dispatch(actionCreators.submitTempInfo(id,username,phone))
        },
        submitRolesSelect(id,RolesArr){
            dispatch(actionCreators.submitRolesSelect(id,RolesArr))
        }
    }//end return
};
const WrappedUserRoleForm = Form.create()(UserRole);
//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserRoleForm);