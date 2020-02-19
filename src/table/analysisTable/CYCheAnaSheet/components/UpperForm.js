import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";
import {AnalysisOrder_UpRipeMaterial,AnalysisOrder_DownRipeMaterial} from "../../../../Constant/TableOrder"

export default class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            t_name:"",
            date:"",
            isNormal: [],
            BanCi : ['滴定值','','消耗数','含量']
            // person: this.props.person
        }
    }

    componentDidMount() {
        this.props.onRef(this);
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
                num:5//4行数据提交
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
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
            }
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
                    };
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
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
            }
        ];

        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const data = [];
        const Data = this.state.Data;
        for (let i = 0; i < 4; i++) {
            const hour = i
            const value = Data[hour]['t_data'];
            data.push(
                {
                    LX: this.state.BanCi[i],
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

                        style={this.changeStyle(value[AnalysisOrder_UpRipeMaterial.Cl])}
                        defaultValue={''}
                        value={isNaN(value[AnalysisOrder_UpRipeMaterial.Cl]) ? null : value[AnalysisOrder_UpRipeMaterial.Cl]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, AnalysisOrder_UpRipeMaterial.Cl)}
                    /></span>,
                    person: Data[hour]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }//end for

        const data_bottom = [];

        const valueBottom =Data[4]['t_data'];

        data_bottom.push(
            {
                1: this.state.BanCi[0],
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
            })




        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={data} pagination={false}/>
                <Table
                    className="pper_table" columns={columns_bottom} bordered
                    dataSource={data_bottom} pagination={false}/>

            </div>
        );
    }

}