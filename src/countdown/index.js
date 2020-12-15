import { Statistic } from 'antd';
import React, { Component } from 'react';
import * as actionCreators from "./store/actionCreators";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
const { Countdown } = Statistic;


const t2 =new Date(window.localStorage.expiration)//过期时间
const t4 = new Date();//当前时间

// const deadline = Date.now() + Math.floor((t2-t4)/1000)*1000 ; // 倒计时一个小时
const deadline = Date.now() + 15*1000 ; // 倒计时一个小时

class CountDown extends Component{
    onFinish=()=> {
    this.props.handleChangeFlag();
      this.props.history.push('/');
      window.location.reload();
      window.localStorage.clear()
  };
  render() {
   return(

     <Countdown title="登陆有效时间" value={t2} onFinish={this.onFinish} />
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
export default connect(mapStateToProps, mapDispathToProps)(withRouter(CountDown));



