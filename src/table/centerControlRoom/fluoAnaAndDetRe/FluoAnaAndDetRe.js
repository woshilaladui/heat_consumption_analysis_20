import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";

import { Input } from 'antd';
import * as actionCreators from "../fluoAnaAndDetRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

import Remark from "./components/Remark";

const { TextArea } = Input;

// 熟料荧光分析及检测记录
class FluoAnaAndDetRe extends Component {
    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {}

    componentDidMount() {
        const {upperDataFront,upperDataLast,bottomData,requestFlag, date, t_name,upperDataLSZ, setOldData} = this.props;
        if(requestFlag){
            const tempUpperDataFront = deepCopy(upperDataFront);
            const tempUpperDataLast = deepCopy(upperDataLast);
            const tempUpperDataLSZ = deepCopy(upperDataLSZ);
            const tempBottomData = deepCopy(bottomData)

            setOldData(t_name,date,tempUpperDataFront,tempUpperDataLast,tempBottomData,tempUpperDataLSZ);
        }
    }

    render() {
        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">熟料荧光分析及检测记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow/>


                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm/>
                        {/* 表单下部分备注框 */}
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
                    <ButtonConfirmationBox/>
                </div>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['fluoAnaAndDetRe', 'date']),
        timeChose:state.getIn(['fluoAnaAndDetRe', 'timeChose']),
        upperDataFront:state.getIn(['fluoAnaAndDetRe', 'upperDataFront']),
        upperDataLast:state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
        upperDataLSZ:state.getIn(['fluoAnaAndDetRe', 'upperDataLSZ']),
        requestFlag:state.getIn(['fluoAnaAndDetRe', 'requestFlag']),
        bottomData:state.getIn(['fluoAnaAndDetRe', 'bottomData']),
        person:state.getIn(['fluoAnaAndDetRe', 'person']),
        t_name:state.getIn(['fluoAnaAndDetRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName,date,upperDataFront,upperDataLast,bottomData,upperDataLSZ){
            dispatch(actionCreators.getData(tableName,date,upperDataFront,upperDataLast,bottomData,upperDataLSZ))

        },
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(FluoAnaAndDetRe);
