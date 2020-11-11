import React, {Component} from "react";
import Header from "../header/Header";
import ShowPic from "../showPic/ShowPic";
import Message from "../message/Message";
import Bottom from "../bottom/Bottom";
import Ibody from "../Ibody/Ibody";
import CountDown from "../../countdown";
import "./Home.css"
import {Card, Icon} from "antd";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeFlag: true
    }
    this.changeWindowFlag = this.changeWindowFlag.bind(this);
  }


  changeWindowFlag(e){
    this.setState({
      changeFlag: e
    })
  }
  renderUserMessage = () => {

    if (window.localStorage.token) {

      if (this.state.changeFlag){
        return (
          <div id="box">
            <Card hoverable title="上次离开时间及待办事项"
                  extra={<a onClick={()=>this.changeWindowFlag(false)}><Icon type="close-circle" theme="twoTone"/></a>} style={{width: 300}}>

              <p>{window.localStorage.LastLoginDate}</p>
              <p>{window.localStorage.todoList}</p>

            </Card>
          </div>
        );
      } else {
        return (
          <div></div>
        );
      }
    }
  }
    render(){

        return(
            <div>
                {/*<CountDown />*/}
              {
                this.renderUserMessage()
              }
                <Header floatWindowFlag = {this.state.changeFlag} onChange = {this.changeWindowFlag}/>

                <ShowPic floatWindowFlag = {this.state.changeFlag} onChange = {this.changeWindowFlag}/>
                <Ibody/>
                {/*<Message />*/}
                <Bottom />
            </div>
        )
    }
}