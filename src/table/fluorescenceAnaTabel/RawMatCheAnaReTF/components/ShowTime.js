import React, { Component,Fragment } from 'react';
import { Row, Col, Select } from 'antd';
import moment from 'moment';

const Option = Select.Option;
class TimeShow extends Component{

    constructor(props){
        super(props);
        this.state={
            timeChose:'0点班'
        }
    }

    /**
     *班次选择响应
     */
    handleTimeChange = (e) => {
        const x=parseInt(e)
        const timeChose=['0点班','8点班','16点班'];
        this.props.handleTimeChose(x);
        this.setState({
            timeChose:timeChose[x]
        })

    }

    render() {
        const day=(['天','一','二','三','四','五','六']);

        return(
            <Fragment>
                <Row type="flex" justify = "space-around" align="middle">
                    <Col span ={4}>{moment().format('YYYY年MM月DD日')}</Col>
                    <Col span ={4}>{"星期"+day[moment().format('d')]}</Col>
                    <Col span ={4}>
                    班次选择：<Select defaultValue='0'  onChange={this.handleTimeChange}>
                            <Option  value='0'>0点班</Option>
                            <Option  value='1'>8点班</Option>
                            <Option  value='2'>16点班</Option>
                        </Select>
                    </Col>
                    <Col span ={4}>{"值班人员："+this.props.person}</Col>
                </Row>
            </Fragment>
        );
    }
}

export default TimeShow;