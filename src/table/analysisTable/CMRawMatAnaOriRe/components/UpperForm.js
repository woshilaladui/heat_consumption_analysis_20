import React, {Component} from 'react';
import {Input, Table,} from 'antd';

import {AnalysisOrder_RawMaterial, HuaYSOrder_CMRYSL} from "../../../../Constant/TableOrder"

import * as actionCreators from "../../../analysisTable/CMRawMatAnaOriRe/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";




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
        const {data, updateChange,tableName} = this.props;
        let NewData = deepCopy(data);//复制一份出来


        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;


        }

        //更新KH字段
        //(CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
        if(
            indexL === AnalysisOrder_RawMaterial.CaO
            ||
            indexL === AnalysisOrder_RawMaterial.Fe2O3
            ||
            indexL === AnalysisOrder_RawMaterial.Al2O3
            ||
            indexL === AnalysisOrder_RawMaterial.SiO2
        ){
            //TODO 计算不知道以那个值计算 autoCalculate_KH 出磨生料分析原始记录
            //autoCalculate_KH(NewData,indexH,tableName);
        }

        //更新N字段
        //SiO2/(Al2O3+Fe2O3)
        if(
            indexL === AnalysisOrder_RawMaterial.SiO2
            ||
            indexL === AnalysisOrder_RawMaterial.Al2O3
            ||
            indexL === AnalysisOrder_RawMaterial.Fe2O3
        ){

            //TODO 计算不知道以那个值计算 autoCalculate_N 出磨生料分析原始记录
            //autoCalculate_N(NewData,indexH,tableName);

        }

        //更新P字段
        //Al2O3/ Fe2O3
        if(
            indexL === AnalysisOrder_RawMaterial.Al2O3
            ||
            indexL === AnalysisOrder_RawMaterial.Fe2O3
        ){

            //TODO 计算不知道以那个值计算 autoCalculate_P 出磨生料分析原始记录
            //autoCalculate_P(NewData,indexH,tableName);

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
    };



    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '类型',
                dataIndex: 'LX',//['滴定值','','消耗数','含量','率值']
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


        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data,LX} = this.props;
        const Data = deepCopy(data);
        const lx = deepCopy(LX);

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }


        for (let i = 0; i < 4; i++) {
            const hour = i
            const value = Data[hour]['data'];
            dataSource.push(
                {
                    LX: lx[i],
                    IL: <span><Input
                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.IL])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.IL]) ? null : value[AnalysisOrder_RawMaterial.IL]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.IL)}
                    /></span>,
                    SiO2: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.SiO2])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[AnalysisOrder_RawMaterial.SiO2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.SiO2)}
                    /></span>,
                    Al2O3: <span><Input
                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.Al2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.Al2O3]) ? null : value[AnalysisOrder_RawMaterial.Al2O3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.Al2O3)}
                    /></span>,
                    Fe2O3: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.Fe2O3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.Fe2O3]) ? null : value[AnalysisOrder_RawMaterial.Fe2O3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.Fe2O3)}
                    /></span>,
                    CaO: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.CaO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.CaO]) ? null : value[AnalysisOrder_RawMaterial.CaO]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.CaO)}
                    /></span>,
                    MgO: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.MgO])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.MgO]) ? null : value[AnalysisOrder_RawMaterial.MgO]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.MgO)}
                    /></span>,
                    SO3: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.SO3])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.SO3]) ? null : value[AnalysisOrder_RawMaterial.SO3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.SO3)}
                    /></span>,
                    Na2O: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.Na2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.Na2O]) ? null : value[AnalysisOrder_RawMaterial.Na2O]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.Na2O)}
                    /></span>,
                    K2O: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.K2O])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.K2O]) ? null : value[AnalysisOrder_RawMaterial.K2O]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.K2O)}
                    /></span>,
                    Cl: <span><Input

                        style={this.changeStyle(value[AnalysisOrder_RawMaterial.CL_])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_RawMaterial.CL_]) ? null : value[AnalysisOrder_RawMaterial.CL_]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_RawMaterial.CL_)}
                    /></span>,
                    person: Data[i]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }

        const value = Data[4]['data'];
        dataSource.push(
            {
                LX: lx[4],
                IL: <span>KH</span>,
                SiO2: <span>{value[1]}</span>,
                Al2O3: <span>N</span>,
                Fe2O3: <span>{value[3]}</span>,
                CaO: <span>P</span>,
                MgO: <span>{value[5]}</span>,
                SO3: <span>~~~</span>,
                Na2O: <span>~~~</span>,
                K2O: <span>~~~</span>,
                Cl: <span>~~~</span>,
                person: "",
                btn_save:"",
            }
        );

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
        date: state.getIn(['CMRawMatAnaOriRe', 'date']),
        LX: state.getIn(['CMRawMatAnaOriRe', 'LX']),
        timeChose: state.getIn(['CMRawMatAnaOriRe', 'timeChose']),
        data: state.getIn(['CMRawMatAnaOriRe', 'data']),
        requestFlag: state.getIn(['CMRawMatAnaOriRe', 'requestFlag']),
        person: state.getIn(['CMRawMatAnaOriRe', 'person']),
        tableName: state.getIn(['CMRawMatAnaOriRe', 'tableName']),
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