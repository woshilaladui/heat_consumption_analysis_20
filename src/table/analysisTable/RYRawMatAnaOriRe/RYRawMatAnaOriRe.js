import React, {Component , Fragment} from 'react';
import ButtonComfirmBox from './components/ButtonComfirmBox';
import TimeShow from './components/ShowTime';
import UpperForm from './components/UpperForm';
import { Input } from 'antd';

import * as actionCreators from "../../analysisTable/RYRawMatAnaOriRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

const { TextArea } = Input;

//入窑生料分析原始记录
class RYRawMatAnaOriRe extends Component{


    returnBack = () => {
        this.props.history.push("/index");
    };


    componentWillMount() {

    }

    componentDidMount() {
        const {data, date, tableName, setOldData,requestFlag} = this.props;

        if(requestFlag){

            setOldData(date,tableName,deepCopy(data));
        }
    }


    render(){
        return(
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">入窑生料分析原始记录</h1>
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
                    <ButtonComfirmBox

                    />
                </div>
            </Fragment>
        )
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['RYRawMatAnaOriRe', 'date']),
        timeChose:state.getIn(['RYRawMatAnaOriRe', 'timeChose']),
        data:state.getIn(['RYRawMatAnaOriRe', 'data']),
        requestFlag:state.getIn(['RYRawMatAnaOriRe', 'requestFlag']),
        person:state.getIn(['RYRawMatAnaOriRe', 'person']),
        tableName:state.getIn(['RYRawMatAnaOriRe', 'tableName']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(RYRawMatAnaOriRe);