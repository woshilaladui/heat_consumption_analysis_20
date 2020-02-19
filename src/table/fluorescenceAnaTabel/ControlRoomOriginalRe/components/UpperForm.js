import React, {Component} from 'react';
import {Table, Button, InputNumber} from 'antd';
import {limitDecimals2,} from '../../../../package/Limit';
import {numCalculate, numCalculate_Initial} from '../../../../package/NumCalculate';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";


class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            width: 9,//当前表格需要填值得横向列数和
            average: new Array(9 * 3).fill(null),//平均
            ratio: new Array(9 * 3).fill(null),//比值
            passRate: new Array(9 * 3).fill(null),//合格率
            isNormal: [],
            order: [0, 1, 2],//当前表格需要计算合格率的列数顺序
            // person: this.props.person
        }
    }

    /**
     * 第一列的时间变化
     */
    /**初始化**/
    componentDidMount() {
        //绑定ref
        // this.props.onRef(this);
    }

    componentWillMount() {
        const allTime = [
            ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
            ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        const temp = JSON.parse(JSON.stringify((this.props.upperData)))

        this.setState({
            Time: [...allTime[this.props.timeChose]],
            Data: temp,
            startValue: this.props.startValue,
            endValue: this.props.endValue,
            timeChose: this.props.timeChose,
            t_name: this.props.t_name,
            date: this.props.date,
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const allTime = [
            ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
            ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
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


    updataData_Initial() {
        //返回比值，合格率，均值
        const {startValue, endValue} = this.state
        const arr = numCalculate_Initial(this.state)
        const ratio = arr[0]//比值
        const passRate = arr[1]//合格率
        const average = arr[2]//均值
        //是否正常的更新部分
        const isNormal = [];
        /**是否正常的判定*start*/
        //循环24小时
        for (let i = 0; i < 24; i++) {
            //每小时的第一列的数据非空且合法
            if (!isNaN(this.state.Data[i]['t_data'][0]) && (this.state.Data[i]['t_data'][0] != null)) {
                //对第一列数据判定是否正常
                if (this.state.Data[i]['t_data'][0] >= startValue[0] && this.state.Data[i]['t_data'][0] <= endValue[0]) {
                    isNormal[i] = '正常';
                } else {
                    isNormal[i] = '异常';
                }
            }
            //数据空或非法
            else {
                isNormal[i] = '';
            }
        }
        /**是否正常的判定*end*/
        this.setState({
            average: average,//比值
            ratio: ratio,//合格率
            passRate: passRate,//均值
            isNormal: isNormal//是否正常
        })
    }

    /***
     * 进行底部的合格率、平均数的计算更新以及是否正常的判断
     **/
    updataData(i) {
        //是否正常的更新部分
        const {Data, startValue, endValue, isNormal} = this.state
        const hour = this.state.timeChose * 8

        if (i === 0) {
            for (let j = hour; j < hour + 8; j++) {
                if (!isNaN(Data[j]['t_data'][0]) && (Data[j]['t_data'][0] != null)) {
                    if (Data[j]['t_data'][0] >= startValue[0] && Data[j]['t_data'][0] <= endValue[0]) {
                        isNormal[j] = '正常';
                    } else {
                        isNormal[j] = '异常';
                    }
                } else {
                    isNormal[j] = '';
                }
            }
        }

        //numCalculate会自动计算合格比率，合格率，平均值
        /**传入顺序
         * state 当前修改的数据所在列 当前页面需要计算的总列数
         * */
        const arr = numCalculate(this.state, i);

        this.setState({
            ratio: arr[0],//合格比率
            passRate: arr[1],//合格率
            average: arr[2],//平均值
            isNormal: isNormal,//是否正常
        })
    }


    /**
     * 表格输入数据变化的监听
     **/
    onInputNumberChange = (value, indexH, indexL) => {

        //更新到仓库 下面还是保持原来的操作
        const {upperData, timeChose, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(upperData))//复制一份出来
        let hour = indexH + timeChose * 8;


        NewData[hour]["t_data"][indexL] = value;
        updateChange(NewData)


        let _NewData = this.state.Data;
        let _hour = indexH + this.props.timeChose * 8;

        _NewData[_hour]["t_data"][indexL] = value;
        this.setState({
            Data: NewData
        });
    };
    // onInputNumberChange3 = (event, indexH, indexL) => {
    //     let NewData = this.state.Data;
    //     let hour = indexH + this.props.timeChose * 8;
    //     // const rep = /^(\-)*(\d+)\.(\d{3}).*$/;
    //     // event = event.replace(rep, '$1$2.$3');
    //     NewData[hour]["t_data"][indexL] = event;
    //     this.setState({
    //         Data: NewData
    //     });
    // };
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
    }

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    postToHome(i) {//i是行数
        const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        const index = i + timeChose * 8
        saveToHome(index, 1, t_name, date, Data)
    }

    /**点击暂存之后上传当前行的数据到后台**end**/


    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '时间',
                width: "10%",
                key: 'time',
                dataIndex: 'time',
            },
            {
                title: '熟料',
                dataIndex: 'ShuL',
                key: 'ShuL',
                children: [{
                    title: 'FCaO/%',
                    width: "7.5%",
                    key: 'FCaO',
                    dataIndex: 'FCaO',
                    render: (value, row, index) => {
                        const obj = {
                            children: value,
                            props: {}
                        };
                        if (index === 9) {
                            obj.props.colSpan = 2;
                        }
                        if (index === 10) {
                            obj.props.colSpan = 2;
                        }
                        if (index === 11) {
                            obj.props.colSpan = 2;
                        }
                        return obj;
                    },
                }, {
                    title: '是否正常',
                    width: "7.5%",
                    key: 'IsNormal',
                    dataIndex: 'IsNormal',
                    render: (value, row, index) => {
                        const obj = {
                            children: value,
                            props: {}
                        };
                        if (index === 9) {
                            obj.props.colSpan = 0
                        }
                        if (index === 10) {
                            obj.props.colSpan = 0;
                        }
                        if (index === 11) {
                            obj.props.colSpan = 0;
                        }
                        return obj;
                    },
                }
                ],

            },
            {
                title: '出磨生料',
                key: 'Chu',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'ChuFineness',
                        dataIndex: 'ChuFineness'
                    },
                    {
                        title: '900孔',
                        width: "7.5%",
                        key: 'Chu900',
                        dataIndex: 'Chu900'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'ChuWater',
                        dataIndex: 'ChuWater'
                    }
                ],
            },
            {
                title: '入磨生料',
                key: 'Ru',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'RuFineness',
                        dataIndex: 'RuFineness'
                    },
                    {
                        title: '900孔',
                        width: "7.5%",
                        key: 'Ru900',
                        dataIndex: 'Ru900'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'RuWater',
                        dataIndex: 'RuWater'
                    }
                ],
            },
            {
                title: '煤粉',
                key: 'Coal',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'CoalFineness',
                        dataIndex: 'CoalFineness'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'CoalWater',
                        dataIndex: 'CoalWater'
                    }
                ],
            },
            {
                title: '人员',
                width: "7.5%",
                key: 'person',
                dataIndex: 'person',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 9) {
                        obj.props.rowSpan = 3;
                    }
                    if (index === 10) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 11) {
                        obj.props.rowSpan = 0;
                    }

                    return obj;
                },
            },
            {
                title: '暂存',
                width: "7.5%",
                key: 'btn_save',
                dataIndex: 'btn_save',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 9) {
                        obj.props.rowSpan = 3;
                    }
                    if (index === 10) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 11) {
                        obj.props.rowSpan = 0;
                    }

                    return obj;
                },
            }
        ];
        /**表头的设计**end**/

        /**第一行里的标准**start**/
        const data = [
            // {
            //     time: '指标',
            //     FCaO: '≤' + this.props.startValue[0],
            //     ChuFineness: '≤' + this.props.startValue[1],
            //     Chu900: '≤' + this.props.startValue[2],
            //     ChuWater: '≤' + this.props.startValue[3],
            //     RuFineness: '≤' + this.props.startValue[4],
            //     Ru900: '≤' + this.props.startValue[5],
            //     RuWater: '≤' + this.props.startValue[6],
            //     CoalFineness: '≤' + this.props.startValue[7],
            //     CoalWater: '≤' + this.props.startValue[8]
            // }
        ];
        /**第一行里的标准**end**/

        // /**限制输入数值位数的函数**start**/
        // const limitDecimals = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        // /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
            // const Data = this.state.Data

        const {upperData, timeChose} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
       // const Data = JSON.parse(JSON.stringify(this.state.Data))

        for (let i = 0; i < 8; i++) {
            const page = this.state.timeChose * 8
            const value = Data[i + page]['t_data']
            data.push(
                {
                    time: this.state.Time[i],
                    FCaO: <span><InputNumber
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(0)}//失焦后对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 0)}
                    /></span>,
                    IsNormal:
                        this.state.isNormal[i + page],
                    ChuFineness: <span><InputNumber
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(1)}//失焦后对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 1)}
                    /></span>,
                    Chu900: <span><InputNumber
                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(2)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 2)}
                    /></span>,
                    ChuWater: <span><InputNumber
                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(3)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 3)}
                    /></span>,
                    RuFineness: <span><InputNumber
                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(4)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 4)}
                    /></span>,
                    Ru900: <span><InputNumber
                        style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(value[5]) ? null : value[5]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(5)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 5)}
                    /></span>,
                    RuWater: <span><InputNumber
                        style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(value[6]) ? null : value[6]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(6)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 6)}
                    /></span>,
                    CoalFineness: <span><InputNumber
                        style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(value[7]) ? null : value[7]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(7)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 7)}
                    /></span>,
                    CoalWater: <span><InputNumber
                        style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(value[8]) ? null : value[8]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        onBlur={() => this.updataData(8)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 8)}
                    /></span>,
                    person: Data[i + page]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }
        /**中间八行的数据输入**end**/

        /**数据的自动处理显示部分**start**/
        const page = this.state.timeChose * this.state.width;
        data.push(
            {
                time: '平均',
                FCaO: this.state.average[page],
                ChuFineness: this.state.average[1 + page],
                Chu900: this.state.average[2 + page],
                ChuWater: this.state.average[3 + page],
                RuFineness: this.state.average[4 + page],
                Ru900: this.state.average[5 + page],
                RuWater: this.state.average[6 + page],
                CoalFineness: this.state.average[7 + page],
                CoalWater: this.state.average[8 + page]
            }, {
                time: '总合格数\/总数',
                FCaO: this.state.ratio[page],
                ChuFineness: this.state.ratio[1 + page],
                Chu900: this.state.ratio[2 + page],
                // ChuWater: this.state.ratio[3 + page],
                // RuFineness: this.state.ratio[4 + page],
                // Ru900: this.state.ratio[5 + page],
                // RuWater: this.state.ratio[6 + page],
                // CoalFineness: this.state.ratio[7 + page],
                // CoalWater: this.state.ratio[8 + page]
            }, {
                time: '合格率',
                FCaO: this.state.passRate[page],
                ChuFineness: this.state.passRate[1 + page],
                Chu900: this.state.passRate[2 + page],
                // ChuWater: this.state.passRate[3 + page],
                // RuFineness: this.state.passRate[4 + page],
                // Ru900: this.state.passRate[5 + page],
                // RuWater: this.state.passRate[6 + page],
                // CoalFineness: this.state.passRate[7 + page],
                // CoalWater: this.state.passRate[8 + page]
            }
        );
        /**数据的自动处理显示部分**end**/


        return (
            <div className="upper">
                {/*表格填写*/}
                <Table className="upper" columns={columns} bordered dataSource={data} pagination={false}/>
            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['ControlRoomOriginalRe', 'date']),
        timeChose: state.getIn(['ControlRoomOriginalRe', 'timeChose']),
        upperData: state.getIn(['ControlRoomOriginalRe', 'upperData']),
        person: state.getIn(['ControlRoomOriginalRe', 'person']),
        t_name: state.getIn(['ControlRoomOriginalRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateUpperData(NewData))
        },
        saveToHome(index, tableType, tableName, date, data) {
            dispatch(actionCreators.saveData({
                index: index,
                tableType: tableType,
                tableName: tableName,
                date: date,
                data: data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);