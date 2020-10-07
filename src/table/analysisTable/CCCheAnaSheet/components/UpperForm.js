import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';

import {AnalysisOrder_DownRipeMaterial, AnalysisOrder_UpRipeMaterial} from "../../../../Constant/TableOrder";

import * as actionCreators from "../../../analysisTable/CCCheAnaSheet/store/actionCreators";
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
        const {data, updateChange,tableName} = this.props;
        let NewData = deepCopy(data);//复制一份出来


        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;


        }

        //更新KH字段
        //(CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
        if(
            indexL === AnalysisOrder_UpRipeMaterial.CaO
            ||
            indexL === AnalysisOrder_UpRipeMaterial.Fe2O3
            ||
            indexL === AnalysisOrder_UpRipeMaterial.Al2O3
            ||
            indexL === AnalysisOrder_UpRipeMaterial.SiO2
        ){
            //TODO 计算不知道以那个值计算 autoCalculate_KH 出窑熟料化学分析单
            //autoCalculate_KH(NewData,indexH,tableName);
        }

        //更新N字段
        //SiO2/(Al2O3+Fe2O3)
        if(
            indexL === AnalysisOrder_UpRipeMaterial.SiO2
            ||
            indexL === AnalysisOrder_UpRipeMaterial.Al2O3
            ||
            indexL === AnalysisOrder_UpRipeMaterial.Fe2O3
        ){

            //TODO 计算不知道以那个值计算 autoCalculate_N 出窑熟料化学分析单
            //autoCalculate_N(NewData,indexH,tableName);

        }

        //更新P字段
        //Al2O3/ Fe2O3
        if(
            indexL === AnalysisOrder_UpRipeMaterial.Al2O3
            ||
            indexL === AnalysisOrder_UpRipeMaterial.Fe2O3
        ){

            //TODO 计算不知道以那个值计算 autoCalculate_P 出窑熟料化学分析单
            //autoCalculate_P(NewData,indexH,tableName);

        }

        //TODO 计算KH- 但是该表没有fcao 出窑熟料化学分析单


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
    };


    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '类型',
                dataIndex: 'LX',
                render: (value, rows, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if(index === 0){
                        obj.props.rowSpan = 2
                    }
                    if(index === 1){
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

        const columns_bottom = [
            {
                title: '类型',
                dataIndex: '1',
                render: (value, rows, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if(index === 0){
                        obj.props.rowSpan = 2
                    }
                    if(index === 1){
                        obj.props.rowSpan = 0
                    }
                    return obj;
                }
            },
            {
                title: 'KH-',
                dataIndex: 'KH_'
            },
            {
                title: 'KH',
                dataIndex: 'KH'
            },
            {
                title: 'N',
                dataIndex: 'N'
            },
            {
                title: 'P',
                dataIndex: 'P'
            },
            {
                title: '类型',
                dataIndex: '2',
                render: (value, rows, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if(index === 0){
                        obj.props.rowSpan = 1
                    }
                    // if(index === 1){
                    //     obj.props.rowSpan = 0
                    // };
                    return obj;
                }
            },
            {
                title: 'C2S',
                dataIndex: 'C2S'
            },
            {
                title: 'C3S',
                dataIndex: 'C3S'
            },
            {
                title: 'C3A',
                dataIndex: 'C3A'
            },
            {
                title: 'C4AF',
                dataIndex: 'C4AF'
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

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }
        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data,LX} = this.props;
        const Data = deepCopy(data);
        const lx = deepCopy(LX);
        for (let i = 0; i < 4; i++) {
            const hour = i;
            const value = Data[hour]['data'];
            dataSource.push(
                {
                    LX: lx[i],
                    IL: <span><Input
                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.IL])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.IL]) ? null : value[AnalysisOrder_UpRipeMaterial.IL]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.IL)}
                    /></span>,
                    SiO2: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.SiO2])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.SiO2]) ? null : value[AnalysisOrder_UpRipeMaterial.SiO2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.SiO2)}
                    /></span>,
                    Al2O3: <span><Input
                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.Al2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.Al2O3]) ? null : value[AnalysisOrder_UpRipeMaterial.Al2O3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.Al2O3)}
                    /></span>,
                    Fe2O3: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.Fe2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.Fe2O3]) ? null : value[AnalysisOrder_UpRipeMaterial.Fe2O3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.Fe2O3)}
                    /></span>,
                    CaO: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.CaO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.CaO]) ? null : value[AnalysisOrder_UpRipeMaterial.CaO]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.CaO)}
                    /></span>,
                    MgO: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.MgO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.MgO]) ? null : value[AnalysisOrder_UpRipeMaterial.MgO]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.MgO)}
                    /></span>,
                    SO3: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.SO3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.SO3]) ? null : value[AnalysisOrder_UpRipeMaterial.SO3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.SO3)}
                    /></span>,
                    Na2O: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.Na2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.Na2O]) ? null : value[AnalysisOrder_UpRipeMaterial.Na2O]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.Na2O)}
                    /></span>,
                    K2O: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.K2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.K2O]) ? null : value[AnalysisOrder_UpRipeMaterial.K2O]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.K2O)}
                    /></span>,
                    Cl: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.CL_])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.CL_]) ? null : value[AnalysisOrder_UpRipeMaterial.CL_]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.CL_)}
                    /></span>,
                    person: Data[hour]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }//end for

        const data_bottom = [];

        const valueBottom =Data[4]['data'];

        data_bottom.push(
            {
                1: '率值',
                KH_: <span><Input

                    // style={this.changeStyle(value[1])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.KH_]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.KH_]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.KH_)}
                /></span>,
                KH: <span><Input

                    // style={this.changeStyle(value[1])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.KH]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.KH]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.KH)}
                /></span>,
                N: <span><Input
                    // style={this.changeStyle(value[2])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.N]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.N]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.N)}
                /></span>,
                P: <span><Input

                    // style={this.changeStyle(value[3])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.P]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.P]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.P)}
                /></span>,
                2: '矿物组合',
                C2S: <span><Input
                    // style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.C2S]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.C2S]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.C2S)}
                /></span>,
                C3S: <span><Input

                    // style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.C3S]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.C3S]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.C3S)}
                /></span>,
                C3A: <span><Input

                    // style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.C3A]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.C3A]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.C3A)}
                /></span>,
                C4AF: <span><Input

                    // style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(valueBottom[AnalysisOrder_DownRipeMaterial.C4AF]) ? null : valueBottom[AnalysisOrder_DownRipeMaterial.C4AF]}
                    onChange={event => this.onInputNumberChange2(event.target.value, 4, AnalysisOrder_DownRipeMaterial.C4AF)}
                /></span>,
                person: Data[4]['user'],
                btn_save: <Button type='primary' onClick={() => this.postToHome(4)}>暂存</Button>,
            });




        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={dataSource} pagination={false}/>
                <Table
                    className="pper_table" columns={columns_bottom} bordered
                    dataSource={data_bottom} pagination={false}/>

            </div>
        );
    }

}
//定义映射
const mapStateToProps = (state) => {
    return {
        //LX
        date: state.getIn(['CCCheAnaSheet', 'date']),
        LX: state.getIn(['CCCheAnaSheet', 'LX']),
        timeChose: state.getIn(['CCCheAnaSheet', 'timeChose']),
        data: state.getIn(['CCCheAnaSheet', 'data']),
        requestFlag: state.getIn(['CCCheAnaSheet', 'requestFlag']),
        person: state.getIn(['CCCheAnaSheet', 'person']),
        tableName: state.getIn(['CCCheAnaSheet', 'tableName']),
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