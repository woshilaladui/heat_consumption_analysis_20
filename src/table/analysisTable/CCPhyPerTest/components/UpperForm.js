import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";

import * as actionCreators from "../../../analysisTable/CCPhyPerTest/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";

class UpperForm extends Component {
    componentDidMount() {

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        const {data, updateChange} = this.props;
        let NewData = deepCopy(data);//复制一份出来

        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
            updateChange(NewData);
        }
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
    };


    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '项目名称',
                dataIndex: 'XMMC',
            },
            {
                title: "填写内容",
                dataIndex: 'TXNR'
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
        const {data,LX,Placeholder} = this.props;
        const Data = deepCopy(data);
        const lx = deepCopy(LX);
        const placeholder = deepCopy(Placeholder);
        for (let i = 0; i < 13; i++) {

            const value = Data[i]['data'];
            dataSource.push(
                {
                    XMMC: lx[i],
                    TXNR: <span><Input

                        placeholder={placeholder[i]}
                        defaultValue={''}
                        value={value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    person: Data[i]['user'],
                   //btn_save: <Button type='primary' onClick={() => this.postToHome(i, 0)}>暂存</Button>,
                })
        }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={dataSource} pagination={false}/>

            </div>
        );
    }

}
//定义映射
const mapStateToProps = (state) => {
    return {
        //LX
        date: state.getIn(['CCPhyPerTest', 'date']),
        LX: state.getIn(['CCPhyPerTest', 'LX']),
        timeChose: state.getIn(['CCPhyPerTest', 'timeChose']),
        data: state.getIn(['CCPhyPerTest', 'data']),
        requestFlag: state.getIn(['CCPhyPerTest', 'requestFlag']),
        person: state.getIn(['CCPhyPerTest', 'person']),
        tableName: state.getIn(['CCPhyPerTest', 'tableName']),
        Placeholder:state.getIn(['CCPhyPerTest', 'Placeholder'])

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {

            dispatch(actionCreators.updateData({data: deepCopy(NewData)}))
        },


    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);