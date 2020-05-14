import React, {Component} from 'react';
import {Table, Input, Button, message} from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";

class UpperForm extends Component {


    /**
     * 第一列的时间变化
     */
    componentWillMount() {

    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }

    //暂存函数
    postToHome(i) {//i是行数
        // const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        // const Data = JSON.parse(JSON.stringify(upperData))
        //
        // const index = i + timeChose * 8
        //
        // saveToHome(index, 1, t_name, date, Data);
    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        if(value != null){

            const {data, updateChange} = this.props;
            let NewData = deepCopy(data);//复制一份出来
            NewData[indexH]["data"][indexL] = value;
            updateChange(NewData)

        }
    };

    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {
            if (isNaN(value) || value > 100) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }
    };

    // onInputStringChange = (event, indexH, indexL) => {
    //     let NewData = this.state.Data;
    //     let hour = indexH + this.props.timeChose * 8;
    //     NewData[hour]["t_data"][indexL] = event.target.value;
    //     this.setState({
    //         Data: NewData
    //     });
    // };

    // limitDecimals2 = (value: string | number): string => {
    //     // const reg = /^(\-)*(\d+)\.(\d\d).*$/;
    //     const reg = /^(([1-9]{1}\d*)|(0{1}))\.(\d{2})$/;
    //     if (typeof value === 'string') {
    //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
    //     } else if (typeof value === 'number') {
    //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
    //     } else {
    //         return ''
    //     }
    // };

    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
            },
            {
                title: 'SO2 mg/m³',
                dataIndex: 'SO2',
            },
            {
                title: 'Nox mg/m³',
                dataIndex: 'Nox',
            },
            {
                title: '氧含量v/%',
                dataIndex: 'YHL',
            },
            {
                title: '静压力pa',
                dataIndex: 'JYL',
            },
            {
                title: '动压力pa',
                dataIndex: 'DYL',
            },
            {
                title: '大气压力kpa',
                dataIndex: 'DQYL',
            },
            {
                title: '颗粒物mg/m³',
                dataIndex: 'KLW',
            },
            {
                title: '烟气温度c',
                dataIndex: 'YQWD',
            },
            {
                title: '烟气压力kpa',
                dataIndex: 'YQYL',
            },
            {
                title: '烟气流速m/s',
                dataIndex: 'YQLS',
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
            },
            // {
            //     title: '暂存',
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            // }
        ];

        const dataSource = [];

        const {data, timeChose,allTime} = this.props;
        const time = deepCopy(allTime);
        const Data = deepCopy(data);
        for (let i = 0; i < 6; i++) {
            const index = i + timeChose * 7;
            const value = Data[index]['data'];

            dataSource.push(
                {
                    time: time[timeChose][i],
                    SO2: <span><Input
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        // onBlur={() => this.updataData(this.props.standard)}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 0)}
                    /></span>,
                    Nox: <span><Input
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        // onBlur={() => this.updataData(this.props.standard)}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 1)}
                    /></span>,
                    YHL:
                        <span><Input
                            style={this.changeStyle(value[2])}
                            defaultValue={''}
                            value={isNaN(value[2]) ? null : value[2]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 2)}
                        /></span>,
                    JYL:
                        <span><Input
                            style={this.changeStyle(value[3])}
                            defaultValue={''}
                            value={isNaN(value[3]) ? null : value[3]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 3)}
                        /></span>,
                    DYL:
                        <span><Input
                            style={this.changeStyle(value[4])}
                            defaultValue={''}
                            value={isNaN(value[4]) ? null : value[4]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 4)}
                        /></span>,
                    DQYL:
                        <span><Input
                            style={this.changeStyle(value[5])}
                            defaultValue={''}
                            value={isNaN(value[5]) ? null : value[5]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 5)}
                        /></span>,
                    KLW:
                        <span><Input
                            style={this.changeStyle(value[6])}
                            defaultValue={''}
                            value={isNaN(value[6]) ? null : value[6]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 6)}
                        /></span>,
                    YQWD:
                        <span><Input
                            style={this.changeStyle(value[7])}
                            defaultValue={''}
                            value={isNaN(value[7]) ? null : value[7]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 7)}
                        /></span>,
                    YQYL:
                        <span><Input
                            style={this.changeStyle(value[8])}
                            defaultValue={''}
                            value={isNaN(value[8]) ? null : value[8]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 8)}
                        /></span>,
                    YQLS:
                        <span><Input
                            style={this.changeStyle(value[9])}
                            defaultValue={''}
                            value={isNaN(value[9]) ? null : value[9]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, index, 9)}
                        /></span>,
                    person:
                        Data[index]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,

                }
            )
        }

        return (
            <div className="upper">
                <Table columns={columns} bordered dataSource={dataSource} pagination={false}/>
            </div>
        );
    }


}

//定义映射
const mapStateToProps = (state) => {
    return {

        date: state.getIn(['onlineAutoDetOpRe', 'date']),
        timeChose: state.getIn(['onlineAutoDetOpRe', 'timeChose']),
        data: state.getIn(['onlineAutoDetOpRe', 'data']),
        person: state.getIn(['onlineAutoDetOpRe', 'person']),
        tableName: state.getIn(['onlineAutoDetOpRe', 'tableName']),
        allTime:state.getIn(['onlineAutoDetOpRe', 'allTime']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },
    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);