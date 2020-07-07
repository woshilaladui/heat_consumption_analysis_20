import React, {Component, Fragment} from 'react';
import {Row, Col, Select} from 'antd';
import moment from 'moment';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";

const Option = Select.Option;

class TimeShow extends Component {


    render() {
        const day = (['天', '一', '二', '三', '四', '五', '六']);
        const {person} = this.props;

        return (
            <Fragment>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>{moment().format('YYYY年MM月DD日')}</Col>
                    <Col span={4}>{"星期" + day[moment().format('d')]}</Col>
                    <Col span={4}>{"值班人员：" + window.localStorage.username}</Col>
                </Row>
            </Fragment>
        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['log', 'date']),
        person: state.getIn(['log', 'person']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(TimeShow);
