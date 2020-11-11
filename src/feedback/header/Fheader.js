import React, { Component } from 'react';
import {Menu, Icon} from 'antd';
import './Fheader.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import CountDown from "../../countdown";


class Fheader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_num: 0,
        };
    } 

    onChangeKey = (e) => {
        this.setState({
            choose_num:e.target
        })
    };

    render() {
        return (
            <div className='fheader'>
                <a className="fhead_icon col-md-8 col-sm-8" href="">
                    <img src={require("../../img/logo.png")} alt=""/>
                </a>
                <Menu
                    mode="horizontal"
                    className="icon"
                    style={{lineHeight: '60px', float: 'right'}}
                    defaultSelectedKeys={['0']}
                    onSelect={this.onChangeKey}
                >
                    <Menu.Item >
                        <a href='/'>返回首页</a>
                    </Menu.Item>

                    <Menu.Item className='header_menuItem' key="" >
                        <CountDown />
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Fheader;