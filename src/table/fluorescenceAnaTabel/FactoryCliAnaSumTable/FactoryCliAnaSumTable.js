import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import * as actionCreators from "../../fluorescenceAnaTabel/FactoryCliAnaSumTable/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";
// 出厂熟料全分析汇总表
class CMRawMatCheAnaRe extends Component {


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




    render() {

        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">出厂熟料全分析汇总表</h1>
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
                    <ButtonConfirmationBox

                    />
                </div>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['FactoryCliAnaSumTable', 'date']),
        timeChose:state.getIn(['FactoryCliAnaSumTable', 'timeChose']),
        data:state.getIn(['FactoryCliAnaSumTable', 'data']),
        data_CRO:state.getIn(['FactoryCliAnaSumTable', 'data_CRO']),
        requestFlag:state.getIn(['FactoryCliAnaSumTable', 'requestFlag']),
        person:state.getIn(['FactoryCliAnaSumTable', 'person']),
        tableName:state.getIn(['FactoryCliAnaSumTable', 'tableName']),
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
