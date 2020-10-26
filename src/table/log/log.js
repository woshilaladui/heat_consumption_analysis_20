import React, {Component, Fragment} from 'react';
import { Input } from 'antd';

import moment from 'moment';
// import axios from 'axios';
import {List,DatePicker} from "antd";
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {deepCopy} from "../../Helper/Copy";
// import {URL} from "../../constant/Constant";




 class Log extends Component {


    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, date, tableName, setOldData,requestFlag,person} = this.props;
        if(requestFlag){
            setOldData(person);
        }

    }


    render(){
        const { RangePicker } = DatePicker;
        const { Search } = Input;
        const submitDateAndUser=(value)=>{
            // console.log('submitDateAndUser')
            // console.log(value)
            // console.log(this.props.startTime)
            // console.log(this.props.endTime)
            // console.log('submitDateAndUser')
            this.props.changeDataByUser(value,this.props.startTime,this.props.endTime)
        };
        return(
            <Fragment>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">日志</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow/>
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                        <span>
                        日志时间范围：
                        <RangePicker
                            format="YYYY-MM-DD"
                            onChange={(value)=>this.props.changeDataByTime(value)}
                            style={{margin: '10px'}}
                        />
                        </span>
                        <span style={{marginLeft:'100px'}}>
                            用户名搜索：
                            <Search
                                placeholder="请输入用户名搜索"
                                onSearch={value => submitDateAndUser(value)}
                                style={{ width: 200 }}
                            />
                        </span>
                        <br />
                        <UpperForm/>
                    </div>
                    <div
                        style={{
                            float: "right",
                            margin: "0px 50px 20px 0px",
                            display: "inline-block"
                        }}
                    >
                    </div>
                </div>
            </Fragment>
        )
    }

}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['log', 'date']),
        data:state.getIn(['log', 'data']),
        requestFlag:state.getIn(['log', 'requestFlag']),
        person:state.getIn(['log', 'person']),
        startTime:state.getIn(['log', 'startTime']),
        tableName:state.getIn(['log', 'tableName']),
        endTime:state.getIn(['log', 'endTime']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(person){
            dispatch(actionCreators.getData(person))
        },
        changeDataByTime(time){
            dispatch(actionCreators.changeDataByTime(time))
        },
        changeDataByUser(username,startTime,endTime){

            dispatch(actionCreators.changeDataByUsername(username,startTime,endTime))
        }
    }//end return
};

//export default ThreeFiveKwTable;
export default connect(mapStateToProps, mapDispathToProps)(Log);