import React, { Component,Fragment } from 'react';
import { Row, Col, Select } from 'antd';
import moment from 'moment';
import * as actionCreators from "../../RawMatCheAnaReTF/store/actionCreators";
import {connect} from "react-redux";

const Option = Select.Option;
class TimeShow extends Component{



    render() {
        const day=(['天','一','二','三','四','五','六']);

        const {handleTimeChange, person} = this.props;

        return(
            <Fragment>
                <Row type="flex" justify = "space-around" align="middle">
                    <Col span ={4}>{moment().format('YYYY年MM月DD日')}</Col>
                    <Col span ={4}>{"星期"+day[moment().format('d')]}</Col>
                    <Col span ={4}>
                    班次选择：<Select defaultValue='0'  onChange={handleTimeChange}>
                            <Option  value='0'>0点班</Option>
                            <Option  value='1'>8点班</Option>
                            <Option  value='2'>16点班</Option>
                        </Select>
                    </Col>
                    <Col span ={4}>{"值班人员："+person}</Col>
                </Row>
            </Fragment>
        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {

        date: state.getIn(['RawMatCheAnaReTF', 'date']),
        timeChose: state.getIn(['RawMatCheAnaReTF', 'timeChose']),
        person: state.getIn(['RawMatCheAnaReTF', 'person']),


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