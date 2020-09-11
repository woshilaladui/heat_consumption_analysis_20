import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import Remark from './components/Remark';
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";

import moment from 'moment';

// 在线自动检测运行记录(排放物)
class OnlineAutoDetOpRe extends Component {
    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        const {data, date, tableName, setOldData,requestFlag} = this.props;

        if(requestFlag){


            setOldData(date,tableName,deepCopy(data));
        }
    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, setOldData, searchdate } = nextProps; //新的props

        const modelData = [//表的前半段 21

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}
        ]

        if(oldSearchDate != searchdate){
            setOldData(moment(searchdate).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }


    render() {
        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">在线自动检测运行记录(排放物)</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm />
                        {/* 表单下部分备注框 */}
                        <Remark />
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    {this.props.searchFlag ? (<ButtonConfirmationBox />) : null}
                </div>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

        date:state.getIn(['onlineAutoDetOpRe', 'date']),
        timeChose:state.getIn(['onlineAutoDetOpRe', 'timeChose']),
        data:state.getIn(['onlineAutoDetOpRe', 'data']),
        requestFlag:state.getIn(['onlineAutoDetOpRe', 'requestFlag']),
        person:state.getIn(['onlineAutoDetOpRe', 'person']),
        tableName:state.getIn(['onlineAutoDetOpRe', 'tableName']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        }
    }//end return
}
export default connect(mapStateToProps, mapDispathToProps)(OnlineAutoDetOpRe);