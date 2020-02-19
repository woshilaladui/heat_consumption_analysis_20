// import React, {Component} from 'react';
// import {Table, Input, InputNumber, Button, message} from 'antd';
//import {numCalculate_Initial, numCalculate, autoCalculate, divisionCalculate} from "../../../../package/NumCalculate"
// import {limitDecimals2, limitDecimals3} from "../../../../package/Limit"

import React, {Component} from 'react';
import {Table, Input, Button, message, InputNumber} from 'antd';
import {numCalculate_Initial, numCalculate, autoCalculate} from "../../../../package/NumCalculate"
import {limitDecimals2} from "../../../../package/Limit";
import {URL} from "../../../../Request/Constant"
import { HuaYSSave} from "../../../../Request/RequsetCenter"
import { getHuaYSJsonSaveData} from "../../../../Request/JsonCenter"
import {HuaYSOrder_CMRYSL} from "../../../../Constant/TableOrder"
import {autoCalculateRMC_HJ,autoCalculateRMC_IL,updateOperator,autoCalculateRMC_KH,autoCalculateRMC_P,autoCalculateRMC_N} from "../../../../Helper/AutoCalculate"

export default class UpperForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            t_name: '',
            date: '',
            timeChose: 0,
            width: 13,//当前表格需要填值得横向列数和
            average: Array(13 * 3).fill(null),//平均
            ratio: Array(13 * 3).fill(null),//比值
            passRate: Array(13 * 3).fill(null),//合格率
            order: [10, 11, 12],//当前表格需要计算合格率的列数顺序
        }
    }


    /**初始化**/
    componentDidMount() {
        //绑定ref
        this.props.onRef(this);
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        const allTime = [
            ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
            ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        this.setState({
            Time: [...allTime[this.props.timeChose]],
            Data: this.props.upperData,
            startValue: this.props.startValue,
            endValue: this.props.endValue,
            timeChose: this.props.timeChose,
            t_name: this.props.t_name,
            date: this.props.date,
        })
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const allTime = [
            ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
            ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        this.setState({
            Time: [...allTime[nextProps.timeChose]],
            Data: nextProps.upperData,
            startValue: nextProps.startValue,
            endValue: nextProps.endValue,
            timeChose: nextProps.timeChose,
            t_name: nextProps.t_name,
            date: nextProps.date,
        });
        this.updataData_Initial();
    }

    //暂存函数
    postToHome(i) {//i是行数
        const index = i + this.props.timeChose * 8
        HuaYSSave(
            URL.HUAYS_SAVE,
            getHuaYSJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                index:index,
                data:this.state.Data
            }))
            .then((response) => {
                message.info('暂存成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,index:index})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()
    }

    //提交函数
    postAllToHome() {
        HuaYSSave(
            URL.HUAYS_SAVE,
            getHuaYSJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                data:this.state.Data,
                num:24//24行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                //获取存放的人
                updateOperator({Data:this.state.Data})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()
    }

    updataData_Initial() {
        //返回比值，合格率，均值
        console.log(this.state.average)
        const arr = numCalculate_Initial(this.state)
        const ratio = arr[0]//比值
        const passRate = arr[1]//合格率
        const average = arr[2]//均值
        /**是否正常的判定*end*/
        this.setState({
            average: average,//比值
            ratio: ratio,//合格率
            passRate: passRate,//均值
        })
    }

    /***
     * 进行底部的合格率、平均数的计算更新以及是否正常的判断
     **/
    updataData() {
        //numCalculate会自动计算合格比率，合格率，平均值
        /**传入顺序
         * state 当前修改的数据所在列 当前页面需要计算的总列数
         * */
        const arr = numCalculate(this.state);
        this.setState({
            ratio: arr[0],//合格比率
            passRate: arr[1],//合格率
            average: arr[2],//平均值
        })
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     * 参数顺序  输入的数值，行数，列数
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        NewData[hour]["t_data"][indexL] = event;
        //数据自动处理
        //IL(1):56
        //合计(7):123456
        //KH(10):2345
        //N(11):234
        //P(12):34
        //Na2O:有问题待处理
        /**
         * 1    合计(7)
         * 2    合计(7) KH(10) N(11)
         * 3    合计(7) KH(10) N(11) P(12)
         * 4    合计(7) KH(10) N(11) P(12)
         * 5    IL(1) 合计(7) KH(10)
         * 6    IL(1) 合计(7)
         * **/
        switch (indexL) {//触发自动计算函数
            case HuaYSOrder_CMRYSL.SF:
            case HuaYSOrder_CMRYSL.IL:
            case HuaYSOrder_CMRYSL.SiO2:
            case HuaYSOrder_CMRYSL.Al2O3:
            case HuaYSOrder_CMRYSL.Fe2O3:
            case HuaYSOrder_CMRYSL.CaO:
            case HuaYSOrder_CMRYSL.MgO:
                autoCalculateRMC_HJ(hour,NewData);
                autoCalculateRMC_KH(hour,NewData);
                autoCalculateRMC_N(hour,NewData);
                autoCalculateRMC_P(hour,NewData);
                // break;
            // case HuaYSOrder_CMRYSL.CaO:
            // case HuaYSOrder_CMRYSL.MgO:
                autoCalculateRMC_IL(hour,NewData);


                break;
            default:
                break;
        }

        this.setState({
            Data: NewData
        });
    };
    onInputNumberChange3 = (event, indexH, indexL) => {
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
            if (isNaN(value) || value > 100) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }
    };

    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
                width: "5.5%"
            },
            {
                title: '水分',
                dataIndex: "SF",
                width: "5.5%"
            },
            {
                title: 'IL',
                dataIndex: 'IL',
                width: "5.5%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "5.5%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "5.5%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "5.5%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "5.5%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "5.5%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "5.5%"
            },
            {
                title: 'K2O',
                dataIndex: 'K2O',
                width: "5.5%"
            },
            {
                title: 'Na2O',
                dataIndex: 'Na2O',
                width: "5.5%"
            },
            {
                title: 'KH',
                dataIndex: 'KH',
                width: "5.5%"
            },
            {
                title: 'N',
                dataIndex: 'N',
                width: "5.5%"
            },
            {
                title: 'P',
                dataIndex: 'P',
                width: "5.5%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "5%"
            },
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
                width: "6%"
            }
        ];

        const data = [];


            //中间八行的数据输入
        const Data = this.state.Data;
        for (let i = 0; i < 8; i++) {
            let hour = i + this.props.timeChose * 8;
            const value = Data[hour]['t_data'];
            data.push(
                {
                    time: this.state.Time[i],
                    SF: <span><InputNumber
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        onBlur={() => this.updataData()}
                        onChange={event => this.onInputNumberChange2(event, i, 0)}
                    /></span>,
                    IL:
                        <span>{isNaN(value[1]) ? null : value[1]}</span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[2])}
                            defaultValue={''}
                            value={isNaN(value[2]) ? null : value[2]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(2)}
                            onChange={event => this.onInputNumberChange2(event, i, 2)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[3])}
                            defaultValue={''}
                            value={isNaN(value[3]) ? null : value[3]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(3)}
                            onChange={event => this.onInputNumberChange2(event, i, 3)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[4])}
                            defaultValue={''}
                            value={isNaN(value[4]) ? null : value[4]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(4)}
                            onChange={event => this.onInputNumberChange2(event, i, 4)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[5])}
                            defaultValue={''}
                            value={isNaN(value[5]) ? null : value[5]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(5)}
                            onChange={event => this.onInputNumberChange2(event, i, 5)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[6])}
                            defaultValue={''}
                            value={isNaN(value[6]) ? null : value[6]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(6)}
                            onChange={event => this.onInputNumberChange2(event, i, 6)}
                        /></span>,
                    HJ:
                        <span>{isNaN(value[7]) ? null : value[7]}</span>,
                    K2O:
                        <span><InputNumber
                            style={this.changeStyle(value[8])}
                            defaultValue={''}
                            value={isNaN(value[8]) ? null : value[8]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(8)}
                            onChange={event => this.onInputNumberChange2(event, i, 8)}
                        /></span>,
                    Na2O:
                        <span><InputNumber
                            style={this.changeStyle(value[9])}
                            defaultValue={''}
                            value={isNaN(value[9]) ? null : value[9]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数
                            onBlur={() => this.updataData(9)}
                            onChange={event => this.onInputNumberChange2(event, i, 9)}
                        /></span>,
                    KH:
                        <span>{isNaN(value[10]) ? null : value[10]}</span>,
                    N:
                        <span>{isNaN(value[11]) ? null : value[11]}</span>,
                    P:
                        <span>{isNaN(value[12]) ? null : value[12]}</span>,
                    person:
                        Data[hour]['name'],
                    btn_save:
                        <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        //数据的自动处理显示部分
        const page = this.state.timeChose * this.state.width;
        data.push(
            {
                time: '平均',
                SF: this.state.average[page],
                IL: this.state.average[1 + page],
                SiO2: this.state.average[2 + page],
                Al2O3: this.state.average[3 + page],
                Fe2O3: this.state.average[4 + page],
                CaO: this.state.average[5 + page],
                MgO: this.state.average[6 + page],
                HJ: this.state.average[7 + page],
                K2O: this.state.average[8 + page],
                Na2O: this.state.average[9 + page],
                KH: this.state.average[10 + page],
                N: this.state.average[11 + page],
                P: this.state.average[12 + page],

            },
            {
                time: '合格率',
                SF: '',
                IL: '',
                SiO2: '',
                Al2O3: '',
                Fe2O3: '',
                CaO: '',
                MgO: '',
                HJ: '',
                K2O: '',
                Na2O: '',
                KH: this.state.passRate[10 + page],
                N: this.state.passRate[11 + page],
                P: this.state.passRate[12 + page],
            }
        );


        return (
            <div className="upper">
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={data} pagination={false}/>
            </div>
        );
    }
}
