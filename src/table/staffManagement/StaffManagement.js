import React, {Component} from 'react';
import {message, Table, Select, Modal, Button, Input} from 'antd';
import './StaffManagement.css';
import XLSX from 'xlsx';
import ButtonConfirmationBox from "./components/ButtonConfirmBox";

import * as actionCreators from "../staffManagement/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../Helper/Copy";

const Option = Select.Option;


class UserManage extends Component {
    state = {
        Users: [],//用户信息数数组
        isAdmin: false,//是否是管理员(6),默认否
        loading: false,
        visible: false,//model的显示状态
        userCreateVisible: false,
        number: 0,
    };

    /**Model组件控制**start**/
    showModal = (i) => {

        const {
            changeUserInformationVisible,
            userInformationVisible,
            setUserInformation,
            user
        } = this.props;

        changeUserInformationVisible(userInformationVisible);

        let tempUser = deepCopy(user[i]);

        setUserInformation(tempUser);

        // const users = this.state.Users[i];
        // this.setState({
        //     visible: true,
        //     number: i,
        //     id: users.id,//当前选择修改的员工信息
        //     name: users.name,
        //     phone: users.phone,
        //     state: users.state,
        //     department: users.department,
        //     section: users.section,
        //     type: users.type,
        //     NameStyle: {width: 200},
        //     PhoneStyle: {width: 200},
        // });
    };
    showUserModal = () => {
        this.setState({
            userCreateVisible: true,
            newId: '',//当前选择修改的员工信息
            newName: '',
            newPhone: '',
            newPassword: '',
            newState: '',
            newDepartment: '',
            newSection: '',
            newType: '',
            newNameStyle: {width: 200},
            newPhoneStyle: {width: 200},
            newPasswordStyle: {width: 200},
        })
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
        const jsonData = {
            'id': this.state.id,
            'name': this.state.name,
            'phone': this.state.phone,
            'state': this.state.state,
            'department': this.state.department,
            'section': this.state.section,
            'type': this.state.type,
        };

        console.log(JSON.stringify(jsonData))
        fetch("/api/UserManage/updateInfo", {
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
                if (data['code'] === 0) {//判定是否成功
                    message.info('修改成功');
                    const users = [];
                    for (let i = 0; i < data.Users.length; i++) {
                        users[i] = data.Users[i]
                    }
                    this.setState({
                        Users: users,
                        loading: false,
                    });
                }
            }).catch(error => console.error('Error:', error))
    };
    userHandleOk = () => {
        const {newName, newPhone, newPassword, newState, newDepartment, newSection, newType} = this.state
        this.setState({
            userCreateVisible: false,
        });
        const jsonData = {
            'name': newName+'',
            'phone': newPhone+'',
            'password': newPassword+'',
            'state': newState+'',
            'department': newDepartment+'',
            'section': newSection+'',
            'type': newType+'',
        };
        fetch("/api/register", {
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
                if (data['code'] === 0) {//判定是否成功
                    message.info('添加成功');
                    fetch("/api/UserManage/queryAllUsers", {//查询所有用户
                        method: 'POST',
                        credentials: "include",
                        // body: JSON.stringify(jsonData),
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': window.localStorage.authorization,
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data['code'] === 0) {//判定是否成功
                                const users = [];
                                for (let i = 0; i < data['Users'].length; i++) {
                                    users[i] = data['Users'][i]
                                }
                                this.setState({
                                    Users: users,
                                    loading: false,
                                });
                            }
                        })
                        .catch(error => console.error('Error:', error))
                }
                else
                    message.error('添加失败，请检查手机号是否已存在');
            }).catch(error => console.error('Error:', error))
    };

    handleCancel = () => {
        const {
            changeUserInformationVisible,
            userInformationVisible
        } = this.props;

        changeUserInformationVisible(userInformationVisible);
    };
    userHandleCancel = () => {
        this.setState({
            userCreateVisible: false,
        });
    };

    /**Model组件控制**end**/

    //判定是否已登录，是否有权限
    componentWillMount() {

        const {setOldData,initTable} = this.props;

        setOldData();
        initTable();

        if (Date() - window.localStorage.time > 12 * 3600 * 1000) {
            //登录超时,返回首页
        }
        if (window.localStorage.type < 3) {
            //没有权限 返回首页
            this.props.history.push('/')
        } else if (window.localStorage.type === 4) {//是管理员(4)
            this.setState({
                isAdmin: true,
            })
        }
    }

    //查询用户
    componentDidMount() {
        this.setState({loading: true});
        // fetch("/api/UserManage/queryAllUsers", {//查询所有用户
        //     method: 'POST',
        //     credentials: "include",
        //     // body: JSON.stringify(jsonData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': window.localStorage.authorization,
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data['code'] === 0) {//判定是否成功
        //             const users = [];
        //             for (let i = 0; i < data['Users'].length; i++) {
        //                 users[i] = data['Users'][i]
        //             }
        //             this.setState({
        //                 Users: users,
        //                 loading: false,
        //             });
        //         }
        //     })
        //     .catch(error => console.error('Error:', error))
    }

    /**Excel导入**start**/
    importExcel = (e) => {
        var files = e.target.files;
        var name = files.name;
        const reader = new FileReader();
        reader.readAsBinaryString(files[0]);
        // reader.readAsArrayBuffer(files[0]);
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            this.setState({Excel_Data: data});
        };
    };

    //Excel导入提交按钮事件
    handleSubmit = () => {
        this.setState({loading: true});
        const jsonData = {
            data: this.state.Excel_Data
        };
        // fetch("/api/Admin_Import", {
        //     method: 'POST',
        //     credentials: "include",
        //     body: JSON.stringify(jsonData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': window.localStorage.authorization,
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data['code'] === 0) {//判定是否成功
        //             message.info('导入成功！');
        //             const users = [];
        //             for (let i = 0; i < data.Users.length; i++) {
        //                 users[i] = data.Users[i]
        //             }
        //             this.setState({
        //                 Users: users,
        //                 loading: false,
        //             });
        //         }
        //     }).catch(error => console.error('Error:', error))

    };
    /**Excel导入**end**/


        //删除用户按钮
        // handleDel = (i) => {
        //     this.setState({loading: true});
        //     const type = window.localStorage.type;
        //     const users = this.state.Users;
        //     if (type === '4') {//登入人员是经理
        //         if (users[i].type === '4') {//被删除人员是经理，经理不能删除经理
        //             return;
        //         }
        //     }
        //     const jsonData = {
        //         id: users[i].id,
        //     }
        //     fetch("/api/UserManage/DeleteUser", {
        //         method: 'POST',
        //         credentials: "include",
        //         body: JSON.stringify(jsonData),
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': window.localStorage.authorization,
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data['code'] === 0) {//判定是否成功
        //                 message.info('删除成功')
        //                 const users = [];
        //                 for (let i = 0; i < data.Users.length; i++) {
        //                     users[i] = data.Users[i]
        //                 }
        //                 this.setState({
        //                     Users: users,
        //                     loading: false,
        //                 });
        //             }
        //         }).catch(error => console.error('Error:', error))
        // };

        //权限选择框的响应
    handleChange = (e, i) => {//i是选择框所在表格行数,e是新权限
        const privilege = window.localStorage.privilege;
        const users = this.state.Users
        const {newPrivileges, Users} = this.state;
        if (privilege === '4') {//登入人员是经理
            if (users[i].privilege === '4') {//经理不能修改其他经理的权限
                return;
            }
        }
        let j = 0;//循环标记
        for (j = 0; j < newPrivileges.length; j++) {
            if (newPrivileges[j].id === Users[i].id) {//如果之前修改过这个人的权限
                newPrivileges[j].privilege = e;//覆盖上一次的权限修改
                break;
            }
        }
        if (j === newPrivileges.length) {//循环完毕，之前没有修改过这个人的权限，把修改信息加入数组
            newPrivileges.push({
                id: Users[i].id,
                privilege: e,
            })
        }
        // console.log(newPrivileges)
        this.setState({
            newPrivileges
        })
    };

    handleChangeName(e) {
        //名字不符合长度变色
        if (e.target.value.length < 2 || e.target.value.length > 4) {
            this.setState({
                name: e.target.value,
                NameStyle: {width: 200, borderColor: 'red', color: 'red',}
            })
        }
        else {
            this.setState({
                name: e.target.value,
                NameStyle: {width: 200}
            })
        }
    }

    handleChangePhone(e) {
        //电话不符合长度变色
        if (e.target.value.length > 11) {
            this.setState({
                phone: e.target.value,
                PhoneStyle: {width: 200, borderColor: 'red', color: 'red',}
            })
        }
        else {
            this.setState({
                phone: e.target.value,
                PhoneStyle: {width: 200}
            })
        }
    }

    handleChangeState = (e) => {
        this.setState({
            state: e,
        })
    };
    handleChangeDepartment = (e) => {
        this.setState({
            department: e,
        });
    };
    handleChangeSection = (e) => {
        this.setState({
            section: e,
        });
    };
    handleChangeType = (e) => {
        this.setState({
            type: e,
        })
    };

    initTable(){

        let tableDuty = new Array(100);

        tableDuty[0] = '无';
        tableDuty[1] = '中控室主任';
        tableDuty[2] = '总工程师';
        tableDuty[3] = '化验室主任';
        tableDuty[50] = '中控室操作员';
        tableDuty[51] = '实地操作员';
        tableDuty[61] = '化验室荧光分析员';
        tableDuty[62] = '化验室荧光控制员';
        tableDuty[71] = '化验室分析员';
        tableDuty[72] = '化验室物检员';

        return tableDuty;


    }


    render() {
        const columns = [
            {
                title: '姓名',
                width: '14%',
                dataIndex: 'name',
            }, {
                title: '手机号',
                width: '14%',
                dataIndex: 'phone',
            }, {
                title: '状态',
                width: '14%',
                dataIndex: 'state',
            }, {
                title: '部门',
                width: '14%',
                dataIndex: 'department',
            }, {
                title: '职务',
                width: '14%',
                dataIndex: 'duty',
            }, {
                title: '类型',
                width: '14%',
                dataIndex: 'type',
            }, {
                title: '修改',
                width: '16%',
                dataIndex: 'option',
            },];
        const users = this.state.Users;
        const data = [];
        const state_List = ['离职', '在岗'];
        const department_List = ['无部门', '化验室', '中控室', '行政部门'];
        const section_List = ['无', '总部', '荧光', '分析', '物检'];
        const type_List = ['无', '总经理', '部门经理', '员工'];



        const {user,dutyList,stateList,departmentList,typeList,userInformationVisible,presentUser} = this.props;



        let User = deepCopy(user);

        for (let i = 0; i < User.length; i++) {
            let disabled = false;//修改框是否能展开，默认能
            // if (!this.state.isAdmin && users[i].type >= 4) {//不是管理员的人，不能变更经理的权限
            //     disabled = true;
            // }
            data.push(
                {
                    name: User[i].username,
                    phone: User[i].phone,
                    state: stateList[User[i].state],
                    department: departmentList[User[i].department],
                    duty: dutyList[User[i].duty],
                    type: typeList[User[i].authority],
                    option: <Button type='primary' /*size={"large"}*/ /*htmlType={"button"}*/
                                    style={this.props.buttonStyle} disabled={disabled}
                                    onClick={() => this.showModal(i)}
                    >修改</Button>
                    // <ButtonConfirmationBox type="primary" buttonText="修改" action={() => this.showModal(i)}/>
                },
            );
        }

        return (
            <div className='UserManage' style={{padding: '1%'}}>
                <Table columns={columns} dataSource={data}
                    //    loading={this.state.loading}
                       pagination={
                           {
                               total: users.length,//数据总数
                               showSizeChanger: true,//改变页数选择
                               pageSizeOptions: ['5', '10', '30', '50'],//页数选择
                               defaultPageSize: 5,
                           }
                       }
                >
                </Table>
                <Modal
                    title='员工管理'
                    visible={userInformationVisible}
                    onOk={this.handleOk}
                    // width='240px'
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <div>姓名：<Input value={presentUser.username} style={{width:200}}
                                   onChange={(e) => this.handleChangeName(e)}/></div>
                    <div style={{marginTop: 5}}>电话：<Input value={presentUser.phone} style={{width:400}}
                                                          onChange={(e) => this.handleChangePhone(e)}/>
                    </div>
                    <div style={{marginTop: 5}}>状态：<Select defaultValue={stateList[presentUser.state]}
                                                           style={{width: 120}}
                                                           onChange={(e) => this.handleChangeState(e)}
                        /*disabled={!this.state.isAccess}*/>
                        <Option value={1}>在岗</Option>
                        <Option value={0}>离职</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>部门：<Select defaultValue={departmentList[presentUser.department]}
                                                           style={{width: 120}}
                                                           onChange={(e) => this.handleChangeDepartment(e)}>
                        <Option value={0}>无部门</Option>
                        <Option value={1}>化验室</Option>
                        <Option value={2}>中控室</Option>
                        <Option value={3}>行政部门</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>职务：<Select defaultValue={dutyList[presentUser.duty]}
                                                           style={{width: 120}}
                                                           onChange={(e) => this.handleChangeSection(e)}>
                        <Option value={0}>无</Option>
                        <Option value={1}>总部</Option>
                        <Option value={2}>荧光</Option>
                        <Option value={3}>分析</Option>
                        <Option value={4}>物检</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>岗位：<Select defaultValue={typeList[presentUser.authority]}
                                                           style={{width: 120}}
                                                           onChange={(e) => this.handleChangeType(e)}>
                        <Option value={0}>无权限人员</Option>
                        <Option value={1}>操作员</Option>
                        <Option value={2}>工程师</Option>
                        <Option value={3}>主任</Option>
                        <Option value={4} disabled={!this.state.isAdmin}>经理</Option>
                    </Select></div>
                </Modal>
                <Modal
                    title='新增员工'
                    visible={this.state.userCreateVisible}
                    onOk={this.userHandleOk}
                    // width='240px'
                    onCancel={this.userHandleCancel}
                    destroyOnClose={true}
                >
                    <div>姓名：<Input value={this.state.newName} style={this.state.newNameStyle}
                                   onChange={(e) => {
                                       this.setState({newName: e.target.value})
                                   }}/></div>
                    <div style={{marginTop: 5}}>电话：<Input value={this.state.newPhone} style={this.state.newPhoneStyle}
                                                          onChange={(e) => {
                                                              this.setState({newPhone: e.target.value})
                                                          }}/>
                    </div>
                    <div style={{marginTop: 5}}>密码：<Input value={this.state.newPassword}
                                                          style={this.state.newPasswordStyle}
                                                          onChange={(e) => {
                                                              this.setState({newPassword: e.target.value})
                                                          }}/>
                    </div>
                    <div style={{marginTop: 5}}>状态：<Select defaultValue={stateList[this.state.newState]}
                                                           style={{width: 120}}
                                                           onChange={(e) => {
                                                               this.setState({newState: e})
                                                           }}
                        /*disabled={!this.state.isAccess}*/>
                        <Option value={1}>在岗</Option>
                        <Option value={0}>离职</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>部门：<Select defaultValue={departmentList[this.state.newDepartment]}
                                                           style={{width: 120}}
                                                           onChange={(e) => {
                                                               this.setState({newDepartment: e})
                                                           }}>
                        <Option value={0}>无部门</Option>
                        <Option value={1}>化验室</Option>
                        <Option value={2}>中控室</Option>
                        <Option value={3}>行政部门</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>科室：<Select defaultValue={section_List[this.state.newSection]}
                                                           style={{width: 120}}
                                                           onChange={(e) => {
                                                               this.setState({newSection: e})
                                                           }}>
                        <Option value={0}>无</Option>
                        <Option value={1}>总部</Option>
                        <Option value={2}>荧光</Option>
                        <Option value={3}>分析</Option>
                        <Option value={4}>物检</Option>
                    </Select></div>
                    <div style={{marginTop: 5}}>类型：<Select defaultValue={type_List[this.state.newType]}
                                                           style={{width: 120}}
                                                           onChange={(e) => {
                                                               this.setState({newType: e})
                                                           }}>
                        <Option value={0}>无权限人员</Option>
                        <Option value={1}>操作员</Option>
                        <Option value={3}>工程师</Option>
                        <Option value={4} disabled={!this.state.isAdmin}>经理</Option>
                    </Select></div>
                </Modal>
                <Button type="primary" style={{float: 'left', margin: "0px 50px 20px 0px", display: 'block',}}
                        onClick={() => this.showUserModal()}
                >
                    新增人员
                </Button>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        // display: this.state.isAdmin ? '' : 'none',
                        display: 'block',
                    }}
                >
                    <input type="file" id="excel-file" onChange={this.importExcel}/>
                    <Button type="primary"
                            onClick={this.handleSubmit}>批量导入</Button>
                </div>
            </div>
        );


    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['staffManagement', 'date']),
        user:state.getIn(['staffManagement', 'user']),
        presentUser:state.getIn(['staffManagement', 'presentUser']),
        requestFlag:state.getIn(['staffManagement', 'requestFlag']),
        person:state.getIn(['staffManagement', 'person']),

        dutyList:state.getIn(['staffManagement', 'dutyList']),
        stateList:state.getIn(['staffManagement', 'stateList']),
        departmentList:state.getIn(['staffManagement', 'departmentList']),
        typeList:state.getIn(['staffManagement', 'typeList']),

        userInformationVisible:state.getIn(['staffManagement', 'userInformationVisible']),
        userCreateVisible:state.getIn(['staffManagement', 'userCreateVisible']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(){
            dispatch(actionCreators.getData())

            //dispatch(actionCreators.updataDuty())
        },
        changeUserInformationVisible(userInformationVisible){
            dispatch(
                actionCreators.changeDataUserInformationVisible(
                    userInformationVisible
                )
            );
        },

        changeUserCreateVisible(userCreateVisible){

            dispatch(
                actionCreators.changeDataUserCreateVisible(
                    userCreateVisible
                )
            );

        },

        setUserInformation(presentUser){
            dispatch(
                actionCreators.doSetUserInformation(presentUser)
            );
        },

        initTable(){

            dispatch(actionCreators.initTable());
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(UserManage);
