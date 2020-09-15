import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/UpperForm";
import Remark from './components/Remark';
import "antd/dist/antd.css";
import * as actionCreators from "../RawFAnaRaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

//出磨生料荧光分析及配比记录
class RuYaoSLYCLHXFXBGD extends Component {

    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/


        const{data,date,tableName,requestFlag,getOldData,upperDataFront,upperDataLast,getFrontOldData,getLastOldData} = this.props

        if(requestFlag){
            getOldData(
                date,
                tableName,
                deepCopy(data)
            );

            //出磨生料荧光分析及配比记录
            getFrontOldData(
                date,
                "CRM",
                deepCopy(upperDataFront)
            );

            //控制室原始记录
            getLastOldData(
                date,
                "CRO",
                deepCopy(upperDataLast)
            );


        }//end if


    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, getOldData, getFrontOldData, getLastOldData, searchdate } = nextProps; //新的props

        const model_upperDataFront = [//表的前半段，SiO2~IM(P)

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []}
        ];

        const model_data = [//定义该页面的数据模板 27
            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//0-7行代表 0-7小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//9-16行代表 8-15小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//18-25行代表 16-23小时
            {data: []},//下表
        ];

        const model_upperDataLast = [
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},



            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},


            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
        ];

        if(oldSearchDate != searchdate){
            getOldData(moment(searchdate).format("YYYY/MM/DD"),tableName,deepCopy(model_data));

            //出磨生料荧光分析及配比记录
            getFrontOldData(moment(searchdate).format("YYYY/MM/DD"),"CRM",deepCopy(model_upperDataFront));

            //控制室原始记录
            getLastOldData(moment(searchdate).format("YYYY/MM/DD"),"CRO",deepCopy(model_upperDataLast));
        }
    }

    render() {

        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">出磨生料荧光分析及配比记录</h1>
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
                        {/* 表单下班部分备注 */}
                        <Remark/>
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
        date:state.getIn(['RawFAnaRaRe', 'date']),
        timeChose:state.getIn(['RawFAnaRaRe', 'timeChose']),
        data:state.getIn(['RawFAnaRaRe', 'data']),
        upperDataFront: state.getIn(['RawFAnaRaRe', 'upperDataFront']),
        upperDataLast: state.getIn(['RawFAnaRaRe', 'upperDataLast']),
        requestFlag:state.getIn(['RawFAnaRaRe', 'requestFlag']),
        startValue: state.getIn(['RawFAnaRaRe', 'startValue']),
        endValue: state.getIn(['RawFAnaRaRe', 'endValue']),
        person:state.getIn(['RawFAnaRaRe', 'person']),
        tableName:state.getIn(['RawFAnaRaRe', 'tableName']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        getOldData(
            date,
            tableName,
            data
        ){
            dispatch(
                actionCreators.getData(date,tableName,data)
            );
        },

        getFrontOldData(
            date,
            tableName,
            data
        ){
            dispatch(actionCreators.getFrontData(
                date,
                tableName,
                data
            ));
        },

        getLastOldData(
            date,
            tableName,
            data
        ){
            dispatch(actionCreators.getLastData(
                date,
                tableName,
                data
            ));
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGD);