import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/Upperform";

import * as actionCreators from "../RawMatCheAnaReSY/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

// 进厂砂岩原材料分析化学报告单
class RuYaoSLYCLHXFXBGDSY extends Component {

    /**onRef控制子组件提交表单**/
    onRef = ref => {

    };

    /**点击提交数据**/
    handleSubmit = () => {

    };

    /**
     * 响应班次变化
     **/
    handleTimeChose(x) {

    }

    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        const {data, date, tableName, setOldData,modelData} = this.props;

        setOldData(date,tableName,deepCopy(modelData));
    }

    componentWillReceiveProps(nextProps) {
        const {tableName, setOldData, date, searchFlag} = nextProps; //新的props
        const {modelData} = this.props;


        if (this.props.date != date) {
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
        if (this.props.searchFlag != searchFlag) {
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }

    render() {

        return (
          <Fragment /*style={{width: "100%", height: "100%"}}*/>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">进厂砂岩原材料分析化学报告单</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow
                        // person={this.state.person}
                        // handleTimeChose={this.handleTimeChose.bind(this)}
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
        //date:state.getIn(['RawMatCheAnaReSY', 'date']),
        timeChose:state.getIn(['RawMatCheAnaReSY', 'timeChose']),
        data:state.getIn(['RawMatCheAnaReSY', 'data']),
        modelData:state.getIn(['RawMatCheAnaReSY', 'modelData']),
        requestFlag:state.getIn(['RawMatCheAnaReSY', 'requestFlag']),
        person:state.getIn(['RawMatCheAnaReSY', 'person']),
        tableName:state.getIn(['RawMatCheAnaReSY', 'tableName']),
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
export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGDSY);