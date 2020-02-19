import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './Header.css';
import {Link} from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_num: 0,
            CompanyName: '临城中联福石水泥有限公司',
            needLogin: true,  //根据登录信息，切换登录与注销按钮
            showItem: 'none',  //是否显示表格相关按钮
        };
    }

    componentDidMount = () => {
        const d = new Date();
        const time = parseInt((d.getTime() - window.localStorage.time) / 60000);
        if (time > 720) {
            window.localStorage.clear();
            this.setState({
                needLogin: true,
                showItem: 'true',
            })
        }
        else if (window.localStorage.token) {
            this.setState({
                needLogin: false,
                showItem: ''
            })
        }
    }
    handleLogout = () => {
        const jsonData = {
            'token': window.localStorage.token,
        };
        fetch("/api/logout", {
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
                if (data['code'] === 0) {
                    //判定是否成功
                    window.localStorage.clear();
                    this.setState({
                        showItem: 'none',
                        needLogin: 'true',
                    });
                    this.onChangekey({"key": 0});
                }
            })
            .catch(error => console.error('Error:', error))
    };

    render() {
        return (
            <div className='iheader'>
                {/**图片盒子*/}
                <a className="head_icon col-md-8 col-sm-8" href="">
                    <img src={require("../../img/logo.png")} alt=""/>
                </a>
                <a className="head_companyName col-md-8 col-sm-8">{this.state.CompanyName}</a>
                <Menu
                    mode="horizontal"
                    className="icon"
                    style={{lineHeight: '60px', float: 'right'}}
                    defaultSelectedKeys={['0']}
                >
                    <Menu.Item className='header_menuItem submenu-title-wrapper' key="0">
                        <Icon type="home"/> 首页
                    </Menu.Item>

                    <Menu.Item className='header_menuItem' key="table" style={{display: this.state.showItem}}>
                        <Link to="/table">
                            <Icon type="table"/>表格相关
                        </Link>
                    </Menu.Item>
                    {
                        this.state.needLogin ?
                            <Menu.Item className='header_menuItem' key="login">
                                <Icon type="login"/>登录<a href="login" rel="noopener noreferrer"/>
                            </Menu.Item> :
                            <Menu.Item className='header_menuItem' key="logout"
                                       onClick={this.handleLogout}>
                                <Icon type="logout"/>注销
                            </Menu.Item>
                    }

                    <Menu.Item className='header_menuItem' key="people" style={{display: this.state.showItem}}>
                        <Link to="/user">
                            <Icon type="user"/>{window.localStorage.name}
                        </Link>

                    </Menu.Item>

                </Menu>
            </div>
        )
    }
}