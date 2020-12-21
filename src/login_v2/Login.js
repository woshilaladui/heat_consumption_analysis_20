import React, {Component} from 'react';
import {Form, Icon, Input, Button, message, Layout, InputNumber,} from 'antd';
import { URL} from "../http/constant/Constant";
import {Link} from "react-router-dom";
// import Login from 'ant-design-pro/lib/Login';
// import moment from 'moment';
// import Header from "../homePage/header/Header";
import './Login.css'
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {deepCopy} from '../Helper/Copy'
import {requestUserLogin} from "../../src/http/request/RequestUser"
import {requestGetHuaYanShiDataByTableNameAndDate} from "../../src/http/request/RequestHuaYanShi"
import {Service} from "../http/constant/ServiceConstant";


const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;

//新登陆页面参数
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
class LoginDemo extends Component {

  componentWillMount(){
    this.props.getVerificationPhoto(); 
  }


  handleLogin = (e) => {
    e.preventDefault();

    const {phone, password,verificationCode} = this.props;
    this.props.setOldData(phone, password,verificationCode,this.props);
  };


  handleChangePhone = (e) => {


    this.props.changePhoneNum(e.target.value);
  };
  handleChangeVerificationCode = (e) => {


    this.props.changePhoneVerificationCode(e.target.value);
  };

  handleChangePassword = (e) => {

    this.props.changePasswordNum(e.target.value);
  };

  render() {

    Input.defaultProps = {
      disabled:!this.props.searchFlag,
      style:this.props.searchFlag ? { } : {opacity:"1",color:"black"},
    }

    InputNumber.defaultProps = {
      disabled:!this.props.searchFlag,
      style:this.props.searchFlag ? { } : {opacity:"1",color:"black"},
    }


    const {phone, password,verificationCode} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleLogin} className="login-form">
          <FormItem>
            <h2 id='pleaseLogin'>欢迎登录</h2>
            {getFieldDecorator('phone', {
              rules: [{required: true, message: '请输入注册用户名!'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="请输入注册手机号" setFieldsValue={phone} onChange={this.handleChangePhone}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码!'},
                {min: 6, message: '请输入6位以上密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="请输入密码" setFieldsValue={password} onChange={this.handleChangePassword}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('verificationCode', {
              rules: [{required: true, message: '请输入验证码!'},],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="请输入验证码"  onChange={this.handleChangeVerificationCode}/>
            )}
          </FormItem>
          <img  id="verificationImg" alt="图片" onClick={this.props.getVerificationPhoto} />
          <div>
            <a>看不清？点一下图片</a>
          </div>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Link to='index'>返回首页</Link>
          </FormItem>
        </Form>
        <Footer style={{textAlign: 'center'}} className="footer">
          SmartLab Design ©2018 Powered By 武汉理工大学智能技术实验室
        </Footer>

      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginDemo);

const mapStateToProps = (state) => {
  return {
    date:state.getIn(['loginV2', 'date']),
    phone:state.getIn(['loginV2', 'phone']),
    password:state.getIn(['loginV2', 'password']),
    verificationCode:state.getIn(['loginV2', 'verificationCode']),
    verificationPhoto:state.getIn(['loginV2', 'verificationPhoto']),
    searchFlag:state.getIn(['searchTable', 'searchFlag']),

  }
};

const mapDispathToProps = (dispatch) => {
  return {
    setOldData(phone,password,verificationCode,props){
      dispatch(actionCreators.getData(phone,password,verificationCode,props))
    },
    changePhoneNum(phoneNum){
      dispatch(actionCreators.changePhone(phoneNum))
    },
    changePasswordNum(passwordNum){
      dispatch(actionCreators.changePassword(passwordNum))
    },
    changePhoneVerificationCode(code){
      dispatch(actionCreators.changePhoneVerificationCode(code))
    },
    getVerificationPhoto(){
      dispatch(actionCreators.getVerificationPhoto())
    }
  }//end return
};

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(WrappedNormalLoginForm);

