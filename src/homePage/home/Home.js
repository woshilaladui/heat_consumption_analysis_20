import React, {Component} from "react";
import Header from "../header/Header";
import ShowPic from "../showPic/ShowPic";
import Message from "../message/Message";
import Bottom from "../bottom/Bottom";
import CountDown from "../../countdown";
import "./Home.css"

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
    render(){
        return(
            <div>
                {/*<CountDown />*/}

                <Header floatWindowFlag = {this.state.changeFlag} onChange = {this.changeWindowFlag}/>

                <ShowPic floatWindowFlag = {this.state.changeFlag} onChange = {this.changeWindowFlag}/>
                <Message />
                <Bottom />
            </div>
        )
    }
}