import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import "./TXSysAcRe.css";
import Remark from './components/Remark';
import {deepCopy} from "../../../Helper/Copy";
import * as actionCreators from "../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";

import moment from 'moment';

// 临城中联福石水泥有限公司脱硝系统行动记录
class RuYaoSLYCLHXFXBGD extends Component {

    returnBack = () => {
        this.props.history.push("/");
    };

    componentWillMount() {
    }

    componentDidMount() {
        const{data,date,tableName,requestFlag,getOldData} = this.props

        if(requestFlag){
            getOldData(
                date,
                tableName,
                deepCopy(data)
            );
        }//end if
    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, getOldData, searchdate } = nextProps; //新的props

        const modelData = [//定义该页面的数据模板 27
            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//0-7行代表 0-7小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//9-16行代表 8-15小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//18-25行代表 16-23小时
            {data: []},//下表
        ];

        if(oldSearchDate != searchdate){
            getOldData(moment(searchdate).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }


    render() {

        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">临城中联福石水泥有限公司脱硝系统行动记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow/>
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm/>
                        {/* 表单下部分 记录情况 */}
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

        date:state.getIn(['TXSysAcRe', 'date']),
        timeChose:state.getIn(['TXSysAcRe', 'timeChose']),
        data:state.getIn(['TXSysAcRe', 'data']),
        requestFlag:state.getIn(['TXSysAcRe', 'requestFlag']),
        person:state.getIn(['TXSysAcRe', 'person']),
        tableName:state.getIn(['TXSysAcRe', 'tableName']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        //和仓库建立联系
        getOldData(
            date,
            tableName,
            data
        ){
            dispatch(
                actionCreators.getData(date,tableName,data)
            );
        }
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGD);