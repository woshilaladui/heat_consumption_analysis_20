import { Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';
import React, {Component} from 'react';
import {connect} from "react-redux";
import CountDown from "../../countdown";
import {Link} from "react-router-dom";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class userHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //display: ['none','none','none','none','none','none','none'],
      display: ['', '', '', '', '', '', '','',''],
      choose_num: 0,
      CompanyName: '临城中联福石水泥有限公司',
      collapsed: false,
    };
  }

  onCollapse = collapsed => {

    this.setState({ collapsed });
  };
  onChangeKey = (e) => {
    this.props.onChange(e.key);
  };
  render() {
    return (

      <div>
        <div className="logo" />
        <a className="head_icon col-md-8 col-sm-8" href="">
          <img src={require("../../img/logo.png")} alt=""/>
        </a>
        <Menu theme="light" defaultSelectedKeys={['0']} mode="horizontal"
              style={{lineHeight: '60px', float: 'right'}}
              onSelect={this.onChangeKey}>
          <Menu.Item ><Link to="/index" >返回首页</Link>
          </Menu.Item>
          <Menu.Item key="0">
            <Icon type="pie-chart" />
            <span>修改手机号</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>修改密码</span>
          </Menu.Item>
          <Menu.Item key="countDown">

            <CountDown/>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
