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
        const {data, date, tableName, setOldData,requestFlag,getCROData,model_data,model_data_CRO} = this.props;



            setOldData(date,tableName,deepCopy(model_data));
            getCROData(
                date,
                "CRO",
                deepCopy(model_data_CRO)
            );

    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, setOldData, getCROData, date,searchFlag } = nextProps; //新的props
        const {model_data,model_data_CRO} = this.props;

        if(this.props.date!= date){
            setOldData(moment(date).format("YYYY/MM/DD"),tableName,deepCopy(model_data));
            getCROData(
                moment(date).format("YYYY/MM/DD"),
                "CRO",
                deepCopy(model_data_CRO)
            );
        }
        if(this.props.searchFlag != searchFlag){
            setOldData(moment(date).format("YYYY/MM/DD"),tableName,deepCopy(model_data));
            getCROData(
              moment(date).format("YYYY/MM/DD"),
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
//定义映射model_data,model_data_CRO
const mapStateToProps = (state) => {
    return {
        //date:state.getIn(['KilnCAnaSumTable', 'date']),
        timeChose:state.getIn(['KilnCAnaSumTable', 'timeChose']),
        data:state.getIn(['KilnCAnaSumTable', 'data']),
        model_data:state.getIn(['KilnCAnaSumTable', 'model_data']),
        model_data_CRO:state.getIn(['KilnCAnaSumTable', 'model_data_CRO']),
        data_CRO:state.getIn(['KilnCAnaSumTable', 'data_CRO']),
        requestFlag:state.getIn(['KilnCAnaSumTable', 'requestFlag']),
        person:state.getIn(['KilnCAnaSumTable', 'person']),
        tableName:state.getIn(['KilnCAnaSumTable', 'tableName']),
        date:state.getIn(['searchTable', 'date']),
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