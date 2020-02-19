import React, {Component} from 'react';
import {Input, Table, Button, message, InputNumber} from 'antd';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";
import {AnalysisOrder_YS} from "../../../../Constant/TableOrder";


export default class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            t_name:"",
            date:"",
            BanCi: ['滴定值',' ', '消耗数','含量']
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
        NewData[indexH]["t_data"][indexL] = event;

        if ((
            indexL === AnalysisOrder_YS.Fe2O3 ||
            indexL === AnalysisOrder_YS.CaO ||
            indexL === AnalysisOrder_YS.MgO ||
            indexL === AnalysisOrder_YS.SO3) && (
            typeof (NewData[0]["t_data"][indexL]) != 'undefined' &&//滴定值的第一行
            typeof (NewData[1]["t_data"][indexL]) != 'undefined' &&//滴定值的第二行
            typeof (NewData[2]["t_data"][indexL]) != 'undefined')//消耗数
        ) {//如果当前列的3行都不为空的时候进行计算
            NewData[3]['t_data'][indexL] = ((NewData[0]['t_data'][indexL] + NewData[1]['t_data'][indexL]) * NewData[2]['t_data'][indexL] / 2).toFixed(2);
        }

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
    }//end changeStyle

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    postToHome(i) {//i是行数const index = i + this.props.timeChose * 8
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
                num:4//4行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,num: 4})
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
        for (let i = 0; i < 3; i++) {

            const value = Data[i]['t_data'];

            data.push(
                {
                    LX: this.state.BanCi[i],
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
        const value = Data[3]['t_data'];
        //最后含量部分
        data.push(
            {
                LX: this.state.BanCi[3],
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
                Al2O3: <span>```
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
            })

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