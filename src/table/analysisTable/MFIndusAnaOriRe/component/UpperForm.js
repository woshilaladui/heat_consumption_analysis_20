import React, {Component} from 'react';
import {Input, Table, Button, DatePicker} from 'antd';
import moment from 'moment';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const { Column, ColumnGroup } = Table;

class UpperForm extends Component {
    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        const {data, updateChange} = this.props;
        let NewData = deepCopy(data)//复制一份出来
        let index = indexH;
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
        const {data, date, tableName, saveToHome} = this.props;
        const Data = deepCopy(data)
        //计算具体下标位置
        const index = i;
        saveToHome(
            date,
            index,
            tableName,
            Data
        )

    }

    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**
         *
         * data是页面数据
         *
         * Data 是拷贝data之后的数据
         *
         */

        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data, person, date} = this.props;
        const Data = deepCopy(data)

        for( let i=0;i<24;i++){
            const value = Data[i]['data'];
            dataSource.push({
                key: i+1,
                carnum:<span><Input
                    style={this.changeStyle(value[0])}
                    defaultValue={''}
                    value={isNaN(value[0]) ? null : value[0]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                /></span>,
                Wy_1:<span><Input
                    style={this.changeStyle(value[1])}
                    defaultValue={''}
                    value={isNaN(value[1]) ? null : value[1]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                /></span>,
                Wy_2:<span><Input
                    style={this.changeStyle(value[2])}
                    defaultValue={''}
                    value={isNaN(value[2]) ? null : value[2]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                /></span>,
                Wf_1:<span><Input
                    style={this.changeStyle(value[3])}
                    defaultValue={''}
                    value={isNaN(value[3]) ? null : value[3]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                /></span>,
                Wf_2:<span><Input
                    style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(value[4]) ? null : value[4]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                /></span>,
                Vf_1:<span><Input
                    style={this.changeStyle(value[5])}
                    defaultValue={''}
                    value={isNaN(value[5]) ? null : value[5]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 5)}
                /></span>,
                Vf_2:<span><Input
                    style={this.changeStyle(value[6])}
                    defaultValue={''}
                    value={isNaN(value[6]) ? null : value[6]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 6)}
                /></span>,
                Af_1:<span><Input
                    style={this.changeStyle(value[7])}
                    defaultValue={''}
                    value={isNaN(value[7]) ? null : value[7]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 7)}
                /></span>,
                Af_2:<span><Input
                    style={this.changeStyle(value[8])}
                    defaultValue={''}
                    value={isNaN(value[8]) ? null : value[8]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 8)}
                /></span>,
                SM_c:<span><Input
                    style={this.changeStyle(value[9])}
                    defaultValue={''}
                    value={isNaN(value[9]) ? null : value[9]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 9)}
                /></span>,
                SM_s:<span><Input
                    style={this.changeStyle(value[10])}
                    defaultValue={''}
                    value={isNaN(value[10]) ? null : value[10]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 10)}
                /></span>,
                Kcal_1:<span><Input
                    style={this.changeStyle(value[11])}
                    defaultValue={''}
                    value={isNaN(value[11]) ? null : value[11]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 11)}
                /></span>,
                Kcal_2:<span><Input
                    style={this.changeStyle(value[12])}
                    defaultValue={''}
                    value={isNaN(value[12]) ? null : value[12]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 12)}
                /></span>,
                factory:<span><Input
                    defaultValue={''}
                    value={value[13]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 13)}
                /></span>,
                enter_time:<DatePicker
                    format='YYYY/MM/DD'
                    onChange={date => this.onInputNumberChange2(moment(date).format('YYYY/MM/DD').toString(),i,14)}
                    value={value[14] ? moment(value[14], 'YYYY/MM/DD') : moment(date, 'YYYY/MM/DD')}
                    defaultValue={moment(date, 'YYYY/MM/DD')}
                    style={{width: 200}}/>,
                constant_save:<Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>
            })
        }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                <Table bordered pagination={false} dataSource={dataSource}>
                    <Column title="车号" dataIndex="carnum" key="carnum" />
                    <ColumnGroup title="Wy(外水)">
                        <Column title="烧前" dataIndex="Wy_1" key="Wy_1" />
                        <Column title="烧后" dataIndex="Wy_2" key="Wy_2" />
                    </ColumnGroup>
                    <ColumnGroup title="Wf(内水)">
                        <Column title="烧前" dataIndex="Wf_1" key="Wf_1" />
                        <Column title="烧后" dataIndex="Wf_2" key="Wf_2" />
                    </ColumnGroup>
                    <ColumnGroup title="Vf(挥发分)">
                        <Column title="烧前" dataIndex="Vf_1" key="Vf_1" />
                        <Column title="烧后" dataIndex="Vf_2" key="Vf_2" />
                    </ColumnGroup>
                    <ColumnGroup title="Af(灰分)">
                        <Column title="烧前" dataIndex="Af_1" key="Af_1" />
                        <Column title="烧后" dataIndex="Af_2" key="Af_2" />
                    </ColumnGroup>
                    <Column title="C(固定碳)" dataIndex="SM_c" key="SM_c" />
                    <Column title="S(硫)" dataIndex="SM_s" key="SM_s" />
                    <ColumnGroup title="Kcal/Kg">
                        <Column title="分析基" dataIndex="Kcal_1" key="Kcal_1" />
                        <Column title="收到基" dataIndex="Kcal_2" key="Kcal_2" />
                    </ColumnGroup>
                    <Column title="厂家" dataIndex="factory" key="factory" />
                    <Column title="进厂日期" dataIndex="enter_time" key="enter_time" />
                    <Column title="暂存" dataIndex="constant_save" key="constant_save" />
                </Table>
            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['mfIndusAnaOriRe', 'date']),
        data: state.getIn(['mfIndusAnaOriRe', 'data']),
        person: state.getIn(['mfIndusAnaOriRe', 'person']),
        tableName: state.getIn(['mfIndusAnaOriRe', 'tableName']),
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
                tableType:"",
                date:date,
                index:index,
                tableName:tableName,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);