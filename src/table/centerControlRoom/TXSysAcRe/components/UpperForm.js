import React, {Component} from 'react';
import {Table, Button, Tabs, Input} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            TabChoose: 0,
        }
    }
    componentWillMount() {
        const allTime = [
            ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
            ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        ];
        this.setState({
            Time: [...allTime[this.props.timeChose]],
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
        });
    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/

    onInputNumberChange2 = (value, indexH, indexL) => {
        const {upperData, timeChose, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(upperData))//复制一份出来
        let hour = indexH + timeChose * 8;
        NewData[hour]["t_data"][indexL] = value;
        updateChange(NewData)
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
        const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        const index = i + timeChose * 8
        saveToHome(index, 1, t_name, date, Data);
    }

    /**点击暂存之后上传当前行的数据到后台**end**/


    render() {
        /**表头的设计**start**/
        const columns_tab1 = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '8%',
            },
            {
                title: '还原剂1#罐',
                dataIndex: 'HYJ1G',
                children: [
                    {
                        title: '温度℃',
                        dataIndex: 'HYJ1WD',
                        width: '8%'
                    },
                    {
                        title: '环境氨浓度ppm',
                        dataIndex: 'HYJ1HJAND',
                        width: '8%'
                    },
                ]
            },
            {
                title: '还原剂2#罐',
                dataIndex: 'HYJ2G',
                children: [
                    {
                        title: '温度℃',
                        dataIndex: 'HYJ2WD',
                        width: '8%'
                    },
                    {
                        title: '环境氨浓度ppm',
                        dataIndex: 'HYJ2HJAND',
                        width: '8%'
                    },
                ]
            },
            {
                title: '氨水浓度',
                dataIndex: 'ASND',
                width: '8%'
            },
            {
                title: '氨水流量NH3/h',
                dataIndex: 'ASLL',
                width: '8%'
            },
            {
                title: '氨逃逸量ppm',
                dataIndex: 'ATYL',
                width: '8%'
            },
            {
                title: '喷淋泵状态',
                dataIndex: 'PLBZT',
                width: '8%'
            },
            {
                title: '氨气吸收罐液位m',
                dataIndex: 'AQXSGYW',
                width: '8%'
            },
            {
                title: '喷淋用水罐液位m',
                dataIndex: 'PLYSGYW',
                width: '8%'
            },
            {
                title: '人员',
                dataIndex: 'person',
                width: '6%',
            }, {
                title: '暂存',
                dataIndex: 'btn_save',
                width: '6%',
            }
        ];
        const columns_tab2 = [
                {
                    title: '时间',
                    dataIndex: 'time',
                    width: '8%',
                },
                {
                    title: '气路压力mpa',
                    dataIndex: 'QLYL',
                    width: '8%'
                },
                {
                    title: '液路压力mpa',
                    dataIndex: 'YLYL',
                    width: '8%'
                },
                {
                    title: '供应泵电流A',
                    dataIndex: 'GYBDL',
                    children: [
                        {
                            title: '1#泵',
                            dataIndex: 'GYBDLB1',
                            width: '8%'
                        },
                        {
                            title: '2#泵',
                            dataIndex: 'GYBDLB2',
                            width: '8%'
                        },
                    ]
                },
                {
                    title: '供应泵转速Hz',
                    dataIndex: 'GYBZS',
                    children: [
                        {
                            title: '1#泵',
                            dataIndex: 'GYBZSB1',
                            width: '8%'
                        },
                        {
                            title: '2#泵',
                            dataIndex: 'GYBZSB2',
                            width: '8%'
                        },
                    ]
                },
                {
                    title: '喷枪使用情况',
                    dataIndex: 'PQSYQK',
                    children: [
                        {
                            title: '编号',
                            dataIndex: 'BH',
                            width: '8%'
                        },
                        {
                            title: '数量',
                            dataIndex: 'SL',
                            width: '8%'
                        },
                    ]
                },
                {
                    title: 'NOX浓度mg/m3',
                    dataIndex: 'NOXND',
                    children: [
                        {
                            title: '目标值',
                            dataIndex: 'MBZ',
                            width: '8%'
                        },
                        {
                            title: '实际值',
                            dataIndex: 'SJZ',
                            width: '8%'
                        },
                    ]
                },
                {
                    title: '人员',
                    dataIndex: 'person',
                    width: '6%',
                },
                {
                    title: '暂存',
                    dataIndex: 'btn_save',
                    width: '6%',
                }
            ]
        ;
        /**表头的设计**end**/

        /**限制输入数值位数的函数**start**/
        const limitDecimals = (value: string | number): string => {
            const reg = /^(\-)*(\d+)\.(\d\d).*$/;
            if (typeof value === 'string') {
                return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
            } else if (typeof value === 'number') {
                return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
            } else {
                return ''
            }
        };
        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const data_tab1 = [];
        const {upperData, timeChose} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        for (let i = 0; i < 8; i++) {
            const hour = i + timeChose * 8;
            const value = Data[hour]['t_data'];
            data_tab1.push(
                {
                    time: this.state.Time[i],
                    HYJ1WD: <span><Input
                        // style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    HYJ1HJAND: <span><Input
                        // style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                    /></span>,
                    HYJ2WD: <span><Input
                        // style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                    /></span>,

                    HYJ2HJAND: <span><Input
                        // style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                    /></span>,

                    ASND: <span><Input
                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,

                    ASLL: <span><Input
                        // style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(value[5]) ? null : value[5]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 5)}
                    /></span>,

                    ATYL: <span><Input
                        // style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(value[6]) ? null : value[6]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 6)}
                    /></span>,

                    PLBZT: <span><Input
                        // style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(value[7]) ? null : value[7]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 7)}
                    /></span>,

                    AQXSGYW: <span><Input
                        // style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(value[8]) ? null : value[8]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 8)}
                    /></span>,
                    PLYSGYW: <span><Input
                        // style={this.changeStyle(value[9])}
                        defaultValue={''}
                        value={isNaN(value[9]) ? null : value[9]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 9)}
                    /></span>,

                    person: Data[hour]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }
        const data_tab2 = [];
        for (let i = 0; i < 8; i++) {
            const hour = i + timeChose * 8;
            const value = Data[hour]['t_data'];
            const tab = 10;
            // console.log(value[0]);
            data_tab2.push(
                {
                    time: this.state.Time[i],
                    QLYL: <span><Input
                        // style={this.changeStyle(value[tab])}
                        value={isNaN(value[tab]) ? null : value[tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, tab)}
                    /></span>,
                    YLYL: <span><Input
                        // style={this.changeStyle(value[1+tab])}
                        value={isNaN(value[tab + 1]) ? null : value[tab + 1]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1 + tab)}
                    /></span>,
                    GYBDLB1: <span><Input
                        // style={this.changeStyle(value[2+tab])}
                        value={isNaN(value[tab + 2]) ? null : value[tab + 2]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2 + tab)}
                    /></span>,
                    GYBDLB2: <span><Input
                        // style={this.changeStyle(value[3+tab])}
                        value={isNaN(value[tab + 3]) ? null : value[tab + 3]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3 + tab)}
                    /></span>,
                    GYBZSB1: <span><Input
                        // style={this.changeStyle(value[4+tab])}
                        value={isNaN(value[tab + 4]) ? null : value[tab + 4]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4 + tab)}
                    /></span>,
                    GYBZSB2: <span><Input
                        // style={this.changeStyle(value[5+tab])}
                        value={isNaN(value[tab + 5]) ? null : value[tab + 5]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 5 + tab)}
                    /></span>,
                    BH: <span><Input
                        // style={this.changeStyle(value[6+tab])}
                        value={isNaN(value[tab + 6]) ? null : value[tab + 6]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 6 + tab)}
                    /></span>,
                    SL: <span><Input
                        // style={this.changeStyle(value[7+tab])}
                        value={isNaN(value[tab + 7]) ? null : value[tab + 7]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 7 + tab)}
                    /></span>,
                    MBZ: <span><Input
                        // style={this.changeStyle(value[8+tab])}
                        value={isNaN(value[tab + 8]) ? null : value[tab + 8]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 8 + tab)}
                    /></span>,
                    SJZ: <span><Input
                        // style={this.changeStyle(value[9+tab])}
                        value={isNaN(value[tab + 9]) ? null : value[tab + 9]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 9 + tab)}
                    /></span>,

                    person: Data[hour]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        /**中间八行的数据输入**end**/

        /**数据的自动处理显示部分**end**/
        function callback(key) {
            this.setState({
                TabChoose: key
            });
        }

        return (
            <div className="upper">
                {/*表格填写*/}
                <Tabs defaultActiveKey="0" onChange={callback.bind(this)}>
                    <TabPane tab="表1" key="0"><Table
                        className="upper_table1" columns={columns_tab1} bordered
                        dataSource={data_tab1} pagination={false}/>
                    </TabPane>
                    <TabPane tab="表2" key="1"><Table
                        className="upper_table2" columns={columns_tab2} bordered
                        dataSource={data_tab2} pagination={false}/>
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['TXSysAcRe', 'date']),
        timeChose: state.getIn(['TXSysAcRe', 'timeChose']),
        upperData: state.getIn(['TXSysAcRe', 'upperData']),
        bottomData: state.getIn(['TXSysAcRe', 'bottomData']),
        person: state.getIn(['TXSysAcRe', 'person']),
        t_name: state.getIn(['TXSysAcRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {
            dispatch(actionCreators.updateUpperData(NewData))
        },

        saveToHome(index, tableType, tableName, date, data) {
            dispatch(actionCreators.saveData({
                index:index,
                tableType:tableType,
                tableName:tableName,
                date:date,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);