import React, {Component, Fragment} from 'react';
import './BurnSysOpRe.css';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import BottomForm from './component/BottomForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";

//福石水泥3000t/d中控室烧成系统运行记录
class BurnSysOpRe extends Component {

    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
        checkAuthority(URL.HUAYS_CHECK)
            .then((response)=>{
                if(response === Mark.ERROR){
                    this.props.history.push('/');
                }
            })
            .catch()

    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {upperData,bottomData, date, t_name, setOldData,requestFlag} = this.props;
        if(requestFlag){
            setOldData(t_name,date,upperData,bottomData);
        }

    }

    render() {

        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">福石水泥3000t/d中控室烧成系统运行记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow

                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        表单上半部分
                        <UpperForm/>
                        {/* 表单下半部分 */}
                        <BottomForm/>
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
                        // type="primary"
                        // buttonText="提交"
                        // action={this.handleSubmit}
                    />
                </div>
            </Fragment>
        )
    }
}


//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['burnSysOpRe', 'date']),
        timeChose:state.getIn(['burnSysOpRe', 'timeChose']),
        upperData:state.getIn(['burnSysOpRe', 'upperData']),
        bottomData:state.getIn(['burnSysOpRe', 'bottomData']),
        requestFlag:state.getIn(['burnSysOpRe', 'requestFlag']),
        person:state.getIn(['burnSysOpRe', 'person']),
        t_name:state.getIn(['burnSysOpRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName,date,upperData,bottomData){
            dispatch(actionCreators.getData(tableName,date,upperData,bottomData))
        }
    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(BurnSysOpRe);