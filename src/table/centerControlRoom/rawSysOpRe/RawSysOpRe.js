import React, {Component} from 'react';
import ButtonConfirmationBox from './components/ButtonConfirmBox';
import TimeShow from './components/TimeShow';
import UpperForm from './components/UpperForm';
import 'antd/dist/antd.css';
import Remark from './components/Remark';
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";
import * as actionCreators from "../rawSysOpRe/store/actionCreators";
import {connect} from "react-redux";

// 福石水泥3000t/d生产线中控室生料磨系统运行记录
class RawSysOpRe extends Component {

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
        /**首先查询当前页面是否有历史纪录并赋值给FormData**/
        const {upperData, bottomData, date, t_name, setOldData, requestFlag} = this.props;
        if (requestFlag) {
            setOldData(t_name, date, upperData, bottomData);
        }
    }


    returnBack = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div style={{padding: '1%'}}>
                <h1 align="center">福石水泥3000t/d生产线中控室生料磨系统运行记录</h1>
                {/*表单最上的时间及人员显示*/}
                <TimeShow/>
                <div
                    style={{
                        border: "1px solid black",
                        margin: "10px 20px 10px 20px"
                    }}
                >
                    {/*表单上半部分*/}
                    <UpperForm/>

                    {/* 备注 */}
                    <Remark/>
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
            </div>
        );

    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['rawSysOpRe', 'date']),
        timeChose: state.getIn(['rawSysOpRe', 'timeChose']),
        upperData: state.getIn(['rawSysOpRe', 'upperData']),
        bottomData: state.getIn(['rawSysOpRe', 'bottomData']),
        requestFlag: state.getIn(['rawSysOpRe', 'requestFlag']),
        person: state.getIn(['rawSysOpRe', 'person']),
        t_name: state.getIn(['rawSysOpRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName, date, upperData, bottomData) {
            dispatch(actionCreators.getData(tableName, date, upperData, bottomData))
        }
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(RawSysOpRe);
