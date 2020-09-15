import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import * as actionCreators from "../RYRawMatCheAnaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

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

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, setOldData, searchdate } = nextProps; //新的props

        const modelData = [//定义该页面的数据模板 30
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
            {data: []},//0点班的平均
            {data: []},//0点班的合格率

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
            {data: []},//8点班的平均
            {data: []},//8点班的合格率

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
            {data: []},//16点班的平均
            {data: []},//16点班的合格率

        ];

        if(oldSearchDate != searchdate){
            setOldData(moment(searchdate).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
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
                    {this.props.searchFlag ? (<ButtonConfirmationBox />) : null}
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
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
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