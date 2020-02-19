import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';
import { HuaYSSave} from "../../../../Request/RequsetCenter"
import { getHuaYSJsonSaveData,getAnalysisJsonSaveData} from "../../../../Request/JsonCenter"
import {autoCalculateRMA_HJ,autoCalculateRMA_IL,updateOperator} from "../../../../Helper/AutoCalculate"
import {URL} from "../../../../Request/Constant";
import {AnalysisOrder_RawMaterial} from "../../../../Constant/TableOrder"


export default class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            t_name:"",
            date:"",
            BanCi : ['滴定值','','消耗数','含量','率值']
            // person: this.props.person
        }
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        this.setState({
            Data: this.props.upperData,
            date: this.props.date,
            t_name: this.props.t_name,
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        this.setState({
            Data: this.props.upperData,
            date: this.props.date,
            t_name: this.props.t_name,
        });
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        NewData[hour]["t_data"][indexL] = event;
        this.setState({
            Data: NewData
        });
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
        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                index:i,
                data:this.state.Data
            }))
            .then((response) => {
                message.info('暂存成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,index:i})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()
    }

    postAllToHome() {
        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                data:this.state.Data,
                num:5//5行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,num: 5})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()

    }

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
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
            }
        ];

        /**表头的设计**end**/


        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const data = [];
        const Data = this.state.Data;
        for (let i = 0; i < 5; i++) {
            const hour = i
            const value = Data[hour]['t_data'];
            data.push(
                {
                    LX: this.state.BanCi[i],
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
                    person: Data[hour]['name'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={data} pagination={false}/>

            </div>
        );
    }

}