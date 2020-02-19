import React, {Component} from 'react';
import {Input, Table, Button} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";


class UpperForm extends Component {


    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        const BanCi = ['零点班', '八点班', '十六点班'];
        this.setState({
            BanCi: BanCi[this.props.timeChose],
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const BanCi = ['零点班', '八点班', '十六点班'];
        this.setState({
            BanCi: BanCi[nextProps.timeChose],
        });
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        const {upperData, timeChose, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(upperData))//复制一份出来
        let hour = indexH + timeChose * 8;
        NewData[hour]["t_data"][indexL] = value;
        updateChange(NewData)
    };

    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {

            if (isNaN(value)) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }
    }

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    postToHome(i) {//i是行数

        const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        const index = i + timeChose * 8
        saveToHome(index,1,t_name,date,Data)

    }

    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '班次',
                dataIndex: 'time',
                width: '10%',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 8;
                    }
                    if (index === 1) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 5) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 6) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 7) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                },
            },
            {
                title: '窑转速',
                key: 'YZS',
                width: '15%',
                children: [{
                    title: 'rpm',
                    dataIndex: 'YZS',
                }],
            },
            {
                title: '窑电流',
                key: 'YDL',
                width: '15%',
                children: [
                    {
                        title: 'A',
                        dataIndex: 'YDL'
                    },
                ],
            },
            {
                title: '生料喂料量',
                key: 'SLWL',
                width: '15%',
                children:
                    [{
                        title: 't/h',
                        dataIndex: 'SLWL'
                    }]
            },
            {
                title: '窑头喂煤量',
                key: 'YTWM',
                width: '15%',
                children: [
                    {
                        title: 't/h',
                        dataIndex: 'YTWM'
                    }
                ],
            },
            {
                title: '窑尾喂煤量',
                key: 'YWWM',
                width: '15%',
                children: [
                    {
                        title: 't/h',
                        dataIndex: 'YWWM'
                    }
                ],
            },
            {
                title: '人员',
                dataIndex: 'person',
                width: '7.5%',
            },
            {
                title: '暂存',
                dataIndex: 'btn_save',
                width: '7.5%',
            },
        ];

        /**表头的设计**end**/


        /**中间八行的数据输入**start**/
        const data = [];
        const {upperData, timeChose} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        for (let i = 0; i < 8; i++) {
            const hour = i + timeChose * 8;
            const value = Data[hour]['t_data'];

            data.push(
                {
                    time: this.state.BanCi,
                    YZS: <span><Input

                        style={this.changeStyle(value[0])}
                        defaultValue={''}

                        value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    YDL: <span><Input

                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                    /></span>,
                    SLWL: <span><Input

                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                    /></span>,
                    YTWM: <span><Input

                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                    /></span>,
                    YWWM: <span><Input

                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    person: Data[hour]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={data} pagination={false}/>

            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['burnSysOpRe', 'date']),
        timeChose: state.getIn(['burnSysOpRe', 'timeChose']),
        upperData: state.getIn(['burnSysOpRe', 'upperData']),
        person: state.getIn(['burnSysOpRe', 'person']),
        t_name: state.getIn(['burnSysOpRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {
            dispatch(actionCreators.updateUpperData(NewData))
        },

        saveToHome(index, tableType, tableName, date, data) {
            dispatch(actionCreators.saveData({
                index:index,
                tableType:tableType,
                tableName:tableName,
                date:date,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);