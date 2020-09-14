import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import { Input } from 'antd';
import * as actionCreators from "../fluoAnaAndDetRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import Remark from "./components/Remark";

import moment from 'moment';

const { TextArea } = Input;

// 熟料荧光分析及检测记录
class FluoAnaAndDetRe extends Component {
    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {}

    componentDidMount() {
        const{data,date,tableName,requestFlag,getOldData,upperDataFront,upperDataLast,getFrontOldData,getLastOldData} = this.props

        if(requestFlag){
            getOldData(
                date,
                tableName,
                deepCopy(data)
            );

            //出窑熟料全分析汇总表
            getFrontOldData(
                date,
                "KAS",
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

            const model_upperDataFront = [//表的前半段，SiO2~IM(P)  从出窑熟料全分析汇总表

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []}
            ]; //上表的数据

            const model_data = [//从T16 原始记录中的下表中获取 立升重g/l
                {data: []}, //0点班的备注
                {data: []}, //8点半的备注
                {data: []}, //16点班的备注

            ];

            const model_upperDataLast = [//上表 fCao 从荧光的原始记录的上表中获取
                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},

                {data: []}, {data: []}, {data: []}, {data: []},//0点班


                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},

                {data: []}, {data: []}, {data: []}, {data: []},//8点班

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},

                {data: []}, {data: []}, {data: []}, {data: []},//16点班
            ];

            if(oldSearchDate != searchdate){

                getOldData(moment(searchdate).format("YYYY/MM/DD"),tableName,deepCopy(model_data));

                getFrontOldData(moment(searchdate).format("YYYY/MM/DD"),"KAS",deepCopy(model_upperDataFront));

                getLastOldData(moment(searchdate).format("YYYY/MM/DD"),"CRO",deepCopy(model_upperDataLast));

            }
        }

    render() {
        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">熟料荧光分析及检测记录</h1>
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

        date:state.getIn(['fluoAnaAndDetRe', 'date']),
        timeChose:state.getIn(['fluoAnaAndDetRe', 'timeChose']),
        data:state.getIn(['fluoAnaAndDetRe', 'data']),
        upperDataFront: state.getIn(['fluoAnaAndDetRe', 'upperDataFront']),
        upperDataLast: state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
        requestFlag:state.getIn(['fluoAnaAndDetRe', 'requestFlag']),
        person:state.getIn(['fluoAnaAndDetRe', 'person']),
        tableName:state.getIn(['fluoAnaAndDetRe', 'tableName']),
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

export default connect(mapStateToProps, mapDispathToProps)(FluoAnaAndDetRe);
