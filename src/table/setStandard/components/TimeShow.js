import React, {Component, Fragment} from 'react';
import {Row, Col} from 'antd';
import {Menu, Select} from 'antd';
import moment from 'moment';


const Option = Select.Option;

class TimeShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableChose: '入窑生料原材料化学分析报告单'
        }
    }

    /**
     *表格选择响应
     */
    handleTableChange = (e) => {
        const x = parseInt(e);
        const tableChose = ['石灰石进厂原材料化学分析报告单', '砂岩进厂原材料化学分析报告单', '铁粉进厂原材料化学分析报告单',
            '粉煤灰（干）进厂原材料化学分析报告单', '粉煤灰（湿)进厂原材料化学分析报告单',
            '出磨生料化学分析报告单', '入窑生料化学分析报告单', '出窑熟料全分析汇总表', '出厂熟料全分析汇总表',
            '控制室原始记录',];

        this.props.handleTableChose(x);
        this.setState({
            tableChose: tableChose[x]
        })

    }

    render() {
        const day = (['天', '一', '二', '三', '四', '五', '六']);
        return (
            <Fragment>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>{moment().format('YYYY年MM月DD日')}</Col>
                    <Col span={4}>{"星期" + day[moment().format('d')]}</Col>
                    <Col span={6}>
                        <span>
                        表格选择：<Select defaultValue='0' onChange={this.handleTableChange}>
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
                    <Col span={4}>{"登录人员：" + this.props.person}</Col>
                </Row>
            </Fragment>
        );
    }
}

export default TimeShow;