import React, {Component} from 'react';
import {Input, Table, Button} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";


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
        const {data, timeChose, updateChange} = this.props;
        let NewData = deepCopy(data)//复制一份出来
        let index = indexH + timeChose * 12;
        NewData[index]["data"][indexL] = value;
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

        const {data, timeChose, date, tableName, saveToHome} = this.props;
        const Data = deepCopy(data)

        //计算具体下标位置
        const index = i + timeChose * 12//每班有13行数据
        saveToHome(
            date,
            index,
            tableName,
            Data
        )

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

        /**
         *
         * data是页面数据
         *
         * Data 是拷贝data之后的数据
         *
         */

        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data, timeChose,person} = this.props;


        const Data = deepCopy(data)



        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 12;
            const value = Data[index]['data'];


            dataSource.push(
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
                    person: Data[index]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={dataSource} pagination={false}
                />

            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['burnSysOpRe', 'date']),
        timeChose: state.getIn(['burnSysOpRe', 'timeChose']),
        data: state.getIn(['burnSysOpRe', 'data']),
        person: state.getIn(['burnSysOpRe', 'person']),
        tableName: state.getIn(['burnSysOpRe', 'tableName']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },



        //上表暂存一行数据
        saveToHome(date, index, tableName, data) {


            dispatch(actionCreators.saveData({
                date:date,
                index:index,
                tableName:tableName,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);