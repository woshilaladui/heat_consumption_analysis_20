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

        let bgl = null;
        let bg2 = null;
        let bg3 = null;
        let bg4 = null;
        let bg5 = null;
        let bg6 = null;
        let bg7 = null;
        let bg8 = null;
        let bg9 = null;
        let BG1 = null;
        let BG2 = null;
        let BG3 = null;
        let BG4 = null;

        if(this.props.searchFlag){
            bgl = value[0];
            bg2 = value[1];
            bg3 = value[2];
            bg4 = value[3];
            bg5 = value[4];
            bg6 = value[5];
            bg7 = value[6];
            bg8 = value[7];
            bg9 = value[8];
            BG1 = value[9];
            BG2 = value[10];
            BG3 = value[11];
            BG4 = value[12];
        }else{
            bgl = value[0] * 42000;
            bg2 = value[1] * 80;
            bg3 = value[2] * 10000;
            bg4 = value[3] * 28000;
            bg5 = value[4] * 7000;
            bg6 = value[5] * 24000;
            bg7 = value[6] * 8000;
            bg8 = value[7] * 16000;
            bg9 = value[8] * 2000;
            BG1 = value[9] * 4000;
            BG2 = value[10] * 16000;
            BG3 = value[11] * 6000;
            BG4 = value[12];
        }

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        dataSource.push({
            KV: <span>
                    <Input
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(bgl) ? null : bgl}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 0)}
                    />
                </span>,
            BGL: <span>
                    <Input
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(bg2) ? null : bg2}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 1)}
                    />
                </span>,
            YRFD: <span>
                    <Input
                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(bg3) ? null : bg3}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 2)}
                    />
                </span>,
            YRFDL: <span>
                <Input
                    style={this.changeStyle(value[12])}
                    defaultValue={''}
                    value={isNaN(BG4) ? null : BG4}
                    onChange={event => this.onInputNumberChange2(event.target.value, 0, 12)}
                />
            </span>,
            KV1: <span>
                    <Input
                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(bg4) ? null : bg4}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 3)}
                    />
                </span>,
            KV2: <span>
                    <Input
                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(bg5) ? null : bg5}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 4)}
                    />
                </span>,
            KV3: <span>
                    <Input
                        style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(bg6) ? null : bg6}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 5)}
                    />
                </span>,
            KV4: <span>
                    <Input
                        style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(bg7) ? null : bg7}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 6)}
                    />
                </span>,
            KV5: <span>
                    <Input
                        style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(bg8) ? null : bg8}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 7)}
                    />
                </span>,
            KV6: <span>
                    <Input
                        style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(bg9) ? null : bg9}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 8)}
                    />
                </span>,
            KV7: <span>
                    <Input
                        style={this.changeStyle(value[9])}
                        defaultValue={''}
                        value={isNaN(BG1) ? null : BG1}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 9)}
                    />
                </span>,
            KV8: <span>
                    <Input
                        style={this.changeStyle(value[10])}
                        defaultValue={''}
                        value={isNaN(BG2) ? null : BG2}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 10)}
                    />
                </span>,
            KV9: <span>
                    <Input
                        style={this.changeStyle(value[11])}
                        defaultValue={''}
                        value={isNaN(BG3) ? null : BG3}
                        onChange={event => this.onInputNumberChange2(event.target.value, 0, 11)}
                    />
                </span>
        })

        /**中间八行的数据输入**end**/

        return (
            <Table bordered pagination={false} dataSource={dataSource}>
                0<Column title="35KV" dataIndex="KV" key="KV" />
                1<Column title="办公楼" dataIndex="BGL" key="BGL" />
                2<Column title="余热发电" dataIndex="YRFD" key="YRFD" />
                3<Column title="312" dataIndex="KV1" key="KV1" />
                4<Column title="313" dataIndex="KV2" key="KV2" />
                5<Column title="12" dataIndex="KV3" key="KV3" />
                6<Column title="13" dataIndex="KV4" key="KV4" />
                7<Column title="603" dataIndex="KV5" key="KV5" />
                8<Column title="604" dataIndex="KV6" key="KV6" />
                9<Column title="606" dataIndex="KV7" key="KV7" />
                10<Column title="607" dataIndex="KV8" key="KV8" />
                11<Column title="608" dataIndex="KV9" key="KV9" />
                12<Column title="余热发电量" dataIndex="YRFDL" key="YRFDL" />
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