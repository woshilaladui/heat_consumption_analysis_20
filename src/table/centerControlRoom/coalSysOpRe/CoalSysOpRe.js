import React, {Component} from 'react';
import ButtonConfirmBox from './components/BottonConfirmBox';
import TimeShow from './components/TimeShow';
import UpperForm from './components/UpperForm';
import Remark from './components/Remark';
import {connect} from 'react-redux';
import * as actionCreators from './store/actionCreators';
import 'antd/dist/antd.css';
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";

// 福石水泥3000t/d中控室煤磨系统运行记录
class CoalSysOpRe extends Component {

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


    returnBack = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div style={{padding: '1%'}}>
                <h1 align="center">福石水泥3000t/d中控室煤磨系统运行记录</h1>
                <TimeShow/>
                <div
                    style={{
                        border: "1px solid black",
                        margin: "10px 20px 10px 20px"
                    }}
                >
                    {/*/!*表单上半部分*!/*/}
                    <UpperForm/>

                    {/* 表单下部分备注区 */}
                    <Remark/>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    <ButtonConfirmBox
                        // type="primary" buttonText="提交"
                        //
                        // action={this.handleSubmit}
                    />
                </div>
            </div>
        );

    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['coalSysOpRe', 'date']),
        timeChose: state.getIn(['coalSysOpRe', 'timeChose']),
        upperData: state.getIn(['coalSysOpRe', 'upperData']),
        bottomData: state.getIn(['coalSysOpRe', 'bottomData']),
        requestFlag: state.getIn(['coalSysOpRe', 'requestFlag']),
        person: state.getIn(['coalSysOpRe', 'person']),
        t_name: state.getIn(['coalSysOpRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName, date, upperData, bottomData) {
            dispatch(actionCreators.getData(tableName, date, upperData, bottomData))
        }
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(CoalSysOpRe);
