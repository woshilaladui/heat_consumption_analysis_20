import React, {Component, Fragment} from 'react';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import Remark from './component/Remark';
import * as actionCreators from "../ruYSLYGFXJL/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

//入窑生料荧光分析及检测记录
class RuYSLYGFXJL extends Component{

    componentDidMount() {

        const{date,tableName,requestFlag,getOldData,getFrontOldData,getLastOldData,model_data,model_upperDataFront,model_upperDataLast} = this.props

            getOldData(
                date,
                tableName,
                deepCopy(model_data)
            );

            //入窑生料化学分析报告单
            getFrontOldData(
                date,
                "RMC",
                deepCopy(model_upperDataFront)
            );

            //控制室原始记录
            getLastOldData(
                date,
                "CRO",
                deepCopy(model_upperDataLast)
            );

    }

    componentWillReceiveProps(nextProps){
        const { tableName, getOldData, getFrontOldData, getLastOldData, date, searchFlag, } = nextProps; //新的props

        const { model_data,model_upperDataFront,model_upperDataLast,data } = this.props;

        if(this.props.date != date){
            // console.log("执行了date")
            getOldData(
              moment(date).format("YYYY/MM/DD"),
              tableName,
              deepCopy(model_data)
            );

            //入窑生料化学分析报告单
            getFrontOldData(
              moment(date).format("YYYY/MM/DD"),
              "RMC",
              deepCopy(model_upperDataFront)
            );

            //控制室原始记录
            getLastOldData(
              moment(date).format("YYYY/MM/DD"),
              "CRO",
              deepCopy(model_upperDataLast)
            );
        }

        if(this.props.searchFlag != searchFlag){
            getOldData(
              moment(date).format("YYYY/MM/DD"),
              tableName,
              deepCopy(model_data)
            );

            //入窑生料化学分析报告单
            getFrontOldData(
              moment(date).format("YYYY/MM/DD"),
              "RMC",
              deepCopy(model_upperDataFront)
            );

            //控制室原始记录
            getLastOldData(
              moment(date).format("YYYY/MM/DD"),
              "CRO",
              deepCopy(model_upperDataLast)
            );          }

        //新的props

    }

    render(){
        return(
            <Fragment>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">入窑生料荧光分析及检测记录</h1>
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
                        {/* 表单下班部分备注 */}
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
                    {this.props.searchFlag ? (<ButtonComfirmBox />) : null}

                </div>
            </Fragment>
        )
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

       // date:state.getIn(['ruYSLYGFXJL', 'date']),
        timeChose:state.getIn(['ruYSLYGFXJL', 'timeChose']),
        data:state.getIn(['ruYSLYGFXJL', 'data']),
        upperDataFront: state.getIn(['ruYSLYGFXJL', 'upperDataFront']),
        model_data: state.getIn(['ruYSLYGFXJL', 'model_data']),
        model_upperDataFront: state.getIn(['ruYSLYGFXJL', 'model_upperDataFront']),
        model_upperDataLast: state.getIn(['ruYSLYGFXJL', 'model_upperDataLast']),
        upperDataLast: state.getIn(['ruYSLYGFXJL', 'upperDataLast']),
        requestFlag:state.getIn(['ruYSLYGFXJL', 'requestFlag']),
        person:state.getIn(['ruYSLYGFXJL', 'person']),
        tableName:state.getIn(['ruYSLYGFXJL', 'tableName']),
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
}

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

export default connect(mapStateToProps, mapDispathToProps)(RuYSLYGFXJL);