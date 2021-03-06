import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/Upperform";
import "antd/dist/antd.css";

import * as actionCreators from "../RawMatCheAnaReTF/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

// 进厂原材料分析化学报告单（铁粉）
class RuYaoSLYCLHXFXBGDTF extends Component {


    /**onRef控制子组件提交表单**/
    onRef = ref => {

    };





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


    render() {
        return (

          <Fragment /*style={{width: "100%", height: "100%"}}*/>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">进厂铁粉原材料分析化学报告单</h1>

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
        //date:state.getIn(['RawMatCheAnaReTF', 'date']),
        timeChose:state.getIn(['RawMatCheAnaReTF', 'timeChose']),
        data:state.getIn(['RawMatCheAnaReTF', 'data']),
        modelData:state.getIn(['RawMatCheAnaReTF', 'modelData']),
        requestFlag:state.getIn(['RawMatCheAnaReTF', 'requestFlag']),
        person:state.getIn(['RawMatCheAnaReTF', 'person']),
        tableName:state.getIn(['RawMatCheAnaReTF', 'tableName']),
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

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGDTF);