import React, { Component,Fragment } from 'react';
import { Row, Col, Select } from 'antd';
import moment from 'moment';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";


const Option = Select.Option;
class TimeShow extends Component{
    render() {
        const day=(['天','一','二','三','四','五','六']);
        const {handleTimeChange, person, searchdate, searchFlag} = this.props;
        let NowDate = null;
        if(searchFlag){
            NowDate = moment();
        }else{
            NowDate = searchdate;
        }
        return(
            <Fragment>
                <Row type="flex" justify = "space-around" align="middle">
                    <Col span ={4}>{moment(NowDate).format('YYYY年MM月DD日')}</Col>
                    <Col span ={4}>{"星期"+day[moment(NowDate).format('d')]}</Col>
                    <Col span ={4}>
                        班次选择：<Select defaultValue='0'  onChange={handleTimeChange}>
                        <Option  value='0'>0点班</Option>
                        <Option  value='1'>10点班</Option>
                        <Option  value='2'>20点班</Option>
                    </Select>
                    </Col>
                    <Col span ={4}>{"值班人员："+window.localStorage.username}</Col>
                </Row>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

        date: state.getIn(['onlineAutoDetOpRe', 'date']),
        timeChose: state.getIn(['onlineAutoDetOpRe', 'timeChose']),
        person: state.getIn(['onlineAutoDetOpRe', 'person']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        handleTimeChange(e) {
            const x = parseInt(e)
            dispatch(actionCreators.doChangeTimeChose(x))
        }
    }//end return
};


export default connect(mapStateToProps, mapDispathToProps)(TimeShow);