import React, {Component} from 'react';
import { Table, Button,InputNumber} from 'antd';

import {AnalysisOrder_YS} from "../../../../Constant/TableOrder";
import * as actionCreators from "../../../analysisTable/rawMatAnaOriReFMHg/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";
import {autoCalculate_content} from "../../../../Helper/Calculate";

class UpperForm extends Component {

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
    }


    componentDidMount() {

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


        }

        if(
            indexL === AnalysisOrder_YS.Fe2O3
            ||
            indexL === AnalysisOrder_YS.CaO
            ||
            indexL === AnalysisOrder_YS.MgO
            ||
            indexL === AnalysisOrder_YS.SO3
        ){
            //计算含量
            autoCalculate_content(NewData,indexL);
        }

        updateChange(NewData);
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
    };//end changeStyle



    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }
        const columns = [
            {
                title: '类型',
                dataIndex: 'LX',
                render: (value, rows, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 2
                    }
                    if (index === 1) {
                        obj.props.rowSpan = 0
                    }
                    return obj;
                }
            },
            {
                title: 'IL',
                dataIndex: 'IL',
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
            },
            {
                title: 'SO3',
                dataIndex: 'SO3',
            },
            {
                title: 'Na2O',
                dataIndex: 'Na2O',
            },
            {
                title: 'K2O',
                dataIndex: 'K2O',
            },
            {
                title: 'Cl',
                dataIndex: 'Cl',
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
        const {data,LX} = this.props;
        const Data = deepCopy(data);
        const lx = deepCopy(LX);
        for (let i = 0; i < 3; i++) {

            const value = Data[i]['data'];

            dataSource.push(
                {
                    LX: lx[i],
                    IL: <span><InputNumber
                        style={this.changeStyle(value[AnalysisOrder_YS.IL])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.IL]) ? null : value[AnalysisOrder_YS.IL]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.IL)}
                    /></span>,
                    SiO2: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.SiO2])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.SiO2]) ? null : value[AnalysisOrder_YS.SiO2]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.SiO2)}
                    /></span>,
                    Al2O3: <span><InputNumber
                        style={this.changeStyle(value[AnalysisOrder_YS.Al2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.Al2O3]) ? null : value[AnalysisOrder_YS.Al2O3]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.Al2O3)}
                    /></span>,
                    Fe2O3: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.Fe2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.Fe2O3]) ? null : value[AnalysisOrder_YS.Fe2O3]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.Fe2O3)}
                    /></span>,
                    CaO: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.CaO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.CaO]) ? null : value[AnalysisOrder_YS.CaO]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.CaO)}
                    /></span>,
                    MgO: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.MgO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.MgO]) ? null : value[AnalysisOrder_YS.MgO]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.MgO)}
                    /></span>,
                    SO3: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.SO3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.SO3]) ? null : value[AnalysisOrder_YS.SO3]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.SO3)}
                    /></span>,
                    Na2O: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.Na2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.Na2O]) ? null : value[AnalysisOrder_YS.Na2O]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.Na2O)}
                    /></span>,
                    K2O: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.K2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.K2O]) ? null : value[AnalysisOrder_YS.K2O]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.K2O)}
                    /></span>,
                    Cl: <span><InputNumber

                        style={this.changeStyle(value[AnalysisOrder_YS.Cl])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_YS.Cl]) ? null : value[AnalysisOrder_YS.Cl]}
                        onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.Cl)}
                    /></span>,
                    person: Data[i]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }
        /**中间八行的数据输入**end**/
        const value = Data[3]['data'];
        //最后含量部分
        dataSource.push(
            {
                LX: lx[3],
                IL: <span>~~~
                    {/*    <InputNumber*/}
                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.IL])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.IL]) ? null : value[AnalysisOrder_YS.IL]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, i, AnalysisOrder_YS.IL)}*/}
                    {/*/>*/}
                </span>,
                SiO2: <span>~~~
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.SiO2])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.SiO2]) ? null : value[AnalysisOrder_YS.SiO2]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.SiO2)}*/}
                    {/*/>*/}
                </span>,
                Al2O3: <span>~~~
                    {/*    <InputNumber*/}
                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.Al2O3])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.Al2O3]) ? null : value[AnalysisOrder_YS.Al2O3]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.Al2O3)}*/}
                    {/*/>*/}
                </span>,
                Fe2O3: <span>{isNaN(value[AnalysisOrder_YS.Fe2O3]) ? null : value[AnalysisOrder_YS.Fe2O3]}
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.Fe2O3])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.Fe2O3]) ? null : value[AnalysisOrder_YS.Fe2O3]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.Fe2O3)}*/}
                    {/*/>*/}
                </span>,
                CaO: <span>{isNaN(value[AnalysisOrder_YS.CaO]) ? null : value[AnalysisOrder_YS.CaO]}
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.CaO])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.CaO]) ? null : value[AnalysisOrder_YS.CaO]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.CaO)}*/}
                    {/*/>*/}
                </span>,
                MgO: <span>{isNaN(value[AnalysisOrder_YS.MgO]) ? null : value[AnalysisOrder_YS.MgO]}
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.MgO])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.MgO]) ? null : value[AnalysisOrder_YS.MgO]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.MgO)}*/}
                    {/*/>*/}
                </span>,
                SO3: <span>{isNaN(value[AnalysisOrder_YS.SO3]) ? null : value[AnalysisOrder_YS.SO3]}
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.SO3])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.SO3]) ? null : value[AnalysisOrder_YS.SO3]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.SO3)}*/}
                    {/*/>*/}
                </span>,
                Na2O: <span>~~~
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.Na2O])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.Na2O]) ? null : value[AnalysisOrder_YS.Na2O]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.Na2O)}*/}
                    {/*/>*/}
                </span>,
                K2O: <span>~~~
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.K2O])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.K2O]) ? null : value[AnalysisOrder_YS.K2O]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.K2O)}*/}
                    {/*/>*/}
                </span>,
                Cl: <span>~~~
                    {/*    <InputNumber*/}

                    {/*    style={this.changeStyle(value[AnalysisOrder_YS.Cl])}*/}
                    {/*    defaultValue={''}*/}
                    {/*    value={isNaN(value[AnalysisOrder_YS.Cl]) ? null : value[AnalysisOrder_YS.Cl]}*/}
                    {/*    onChange={event => this.onInputNumberChange2(event, 3, AnalysisOrder_YS.Cl)}*/}
                    {/*/>*/}
                </span>,
                // person: Data[3]['user'],
                // btn_save: <Button type='primary' onClick={() => this.postToHome(3)}>暂存</Button>,
            });
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
        date: state.getIn(['rawMatAnaOriReFMHg', 'date']),
        LX: state.getIn(['rawMatAnaOriReFMHg', 'LX']),
        timeChose: state.getIn(['rawMatAnaOriReFMHg', 'timeChose']),
        data: state.getIn(['rawMatAnaOriReFMHg', 'data']),
        requestFlag: state.getIn(['rawMatAnaOriReFMHg', 'requestFlag']),
        person: state.getIn(['rawMatAnaOriReFMHg', 'person']),
        tableName: state.getIn(['rawMatAnaOriReFMHg', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
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