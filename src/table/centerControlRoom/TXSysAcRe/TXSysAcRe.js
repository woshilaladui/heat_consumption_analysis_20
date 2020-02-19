import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import "./TXSysAcRe.css";
import Remark from './components/Remark';
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";
import * as actionCreators from "../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";

// 临城中联福石水泥有限公司脱硝系统行动记录
class RuYaoSLYCLHXFXBGD extends Component {

    returnBack = () => {
        this.props.history.push("/");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
        checkAuthority(URL.HUAYS_CHECK)
            .then((response) => {
                if (response === Mark.ERROR) {
                    this.props.history.push('/');
                }
            })
            .catch()
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {upperData, bottomData, date, t_name, setOldData, requestFlag} = this.props;
        if (requestFlag) {
            setOldData(t_name, date, upperData, bottomData);
        }
    }

    render() {

        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">临城中联福石水泥有限公司脱硝系统行动记录</h1>
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
                        {/* 表单下部分 记录情况 */}
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
        date: state.getIn(['TXSysAcRe', 'date']),
        timeChose: state.getIn(['TXSysAcRe', 'timeChose']),
        upperData: state.getIn(['TXSysAcRe', 'upperData']),
        bottomData: state.getIn(['TXSysAcRe', 'bottomData']),
        requestFlag: state.getIn(['TXSysAcRe', 'requestFlag']),
        person: state.getIn(['TXSysAcRe', 'person']),
        t_name: state.getIn(['TXSysAcRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName, date, upperData, bottomData) {
            dispatch(actionCreators.getData(tableName, date, upperData, bottomData))
        }
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(RuYaoSLYCLHXFXBGD);