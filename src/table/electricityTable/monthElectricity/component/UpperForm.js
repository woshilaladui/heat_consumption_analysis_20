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
        const Data = deepCopy(data);
        const value = Data['0']['data'];

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        dataSource.push({
            key:1,
            YT: <span>
                    <Input
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 0)}
                    />
                </span>,
            YTBY: <span>
                    <Input
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 1)}
                    />
                </span>,
            YTQD: <span>
                    <Input
                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 2)}
                    />
                </span>,
            YTBP: <span>
                    <Input
                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 3)}
                    />
                </span>,
            YTLM: <span>
                    <Input
                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 4)}
                    />
                </span>,
            YTFJ: <span>
                    <Input
                        style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(value[5]) ? null : value[5]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 5)}
                    />
                </span>,
            YTWP: <span>
                    <Input
                        style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(value[6]) ? null : value[6]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 6)}
                    />
                </span>,
            YW: <span>
                    <Input
                        style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(value[7]) ? null : value[7]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 7)}
                    />
                </span>,
            YWSL: <span>
                    <Input
                        style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(value[8]) ? null : value[8]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 8)}
                    />
                </span>,
            YWBY: <span>
                    <Input
                        style={this.changeStyle(value[9])}
                        defaultValue={''}
                        value={isNaN(value[9]) ? null : value[9]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 9)}
                    />
                </span>,
            YWZ: <span>
                    <Input
                        style={this.changeStyle(value[10])}
                        defaultValue={''}
                        value={isNaN(value[10]) ? null : value[10]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 10)}
                    />
                </span>,
            YWZM: <span>
                    <Input
                        style={this.changeStyle(value[11])}
                        defaultValue={''}
                        value={isNaN(value[11]) ? null : value[11]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 11)}
                    />
                </span>,
            YWXH: <span>
                    <Input
                        style={this.changeStyle(value[12])}
                        defaultValue={''}
                        value={isNaN(value[12]) ? null : value[12]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 12)}
                    />
                </span>,
            YWGW: <span>
                    <Input
                        style={this.changeStyle(value[13])}
                        defaultValue={''}
                        value={isNaN(value[13]) ? null : value[13]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 13)}
                    />
                </span>,
            YWWP: <span>
                    <Input
                        style={this.changeStyle(value[14])}
                        defaultValue={''}
                        value={isNaN(value[14]) ? null : value[14]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 14)}
                    />
                </span>,
            YL: <span>
                    <Input
                        style={this.changeStyle(value[15])}
                        defaultValue={''}
                        value={isNaN(value[15]) ? null : value[15]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 15)}
                    />
                </span>,
            SBF: <span>
                    <Input
                        style={this.changeStyle(value[16])}
                        defaultValue={''}
                        value={isNaN(value[16]) ? null : value[16]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 16)}
                    />
                </span>,
            BGL: <span>
                    <Input
                        style={this.changeStyle(value[17])}
                        defaultValue={''}
                        value={isNaN(value[17]) ? null : value[17]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 17)}
                    />
                </span>,
            constant_save:<Button type='primary' onClick={() => this.postToHome(0)}>暂存</Button>
        })

        /**中间八行的数据输入**end**/

        return (
            <Table bordered pagination={false} dataSource={dataSource}>
                <ColumnGroup title="烧成车间">
                    <Column title="窑头进线柜" dataIndex="YT" key="YT" />
                    <Column title="窑头变压器" dataIndex="YTBY" key="YTBY" />
                    <Column title="窑头软起动变压器" dataIndex="YTQD" key="YTQD" />
                    <Column title="窑头变频器变压器" dataIndex="YTBP" key="YTBP" />
                    <Column title="煤立磨" dataIndex="YTLM" key="YTLM" />
                    <Column title="煤风机" dataIndex="YTFJ" key="YTFJ" />
                    <Column title="窑头尾排风机" dataIndex="YTWP" key="YTWP" />
                </ColumnGroup>
                <ColumnGroup title="生料车间">
                    <Column title="窑尾进线柜" dataIndex="YW" key="YW" />
                    <Column title="生料变压器" dataIndex="YWSL" key="YWSL" />
                    <Column title="窑尾变压器" dataIndex="YWBY" key="YWBY" />
                    <Column title="窑主机" dataIndex="YWZ" key="YWZ" />
                    <Column title="生料主磨" dataIndex="YWZM" key="YWZM" />
                    <Column title="循环风机" dataIndex="YWXH" key="YWXH" />
                    <Column title="高温风机" dataIndex="YWGW" key="YWGW" />
                    <Column title="尾排风机" dataIndex="YWWP" key="YWWP" />
                </ColumnGroup>
                <ColumnGroup title="原料车间">
                    <Column title="原料变压器" dataIndex="YL" key="YL" />
                    <Column title="水泵房" dataIndex="SBF" key="SBF" />
                    <Column title="办公楼" dataIndex="BGL" key="BGL" />
                </ColumnGroup>
                <Column title="暂存" dataIndex="constant_save" key="constant_save" />
            </Table>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        //date: state.getIn(['monthElectricity', 'date']),
        data: state.getIn(['monthElectricity', 'data']),
        person: state.getIn(['monthElectricity', 'person']),
        tableName: state.getIn(['monthElectricity', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
        date: state.getIn(['searchTable', 'date']),
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