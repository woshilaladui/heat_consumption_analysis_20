import React from "react";
import {Input, Button, message,} from 'antd';

export default class user extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    componentWillMount() {

    }

    changePwd = () => {
        const {oldPassword, newPassword, confirmPassword} = this.state
        if (newPassword != confirmPassword) {
            message.error('两次密码不一样,请重新输入')
            return
        }
        const jsonData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
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
    changeOldPwd = (e) => {
        const oldPassword = e.target.value
        this.setState({oldPassword})
    }
    changeNewPwd = (e) => {
        const newPassword = e.target.value
        this.setState({newPassword})
    }
    confirmNewPwd = (e) => {
        const confirmPassword = e.target.value
        this.setState({confirmPassword})
    }

    render() {
        return (
            <div>
                <a>输入旧密码：</a>
                <Input style={{width: '10%'}} onBlur={this.changeOldPwd}/><br/>
                <a>输入新密码：</a>
                <Input style={{width: '10%'}} onBlur={this.changeNewPwd}/><br/>
                <a>确认新密码：</a>
                <Input style={{width: '10%'}} onBlur={this.confirmNewPwd}/><br/>
                <Button onClick={this.changePwd}>确认</Button>
            </div>
        )
    }

}