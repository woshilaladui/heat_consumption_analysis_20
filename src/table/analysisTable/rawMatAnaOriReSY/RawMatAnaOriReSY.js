import React, {Component , Fragment} from 'react';
import ButtonComfirmBox from './components/ButtonComfirmBox';
import TimeShow from './components/TimeShow';
import UpperForm from './components/UpperForm';

import { Input } from 'antd';

import * as actionCreators from "../../analysisTable/rawMatAnaOriReSY/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

const { TextArea } = Input;

//原材料分析原始记录 砂岩
class BurnSysOpReSY extends Component{




    returnBack = () => {
        this.props.history.push("/");
    };


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


    render(){

        return(
            <Fragment >
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">砂岩原材料分析原始记录</h1>
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
                    {this.props.searchFlag ? (<ButtonComfirmBox />) : null}
                </div>
            </Fragment>
        )
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
       // date:state.getIn(['rawMatAnaOriReSY', 'date']),
        timeChose:state.getIn(['rawMatAnaOriReSY', 'timeChose']),
        data:state.getIn(['rawMatAnaOriReSY', 'data']),
        modelData:state.getIn(['rawMatAnaOriReSY', 'modelData']),
        requestFlag:state.getIn(['rawMatAnaOriReSY', 'requestFlag']),
        person:state.getIn(['rawMatAnaOriReSY', 'person']),
        tableName:state.getIn(['rawMatAnaOriReSY', 'tableName']),
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

export default connect(mapStateToProps, mapDispathToProps)(BurnSysOpReSY);