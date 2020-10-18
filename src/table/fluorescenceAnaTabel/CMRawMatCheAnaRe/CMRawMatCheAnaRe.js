import React, {Component, Fragment} from "react";
import UpperForm from "./components/UpperForm";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import "antd/dist/antd.css";

import * as actionCreators from "../CMRawMatCheAnaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

// 出磨生料化学分析报告单
class CMRawMatCheAnaRe extends Component {



    componentWillMount() {

    }

    componentDidMount() {
        const {data, date, tableName, setOldData,modelData} = this.props;

        setOldData(date,tableName,deepCopy(modelData));

    }

    componentWillReceiveProps(nextProps){
        const { tableName, setOldData, date,searchFlag } = nextProps; //新的props
        const {modelData} = this.props;


        if(this.props.date != date){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
        if(this.props.searchFlag != searchFlag){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }




    render() {
        return (
            <Fragment >
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">出磨生料化学分析报告单</h1>
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
        //date:state.getIn(['CMRawMatCheAnaRe', 'date']),
        timeChose:state.getIn(['CMRawMatCheAnaRe', 'timeChose']),
        data:state.getIn(['CMRawMatCheAnaRe', 'data']),
        modelData:state.getIn(['CMRawMatCheAnaRe', 'modelData']),
        requestFlag:state.getIn(['CMRawMatCheAnaRe', 'requestFlag']),
        person:state.getIn(['CMRawMatCheAnaRe', 'person']),
        tableName:state.getIn(['CMRawMatCheAnaRe', 'tableName']),
        date:state.getIn(['searchTable', 'date']),
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