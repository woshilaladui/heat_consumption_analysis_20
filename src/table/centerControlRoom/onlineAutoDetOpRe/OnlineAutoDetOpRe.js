import React, {Component, Fragment} from "react";
import ButtonConfirmationBox from "./components/ButtonConfirmBox";
import TimeShow from "./components/TimeShow";
import UpperForm from "./components/UpperForm";
import "antd/dist/antd.css";
import Remark from './components/Remark';
import * as actionCreators from "./store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";
import {checkAuthority} from "../../../Request/RequsetCenter";
import {Mark, URL} from "../../../Request/Constant";


// 在线自动检测运行记录(排放物)
class OnlineAutoDetOpRe extends Component {
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
        const {upperData,bottomData,requestFlag, date, t_name, setOldData} = this.props;
        if(requestFlag){
            const tempUpperData = deepCopy(upperData);
            const tempBottomData = deepCopy(bottomData)
            setOldData(t_name,date,tempUpperData,tempBottomData);
        }
    }



    render() {
        return (
            <Fragment style = {{width:"100%",height:"100%"}}>
                <div  style={{padding: '1%'}} ref = {(el) => this.refs = el}>
                    <h1 align="center">在线自动检测运行记录(排放物)</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        {/*表单上半部分*/}
                        <UpperForm />
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
        date:state.getIn(['onlineAutoDetOpRe', 'date']),
        timeChose:state.getIn(['onlineAutoDetOpRe', 'timeChose']),
        upperData:state.getIn(['onlineAutoDetOpRe', 'upperData']),
        requestFlag:state.getIn(['onlineAutoDetOpRe', 'requestFlag']),
        bottomData:state.getIn(['onlineAutoDetOpRe', 'bottomData']),
        person:state.getIn(['onlineAutoDetOpRe', 'person']),
        t_name:state.getIn(['onlineAutoDetOpRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName,date,upperData,bottomData){
            dispatch(actionCreators.getData(tableName,date,upperData,bottomData))

        },
    }//end return
}
export default connect(mapStateToProps, mapDispathToProps)(OnlineAutoDetOpRe);