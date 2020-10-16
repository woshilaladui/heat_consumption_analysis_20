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
            KV: <span>
                    <Input
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 0)}
                    />
                </span>,
            BGL: <span>
                    <Input
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 1)}
                    />
                </span>,
            YRFD: <span>
                    <Input
                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 2)}
                    />
                </span>,
            KV1: <span>
                    <Input
                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 3)}
                    />
                </span>,
            KV2: <span>
                    <Input
                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 4)}
                    />
                </span>,
            KV3: <span>
                    <Input
                        style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(value[5]) ? null : value[5]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 5)}
                    />
                </span>,
            KV4: <span>
                    <Input
                        style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(value[6]) ? null : value[6]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 6)}
                    />
                </span>,
            KV5: <span>
                    <Input
                        style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(value[7]) ? null : value[7]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 7)}
                    />
                </span>,
            KV6: <span>
                    <Input
                        style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(value[8]) ? null : value[8]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 8)}
                    />
                </span>,
            KV7: <span>
                    <Input
                        style={this.changeStyle(value[9])}
                        defaultValue={''}
                        value={isNaN(value[9]) ? null : value[9]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 9)}
                    />
                </span>,
            KV8: <span>
                    <Input
                        style={this.changeStyle(value[10])}
                        defaultValue={''}
                        value={isNaN(value[10]) ? null : value[10]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 10)}
                    />
                </span>,
            KV9: <span>
                    <Input
                        style={this.changeStyle(value[11])}
                        defaultValue={''}
                        value={isNaN(value[11]) ? null : value[11]}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 11)}
                    />
                </span>,
            constant_save:<Button type='primary' onClick={() => this.postToHome(0)}>暂存</Button>
        })

        /**中间八行的数据输入**end**/

        return (
            <Table bordered pagination={false} dataSource={dataSource}>
                <Column title="35KV" dataIndex="KV" key="KV" />
                <Column title="办公楼" dataIndex="BGL" key="BGL" />
                <Column title="余热发电" dataIndex="YRFD" key="YRFD" />
                <Column title="312" dataIndex="KV1" key="KV1" />
                <Column title="313" dataIndex="KV2" key="KV2" />
                <Column title="12" dataIndex="KV3" key="KV3" />
                <Column title="13" dataIndex="KV4" key="KV4" />
                <Column title="603" dataIndex="KV5" key="KV5" />
                <Column title="604" dataIndex="KV6" key="KV6" />
                <Column title="606" dataIndex="KV7" key="KV7" />
                <Column title="607" dataIndex="KV8" key="KV8" />
                <Column title="608" dataIndex="KV9" key="KV9" />
                <Column title="暂存" dataIndex="constant_save" key="constant_save" />
            </Table>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        //date: state.getIn(['threeFiveKwTable', 'date']),
        data: state.getIn(['threeFiveKwTable', 'data']),
        person: state.getIn(['threeFiveKwTable', 'person']),
        tableName: state.getIn(['threeFiveKwTable', 'tableName']),
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