import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import * as actionCreators from "../../fluorescenceAnaTabel/KilnCAnaSumTable/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

// 出窑熟料全分析汇总表
class CMRawMatCheAnaRe extends Component {

    returnBack = () => {
        this.props.history.push("/");
    };


    componentWillMount() {

    }

    componentDidMount() {
        const {data, date, tableName, setOldData,requestFlag,getCROData,data_CRO} = this.props;

        if(requestFlag){

            setOldData(date,tableName,deepCopy(data));
            getCROData(
                date,
                "CRO",
                deepCopy(data_CRO)
            );
        }
    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, setOldData, getCROData, searchdate } = nextProps; //新的props

        const model_data = [//定义该页面的数据模板 30
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

        const model_data_CRO = [

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},//均值 比值 合格率
            {data: []}, {data: []}, {data: []}, {data: []},//下表数据

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
        ];

        if(oldSearchDate != searchdate){
            setOldData(moment(searchdate).format("YYYY/MM/DD"),tableName,deepCopy(model_data));
            getCROData(
                moment(searchdate).format("YYYY/MM/DD"),
                "CRO",
                deepCopy(model_data_CRO)
            );
        }
    }


    render() {

        return (
          <Fragment /*style={{width: "100%", height: "100%"}}*/>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">出窑熟料全分析汇总表</h1>
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
        date:state.getIn(['KilnCAnaSumTable', 'date']),
        timeChose:state.getIn(['KilnCAnaSumTable', 'timeChose']),
        data:state.getIn(['KilnCAnaSumTable', 'data']),
        data_CRO:state.getIn(['KilnCAnaSumTable', 'data_CRO']),
        requestFlag:state.getIn(['KilnCAnaSumTable', 'requestFlag']),
        person:state.getIn(['KilnCAnaSumTable', 'person']),
        tableName:state.getIn(['KilnCAnaSumTable', 'tableName']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        },
        getCROData(
            date,
            tableName,
            data
        ){
            dispatch(actionCreators.get_CRO_Data(date,tableName,data))
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(CMRawMatCheAnaRe);