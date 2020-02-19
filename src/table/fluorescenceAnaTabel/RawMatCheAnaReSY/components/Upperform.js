import React, {Component} from 'react';
import {Table, Input,InputNumber, Button, message} from 'antd';
import {numCalculate_Initial, numCalculate, autoCalculate} from "../../../../package/NumCalculate"
import {limitDecimals2} from "../../../../package/Limit";
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getHuaYSJsonSaveData} from "../../../../Request/JsonCenter";
import {HuaYSOrder_JC} from "../../../../Constant/TableOrder"
import {autoCalculateRMA_HJ, autoCalculateRMA_IL, updateOperator} from "../../../../Helper/AutoCalculate"
 
export default class UpperForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            startValue: [], //从数据库获取的标准
            endValue: [],
            date: "",
            average: new Array(8*3).fill(null),//平均
            ratio: new Array(8*3).fill(null),//比值
            passRate: new Array(8*3).fill(null),//合格率
            order: [0, 2],//当前表格需要计算合格率的列数顺序
            width: 8,//当前表格需要填值得横向列数和

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
            t_name:nextProps.t_name,
            date:nextProps.date,
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
    updataData(i) {
        //numCalculate会自动计算合格比率，合格率，平均值
        /**传入顺序
         * state 当前修改的数据所在列 当前页面需要计算的总列数
         * */
        const arr = numCalculate(this.state, i);

        this.setState({
            ratio: arr[0],//合格比率
            passRate: arr[1],//合格率
            average: arr[2],//平均值
        })
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        NewData[hour]["t_data"][indexL] = event;
        //IL(56)
        //合计(123456)
        switch (indexL) {
            case HuaYSOrder_JC.SF:
            case HuaYSOrder_JC.IL:
            case HuaYSOrder_JC.SiO2:
            case HuaYSOrder_JC.Al2O3:
                autoCalculateRMA_HJ(hour,NewData);
                break;
            case HuaYSOrder_JC.CaO:
            case HuaYSOrder_JC.MgO:
                autoCalculateRMA_IL(hour,NewData);
                autoCalculateRMA_HJ(hour,NewData);
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
        // const rep = /^(\-)*(\d+)\.(\d{3}).*$/;
        // event = event.replace(rep, '$1$2.$3');
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
                width: "7%"
            },
            {
                title: '水分',
                dataIndex: "SF",
                width: "8%"
            },
            {
                title: 'IL',
                dataIndex: 'IL',
                width: "8%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "8%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "8%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "8%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "8%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "8%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "8%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "6%"
            },
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
                width: "7%"
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
                        style={this.changeStyle(value[HuaYSOrder_JC.SF])}
                        defaultValue={''}
                        value={isNaN(value[HuaYSOrder_JC.SF]) ? null : value[HuaYSOrder_JC.SF]}
                        onBlur={() => this.updataData(HuaYSOrder_JC.SF)}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.SF)}
                    /></span>,
                    IL: <span>{isNaN(value[HuaYSOrder_JC.IL]) ? null : value[HuaYSOrder_JC.IL]}</span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.SiO2])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.SiO2]) ? null : value[HuaYSOrder_JC.SiO2]}
                            onBlur={() => this.updataData(HuaYSOrder_JC.SiO2)}
                            onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.SiO2)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.Al2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.Al2O3]) ? null : value[HuaYSOrder_JC.Al2O3]}
                            onBlur={() => this.updataData(HuaYSOrder_JC.Al2O3)}
                            onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.Al2O3)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.Fe2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.Fe2O3]) ? null : value[HuaYSOrder_JC.Fe2O3]}
                            onBlur={() => this.updataData(HuaYSOrder_JC.Fe2O3)}
                            onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.Fe2O3)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.CaO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.CaO]) ? null : value[HuaYSOrder_JC.CaO]}
                            onBlur={() => this.updataData(5)}
                            onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.CaO)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.MgO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.MgO]) ? null : value[HuaYSOrder_JC.MgO]}
                            onBlur={() => this.updataData(HuaYSOrder_JC.MgO)}
                            onChange={event => this.onInputNumberChange2(event, i, HuaYSOrder_JC.MgO)}
                        /></span>,
                    HJ: <span>{isNaN(value[HuaYSOrder_JC.HJ]) ? null : value[HuaYSOrder_JC.HJ]}</span>,
                    person:
                        Data[hour]['user'],
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
                IL: this.state.average[HuaYSOrder_JC.IL + page],
                SiO2: this.state.average[HuaYSOrder_JC.SiO2 + page],
                Al2O3: this.state.average[HuaYSOrder_JC.Al2O3 + page],
                Fe2O3: this.state.average[HuaYSOrder_JC.Fe2O3 + page],
                CaO: this.state.average[HuaYSOrder_JC.CaO + page],
                MgO: this.state.average[HuaYSOrder_JC.MgO + page],
                HJ: this.state.average[HuaYSOrder_JC.HJ + page],
                // Remarks_list:'--',

            },
            {
                time: '合格率',
                SF: this.state.passRate[page],
                IL: '',
                SiO2: this.state.passRate[HuaYSOrder_JC.SiO2+page],
                Al2O3: '',
                Fe2O3: '',
                CaO: '',
                MgO: '',
                HJ: '',
                // Remarks_list:'--',
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
