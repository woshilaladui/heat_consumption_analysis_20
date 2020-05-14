import React, {Component, Fragment} from 'react';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import Remark from './component/Remark';
import * as actionCreators from "../ruYSLYGFXJL/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";
//入窑生料荧光分析及检测记录
class RuYSLYGFXJL extends Component{

    componentDidMount() {

        const{data,date,tableName,requestFlag,getOldData,upperDataFront,upperDataLast,getFrontOldData,getLastOldData} = this.props

        if(requestFlag){
            getOldData(
                date,
                tableName,
                deepCopy(data)
            );

            //入窑生料化学分析报告单
            getFrontOldData(
                date,
                "RMC",
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
                    <ButtonComfirmBox/>
                </div>
            </Fragment>
        )
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

        date:state.getIn(['ruYSLYGFXJL', 'date']),
        timeChose:state.getIn(['ruYSLYGFXJL', 'timeChose']),
        data:state.getIn(['ruYSLYGFXJL', 'data']),
        upperDataFront: state.getIn(['ruYSLYGFXJL', 'upperDataFront']),
        upperDataLast: state.getIn(['ruYSLYGFXJL', 'upperDataLast']),
        requestFlag:state.getIn(['ruYSLYGFXJL', 'requestFlag']),
        person:state.getIn(['ruYSLYGFXJL', 'person']),
        tableName:state.getIn(['ruYSLYGFXJL', 'tableName']),


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