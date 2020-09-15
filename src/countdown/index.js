import { Statistic, Row, Col } from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {handleChangeFlag} from "./store/actionCreators";
const { Countdown } = Statistic;


const t2 =new Date(window.localStorage.expiration)//过期时间
const t4 = new Date();//当前时间

const deadline = Date.now() + Math.floor((t2-t4)/1000)*1000 ; // 倒计时一个小时
// const deadline = Date.now() + 15*1000 ; // 倒计时一个小时
console.log("t2"+t2)
console.log("t4"+t4)

class CountDown extends Component{
    onFinish=()=> {
    this.props.handleChangeFlag();
    window.location.href='/'
  };
  render() {
   return(

     <Countdown title="登陆有效时间" value={deadline} onFinish={this.onFinish} />
   )
  }
}


const mapStateToProps = (state) => {
  return {
    date:state.getIn(['countDown', 'date']),
  }
};

const mapDispathToProps = (dispatch) => {
  return {
    handleChangeFlag(){
      dispatch(actionCreators.handleChangeFlag())
    },
  }//end return
};

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(CountDown);



