import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './Header.css';
import {Link} from "react-router-dom";
import {URL} from "../../http/constant/Constant";
import {requestLogout} from "../../http/request/RequestUser";
import CountDown from '../../../src/countdown'
import * as actionCreators from "./store/actionCreators";
import _log from "../../Constant/Console";
import {connect} from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choose_num: 0,
      CompanyName: '临城中联福石水泥有限公司',
      needLogin: true,  //根据登录信息，切换登录与注销按钮
      showItem: 'none',  //是否显示表格相关按钮
      showPermissionCtr:'none', //是否显示权限管理按钮
      showLoginTime:'none' //是否展示登陆时长

    };
  }

  componentDidMount = () => {
    // console.log("console"+window.localStorage.department)
    //将时间戳转变为毫秒数进行比较，若过期时间则退出登陆
    if (this.dateChangeMs(window.localStorage.expiration)<=new Date().getTime()){
      window.localStorage.clear()
    }

    if(window.localStorage.id == 1){
      this.setState({
        showPermissionCtr: ''
      })
    }
    const d = new Date();
    const time = parseInt((d.getTime() - window.localStorage.time) / 60000);
    // if (time > 720) {
    //     window.localStorage.clear();
    //     this.setState({
    //         needLogin: true,
    //         showItem: 'none',
    //     })
    // }
    // else
    if (window.localStorage.token) {
      this.setState({
        needLogin: false,
        showItem: '',


      })
      // console.log(window.localStorage.countDownTimeFlag)
      // console.log(!window.localStorage.countDownTimeFlag)
      // console.log(window.localStorage.countDownTimeFlag === 'false')
      if(window.localStorage.countDownTimeFlag == 'false'){

        this.setState({
          showLoginTime:''//是否展示登陆时长


        })
      }else {
        this.handleLogout()
      }

    }
  }
  handleLogin = () => {
    this.props.setFloatWindow(true)
    // window.location.href = '/loginV2'
  };
  handleLogout = () => {
    // window.localStorage.clear();
    this.setState({
      showItem: 'none',
      needLogin: 'true',
      showPermissionCtr:'none',
      showLoginTime:'none'
    });
    this.props.onChange(false)

    // console.log("this.props.floatWindowFlag")
    // console.log(this.props.floatWindowFlag)
    // console.log("this.props.floatWindowFlag")
    requestLogout()
      .then(response =>{
        // console.log(response)
        if (response["code"] == 0){
          console.log("token"+response["data"])
          // window.localStorage.token = response["data"];
          window.localStorage.clear();
        }
      })
  };
//实现方法
   dateChangeMs (date) {
    let result = new Date(date).getTime();
    return result;
  }
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
          <Menu.Item className='header_menuItem submenu-title-wrapper' key="permission" style={{display: this.state.showPermissionCtr}}>
            <Link to="/permission">
              <Icon type="setting"/> 权限控制
            </Link>
          </Menu.Item>
          <Menu.Item className='header_menuItem' key="table" style={{display: this.state.showItem}}>
            <Link to="/table">
              <Icon type="table"/>表格相关
            </Link>
          </Menu.Item>
          <Menu.Item className='header_menuItem' key="feedback" style={{display: this.state.showItem}}>
            <Link to="/feedback">
              <Icon type="mail"/>系统反馈
            </Link>
          </Menu.Item>
          {
            this.state.needLogin ?
              <Menu.Item className='header_menuItem' key="login"
                // onClick={this.handleLogin}
              >
                <Link to="/loginV2">
                  <Icon type="login"/>登录
                </Link>
              </Menu.Item> :
              <Menu.Item className='header_menuItem' key="logout"
                         onClick={this.handleLogout}>
                <Icon type="logout"/>注销
              </Menu.Item>
          }

          <Menu.Item className='header_menuItem' key="people" style={{display: this.state.showItem}}>
            <Link to="/user">
              <Icon type="user"/>{window.localStorage.username}
            </Link>

          </Menu.Item>
          {
            <Menu.Item className='header_menuItem' key="" style={{display:this.state.showLoginTime}}>
              <CountDown />
            </Menu.Item>
          }
        </Menu>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    // date:state.getIn(['countDown', 'countDownFlag']),
    floatWindowFlag:state.getIn(['homePageHeader','floatWindowFlag'])
  }
};

const mapDispathToProps = (dispatch) => {
  return {

  }//end return
};

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(Header);