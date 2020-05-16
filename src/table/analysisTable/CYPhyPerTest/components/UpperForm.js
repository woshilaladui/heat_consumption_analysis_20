import React, {Component} from 'react';
import {Input, Table} from 'antd';

import * as actionCreators from "../../../analysisTable/CYPhyPerTest/store/actionCreators";
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
    onInputChange2 = (value, indexH, indexL) => {
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



    /**点击暂存之后上传当前行的数据到后台**end**/
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

        /**表头的设计**end**/


        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data,LX,Placeholder} = this.props;
        const Data = deepCopy(data);
        const lx = deepCopy(LX);
        const placeholder = deepCopy(Placeholder);
        for (let i = 0; i < 5; i++) {
            //const hour = i
            const value = Data[i]['data'];


            dataSource.push(
                {
                    XMMC: lx[i],
                    TXNR: <span><Input
                        //style={this.changeStyle(value[0])}
                        placeholder={placeholder[i]}
                        defaultValue={''}
                        //value={isNaN(value[0]) ? null : value[0]}
                        value={value[0]}
                        onChange={event => this.onInputChange2(event.target.value, i, 0)}
                    /></span>,
                    person:Data[i]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
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
        date: state.getIn(['CYPhyPerTest', 'date']),
        LX: state.getIn(['CYPhyPerTest', 'LX']),
        timeChose: state.getIn(['CYPhyPerTest', 'timeChose']),
        data: state.getIn(['CYPhyPerTest', 'data']),
        requestFlag: state.getIn(['CYPhyPerTest', 'requestFlag']),
        person: state.getIn(['CYPhyPerTest', 'person']),
        tableName: state.getIn(['CYPhyPerTest', 'tableName']),
        Placeholder:state.getIn(['CYPhyPerTest', 'Placeholder'])

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