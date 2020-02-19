import React, {Component} from 'react';
import "./Message.css";

export default class Message extends Component{
    render(){
        return(
            <div className = "imessage">
                <div className = "column1">公司简介</div>
                <div className = "column2">水泥生产</div>
                <div className = "column3">能耗分析</div>
            </div>
        );
    }
}