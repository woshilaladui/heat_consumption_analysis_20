
import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import * as actionCreators from "../RYRawMatCheAnaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

// 入窑生料化学分析报告单
class CMRawMatCheAnaRe extends Component {


    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {

        const {data, date, tableName, setOldData,requestFlag} = this.props;

        if(requestFlag){

            setOldData(date,tableName,deepCopy(data));
        }
    }






    render() {
        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">入窑生料化学分析报告单</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow

                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm

                        />
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    <ButtonConfirmationBox

                    />
                </div>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['RYRawMatCheAnaRe', 'date']),
        timeChose:state.getIn(['RYRawMatCheAnaRe', 'timeChose']),
        data:state.getIn(['RYRawMatCheAnaRe', 'data']),
        requestFlag:state.getIn(['RYRawMatCheAnaRe', 'requestFlag']),
        person:state.getIn(['RYRawMatCheAnaRe', 'person']),
        tableName:state.getIn(['RYRawMatCheAnaRe', 'tableName']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(CMRawMatCheAnaRe);