import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/ShowTime";
import UpperForm from "./components/UpperForm";
import Remark from './components/Remark';
import "antd/dist/antd.css";
import * as actionCreators from "../RawFAnaRaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

//出磨生料荧光分析及配比记录
class RuYaoSLYCLHXFXBGD extends Component {

    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {upperDataFront, upperDataMiddle, upperDataLast, bottomData, requestFlag, date, t_name, setOldData, setOldStandard, startValue, endValue} = this.props;
        if (requestFlag) {
            const tempStartValue = deepCopy(startValue)//JSON.parse(JSON.stringify(startValue))
            const tempEndValue = deepCopy(endValue)//JSON.parse(JSON.stringify(endValue))
            const tempUpperDataFront = deepCopy(upperDataFront);
            const tempUpperDataMiddle = deepCopy(upperDataMiddle);
            const tempUpperDataLast = deepCopy(upperDataLast);
            const tempBottomData = deepCopy(bottomData);
            setOldStandard(tempStartValue, tempEndValue);
            setOldData(t_name, date, tempUpperDataFront, tempUpperDataMiddle, tempUpperDataLast, tempBottomData);
        }
    }

    render() {

        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">出磨生料荧光分析及配比记录</h1>
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
                        {/* 表单下班部分备注 */}
                        <Remark/>
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
        date: state.getIn(['RawFAnaRaRe', 'date']),
        timeChose: state.getIn(['RawFAnaRaRe', 'timeChose']),
        upperDataFront: state.getIn(['RawFAnaRaRe', 'upperDataFront']),
        upperDataMiddle: state.getIn(['RawFAnaRaRe', 'upperDataMiddle']),
        upperDataLast: state.getIn(['RawFAnaRaRe', 'upperDataLast']),
        requestFlag: state.getIn(['RawFAnaRaRe', 'requestFlag']),
        bottomData: state.getIn(['RawFAnaRaRe', 'bottomData']),
        startValue: state.getIn(['RawFAnaRaRe', 'startValue']),
        endValue: state.getIn(['RawFAnaRaRe', 'endValue']),
        person: state.getIn(['RawFAnaRaRe', 'person']),
        t_name: state.getIn(['RawFAnaRaRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName, date, upperDataFront, upperDataMiddle, upperDataLast, bottomData, startValue, endValue) {
            //  dispatch(actionCreators.getAllData(tableName,date,upperDataFront,upperDataMiddle,upperDataLast,bottomData,startValue,endValue))
            dispatch(actionCreators.getData(tableName, date, upperDataFront, upperDataMiddle, upperDataLast, bottomData))
        },
        setOldStandard(startValue, endValue) {

            dispatch(actionCreators.getOldStandard('CRM', startValue, endValue))
        }
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGD);