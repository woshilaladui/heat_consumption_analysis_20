import React, {Component, Fragment} from 'react';
import {Row, Col} from 'antd';
import { Select} from 'antd';
import moment from 'moment';
import * as actionCreators from "../../setStandard/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

const Option = Select.Option;

class TimeShow extends Component {

    render() {
        const day = (['天', '一', '二', '三', '四', '五', '六']);

        const {handleTabChange, person,tableNameList,tableChose} = this.props;

        let tempTableNameList = deepCopy(tableNameList)

        return (
            <Fragment>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>{moment().format('YYYY年MM月DD日')}</Col>
                    <Col span={4}>{"星期" + day[moment().format('d')]}</Col>
                    <Col span={6}>
                        <span>
                        表格选择：<Select defaultValue='0' onChange={e => handleTabChange(e,tempTableNameList)}>
                                <Option value="0">石灰石进厂原材料化学分析报告单</Option>
                                <Option value="1">砂岩进厂原材料化学分析报告单</Option>
                                <Option value="2">铁粉进厂原材料化学分析报告单</Option>
                                <Option value="3">粉煤灰（干）进厂原材料化学分析报告单</Option>
                                <Option value="4">粉煤灰（湿)进厂原材料化学分析报告单</Option>
                                <Option value="5">出磨生料化学分析报告单</Option>
                                <Option value="6">入窑生料化学分析报告单</Option>
                                <Option value="7">出窑熟料全分析汇总表</Option>
                                <Option value="8">出厂熟料全分析汇总表</Option>
                                <Option value="9">控制室原始记录</Option>

                            </Select>
                        </span>
                    </Col>
                    <Col span={4}>{"登录人员：" + person}</Col>
                </Row>
            </Fragment>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

        date: state.getIn(['setStandard', 'date']),
        tableChose: state.getIn(['setStandard', 'tableChose']),
        person: state.getIn(['setStandard', 'person']),
        tableNameList:state.getIn(['setStandard', 'tableNameList']),


    }
};

const mapDispathToProps = (dispatch) => {
    return {
        handleTabChange(e,tempTableNameList) {
            const x = parseInt(e)

            dispatch(actionCreators.doChangeTabChose(x,tempTableNameList[x]))
        }
    }//end return
};


export default connect(mapStateToProps, mapDispathToProps)(TimeShow);