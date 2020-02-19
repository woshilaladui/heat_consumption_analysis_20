import React, {Component} from 'react';
import {Table, Input, InputNumber, Button, message} from 'antd';

import {numCalculate_Initial, numCalculate, autoCalculate, divisionCalculate} from "../../../../package/NumCalculate"


export default class UpperForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            Data_CRO: [],//获取原始记录表的数据

            width: 16,//当前表格需要填值得横向列数和
            average: Array(16 * 3).fill(null),//平均
            ratio: Array(16 * 3).fill(null),//比值
            passRate: Array(16 * 3).fill(null),//合格率
            order: [8, 10, 11],//当前表格需要计算合格率的列数顺序
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
            Data_CRO: this.props.upperData_CRO,
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
            Data_CRO: nextProps.upperData_CRO,
            startValue: nextProps.startValue,
            endValue: nextProps.endValue,
            timeChose: nextProps.timeChose,
            t_name: nextProps.t_name,
            date: nextProps.date,

        });
        this.updataData_Initial();//计算比率均值
    }

    //暂存函数
    postToHome(i) {//i是行数
        const {t_name, date} = this.props
        // console.log("看看props和state")
        // console.log(this.props)
        // console.log(this.state)
        // console.log("看看props和state")
        const hour = i + this.props.timeChose * 8;
        const a = this.state.Data[hour]['t_data'];
        const t_data = a.join(',');
        const jsondata = {
            "data": [
                {
                    "date": date,
                    "hour": hour,
                    "t_department": 1,
                    "t_section": 2,
                    "t_name": t_name,
                    "t_type": 1,
                    "t_data": t_data,
                }
            ]
        };
        fetch("/api/HuaYS/save", {
            method: 'POST',
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data['code'] === 0) {
                    message.info('暂存成功');
                    const Data = this.state.Data;
                    Data[hour]['name'] = window.localStorage.name;
                    this.setState({
                        Data: Data
                    })
                }
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    //提交函数
    postAllToHome() {
        const timeChoose = this.props.timeChose * 8;
        for (let i = timeChoose; i < timeChoose + 8; i++) {
            const a = this.state.Data[i]['t_data'];
            const t_data = a.join(',');
            const jsondata = {
                "data": [
                    {
                        "date": this.props.riqi,
                        "hour": i,
                        "t_name": "RYS",
                        "t_type": 1,
                        "t_data": t_data,
                        "name": window.localStorage.name,
                    }
                ]
            };
            fetch("/api/HuaYS/save", {
                method: 'POST',
                body: JSON.stringify(jsondata), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.authorization,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['code'] === 0) {
                        message.info('提交' + i + '点钟数据成功');
                        const Data = this.state.Data;
                        Data[i]['name'] = window.localStorage.name;
                        this.setState({
                            Data: Data
                        })
                    } else if (data['code'] === 1) {
                        message.error('提交' + i + '点钟数据失败');
                    }
                })
                .catch(error => console.error('Error:', error))
        }
    }

    updataData_Initial() {
        //返回比值，合格率，均值


        // fCaOData[hour]


        console.log(0)
        console.log(this.props.upperData_CRO)
        console.log(0)
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
        let fCaODate = this.state.Data_CRO;

        let hour = indexH + this.props.timeChose * 8;
        NewData[hour]["t_data"][indexL] = event;
        /**
         * 合计(6) 12345
         * fCaO(7)从T16中获取对应值
         * KH(8)1234
         * KH-(9)12347
         * N(10) 123
         * P(11) 23
         */

        switch (indexL) {
            case 1:
            case 2:
            case 3:
                //更新合计
                this.updataHJ(hour,NewData);
                //更新N
                this.updataN(hour,NewData);

                //更新P Al2O3/ Fe2O3
                this.updataP(hour,NewData);

                //更新KH
                this.updataKH(hour,NewData);
                //更新KH-
                this.updataKH_(hour,NewData,fCaODate);
                break;
            case 4:
                //更新合计
                this.updataHJ(hour,NewData);

                //更新KH
                this.updataKH(hour,NewData);

                //更新KH-
                this.updataKH_(hour,NewData,fCaODate);

                break
            case 5:
                //更新合计内容
                this.updataHJ(hour,NewData);
                break
        }

        NewData[hour]["t_data"][indexL] = event;
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

    updataHJ(hour, NewData) {
        NewData[hour]["t_data"][6] = autoCalculate(
            [
                [NewData[hour]["t_data"][1], 1],
                [NewData[hour]["t_data"][2], 1],
                [NewData[hour]["t_data"][3], 1],
                [NewData[hour]["t_data"][4], 1],
                [NewData[hour]["t_data"][5], 1],
            ]
        );
    }


    updataKH(hour, NewData) {
        //更新KH
        //temp1为分子，temp2为分母
        let temp1, temp2;

        //计算CaO-(1.65* Al2O3+0.35* Fe2O3))
        temp1 = autoCalculate(
            [
                [NewData[hour]["t_data"][4], 1],
                [-NewData[hour]["t_data"][2], 1.65],
                [-NewData[hour]["t_data"][3], 0.35],
            ]
        );

        //计算2.8* SiO2
        temp2 = autoCalculate(
            [
                [NewData[hour]["t_data"][1], 2.8],
            ]
        );

        //更新KH (CaO-(1.65* Al2O3+0.35* Fe2O3))/(2.8* SiO2)
        NewData[hour]["t_data"][8] = divisionCalculate(
            temp1, temp2
        );

    }

    updataKH_(hour, NewData,fCaODate) {
        //更新KH- (temp1-fCao)/temp2

        let temp1, temp2,temp3;

        //计算CaO-(1.65* Al2O3+0.35* Fe2O3))
        temp1 = autoCalculate(
            [
                [NewData[hour]["t_data"][4], 1],
                [-NewData[hour]["t_data"][2], 1.65],
                [-NewData[hour]["t_data"][3], 0.35],
            ]
        );

        //计算2.8* SiO2
        temp2 = autoCalculate(
            [
                [NewData[hour]["t_data"][1], 2.8],
            ]
        );

         temp3 = autoCalculate(
            [
                [temp1, 1],
                [-fCaODate[hour]["t_data"][0], 1],
            ]
        );
        // {
        //     num = ''
        //     break
        // }


        NewData[hour]["t_data"][9] = divisionCalculate(
            temp3, temp2
        );
    }

    updataN(hour, NewData) {
        //N(10) 123
        //更新N
        //先计算Al2O3+Fe2O3
        let temp = autoCalculate(
            [
                [NewData[hour]["t_data"][2], 1],
                [NewData[hour]["t_data"][3], 1],

            ]
        );
        //更新N SiO2/(Al2O3+Fe2O3)
        NewData[hour]["t_data"][10] = divisionCalculate(
            NewData[hour]["t_data"][1], temp
        );

        //更新P Al2O3/ Fe2O3
        NewData[hour]["t_data"][11] = divisionCalculate(
            NewData[hour]["t_data"][2], NewData[hour]["t_data"][3]
        );
    }

    updataP(hour, NewData) {
        //更新P Al2O3/ Fe2O3
        NewData[hour]["t_data"][11] = divisionCalculate(
            NewData[hour]["t_data"][2], NewData[hour]["t_data"][3]
        );
    }


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
                width: "3%"
            },
            {
                title: 'SJ',
                dataIndex: "SJ",
                width: "6%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "6%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "6%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "6%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "6%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "6%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "6%"
            },
            {
                title: 'fCaO',
                dataIndex: 'fCaO',
                width: "6%"
            },
            {
                title: 'KH',
                dataIndex: 'KH',
                width: "6%"
            },
            {
                title: 'KH_',
                dataIndex: 'KH_',
                width: "6%"
            },
            {
                title: 'N',
                dataIndex: 'N',
                width: "6%"
            },
            {
                title: 'P',
                dataIndex: 'P',
                width: "6%"
            },
            {
                title: 'C3S',
                dataIndex: 'C3S',
                width: "6%"
            },
            {
                title: 'C2S',
                dataIndex: 'C2S',
                width: "6%"
            },
            {
                title: 'C3A',
                dataIndex: 'C3A',
                width: "6%"
            },
            {
                title: 'C4AF',
                dataIndex: 'C4AF',
                width: "6%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "3%"
            },
            {
                title: '暂存',
                key: 'btn_save',
                dataIndex: 'btn_save',
                width: "4%"
            }
        ];

        const data = [];



            //中间八行的数据输入
        const Data = this.state.Data;
        const Data_CRO = this.state.Data_CRO;


        for (let i = 0; i < 8; i++) {
            let hour = i + this.props.timeChose * 8;
            const value = Data[hour]['t_data'];
            const value_fCaO = Data_CRO[hour]['t_data'][0];
            data.push(
                {
                    time: this.state.Time[i],
                    SJ: <span><InputNumber
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        onBlur={() => this.updataData(this.props.standard)}
                        onChange={event => this.onInputNumberChange2(event, i, 0)}
                    /></span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[1])}
                            defaultValue={''}
                            value={isNaN(value[1]) ? null : value[1]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 1)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[2])}
                            defaultValue={''}
                            value={isNaN(value[2]) ? null : value[2]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 2)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[3])}
                            defaultValue={''}
                            value={isNaN(value[3]) ? null : value[3]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 3)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[4])}
                            defaultValue={''}
                            value={isNaN(value[4]) ? null : value[4]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 4)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[5])}
                            defaultValue={''}
                            value={isNaN(value[5]) ? null : value[5]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 5)}
                        /></span>,
                    HJ:
                        <span>{isNaN(value[6]) ? null : value[6]}</span>,
                    fCaO:
                        <span>{isNaN(value_fCaO) ? null : value_fCaO}</span>,
                    KH:
                        <span>{isNaN(value[8]) ? null : value[8]}</span>,
                    KH_:
                        <span>{isNaN(value[9]) ? null : value[9]}</span>,
                    N:
                        <span>{isNaN(value[10]) ? null : value[10]}</span>,
                    P:
                        <span>{isNaN(value[11]) ? null : value[11]}</span>,
                    C3S:
                        <span><InputNumber
                            style={this.changeStyle(value[12])}
                            defaultValue={''}
                            value={isNaN(value[12]) ? null : value[12]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 12)}
                        /></span>,
                    C2S:
                        <span><InputNumber
                            style={this.changeStyle(value[13])}
                            defaultValue={''}
                            value={isNaN(value[13]) ? null : value[13]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 13)}
                        /></span>,
                    C3A:
                        <span><InputNumber
                            style={this.changeStyle(value[14])}
                            defaultValue={''}
                            value={isNaN(value[14]) ? null : value[14]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 14)}
                        /></span>,
                    C4AF:
                        <span><InputNumber
                            style={this.changeStyle(value[15])}
                            defaultValue={''}
                            value={isNaN(value[15]) ? null : value[15]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event, i, 15)}
                        /></span>,
                    person:
                        Data[hour]['name'],
                    btn_save:
                        <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        //数据的自动处理显示部分
        const page = this.state.timeChose * this.state.width;
        console.log(this.state.average)
        data.push(
            {
                time: '平均',
                SJ: this.state.average[page],
                SiO2: this.state.average[1 + page],
                Al2O3: this.state.average[2 + page],
                Fe2O3: this.state.average[3 + page],
                CaO: this.state.average[4 + page],
                MgO: this.state.average[5 + page],
                HJ: this.state.average[6 + page],
                fCaO: this.state.average[7 + page],
                KH: this.state.average[8 + page],
                KH_: this.state.average[9 + page],
                N: this.state.average[10 + page],
                P: this.state.average[11 + page],
                C3S: this.state.average[12 + page],
                C2S: this.state.average[13 + page],
                C3A: this.state.average[14 + page],
                C4AF: this.state.average[15 + page],
                // Remarks_list:'--',

            },
            {
                time: '合格率',
                SJ: '',
                SiO2: '',
                Al2O3: '',
                Fe2O3: '',
                CaO: '',
                MgO: '',
                HJ: '',
                fCaO: '',
                KH: this.state.passRate[8 + page],
                KH_: '',
                N: this.state.passRate[9 + page],
                P: this.state.passRate[10 + page],
                C3S: '',
                C2S: '',
                C3A: '',
                C4AF: '',
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