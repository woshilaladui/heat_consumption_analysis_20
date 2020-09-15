import React, {Component} from "react";
import Header from "../header/Header";
import ShowPic from "../showPic/ShowPic";
import Message from "../message/Message";
import Bottom from "../bottom/Bottom";
import CountDown from "../../countdown";

export default class Home extends Component {
    render(){
        return(
            <div>
                {/*<CountDown />*/}
                <Header />
                <ShowPic />
                <Message />
                <Bottom />
            </div>
        )
    }
}