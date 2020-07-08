import React, {Component} from 'react';
import {Table, Button, Tabs,Input} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../../rawSysOpRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const TabPane = Tabs.TabPane;

class UpperForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Time: [],//第一列的时间变化自动控制
    //     }
    // }
    // componentWillMount() {
    //     const allTime = [
    //         ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
    //         ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    //         ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    //     ];
    //     this.setState({
    //         Time: [...allTime[this.props.timeChose]],
    //     });
    // }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        // const allTime = [
        //     ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
        //     ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        //     ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        // ];
        // this.setState({
        //     Time: [...allTime[nextProps.timeChose]],
        // });
    }



    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/

    onInputNumberChange2 = (value, indexH, indexL) => {
        if(value != null){

            const {data, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来
            NewData[indexH]["data"][indexL] = value;
            updateChange(NewData)

        }
    };
//控制输入框的样式
     changeStyle = (value) => {
        if (value) {
            if (isNaN(value)) {
                        return {
                            borderColor: 'red',
                            color:'red',
                        }
            }
        }           
    }

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    postToHome(i) {//i是行数
        // const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        // const Data = JSON.parse(JSON.stringify(upperData))
        // const index = i + timeChose * 8
        // saveToHome(index, 1, t_name, date, Data)
    }
    /**点击暂存之后上传当前行的数据到后台**end**/


    render() {
        /**表头的设计**start**/
        const columns_tab1 = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '5.5%',
            },
            {
                title: '喂料量t/h' ,
                key: 'WLL',
                dataIndex: 'WLL',
                width: '4.5%'
            },
            {
                title: "入磨皮带电流A",
                dataIndex: 'RMPDDL',
                width: '4.5%'
            },
            {
                title:'立磨主电机',
                dataIndex: 'LMZDJ',
                children: [
                    {
                        title: '电流A',
                        dataIndex: 'LMDL',
                        width: '4.5%'
                    },
                    {
                        title: '前轴温度℃',
                        dataIndex: 'QZWD',
                        width: '4.5%'
                    },
                    {
                        title: '后轴温度℃',
                        dataIndex: 'HZWD',
                        width: '4.5%'
                    },
                    {
                        title: '绕组温度℃',
                        dataIndex: 'RZWD',
                        width: '4.5%'
                    }
                ]
            },
            {
                title: '磨机震动',
                dataIndex: 'MJZD',
                children: [
                    {
                        title: '垂直mm',
                        dataIndex: 'CZ',
                        width: '4.5%'
                    },
                    {
                        title: '水平mm',
                        dataIndex: 'SP',
                        width: '4.5%'
                    }
                ]
            },
            {
                title: '入磨温度℃',
                dataIndex: 'RMWD',
                width: '4.5%'
            },
            {
                title: '入磨负压Pa',
                dataIndex: 'RMFY',
                width: '4.5%'
            },
            {
                title: '出磨温度℃',
                dataIndex: 'CMWD',
                width: '4.5%'
            },
            {
                title: '出磨负压Pa',
                dataIndex: 'CMFY',
                width: '4.5%'
            },
            {
                title: '磨机压差Pa',
                dataIndex: 'MJYC',
                width: '4.5%'
            },    
            {
                title: '磨辊压力MPa',
                dataIndex: 'MGYL',
                width: '4.5%'
            },
            {
                title: '立磨喷水%',
                dataIndex: 'LMPS',
                width: '4.5%'
            },
            {
                title: '磨辊轴承温度',
                dataIndex: 'MGZCWD',
                children: [
                    {
                        title: '1#℃',
                        dataIndex: '1',
                        width: '4.5%'
                    },
                    {
                        title: '2#℃',
                        dataIndex: '2',
                        width: '4.5%'
                    },
                    {
                        title: '3#℃',
                        dataIndex: '3',
                        width: '4.5%'
                    },
                    {
                        title: '4#℃',
                        dataIndex: '4',
                        width: '4.5%'
                    }
                ]
            },
            {
                title: '人员',
                dataIndex: 'person',
                width: '4%',
            }
            // , {
            //     title: '暂存',
            //     dataIndex: 'btn_save',
            //     width: '5%',
            // }
        ];
        const columns_tab2 = [
                {
                    title: '时间',
                    dataIndex: 'time',
                    width: '6%',
                },
                {
                    title: '选粉机',
                    dataIndex: "XFJ",
                    children: [
                        {
                            title: '电流A',
                            dataIndex: 'XFJDL',
                            width: '4%',
                        },
                        {
                            title: '转数rpm',
                            dataIndex: 'XFJZS',
                            width: '4%',
                        }
                    ]
                },
                {
                    title: '外循环提升机电流A',
                    dataIndex: 'WXHTSJDL',
                    width: '4%',
                },
                {
                    title: '入库提升机电流A',
                    dataIndex: 'RKTSJDL',
                    width: '4%',
                },
                {
                    title: '循环风机',
                    dataIndex: 'XHFJ',
                    children: [
                        {
                            title: '入口阀门开度%',
                            dataIndex: 'XHFJ_RKFMKD',
                            width: '4%',
                        },
                        {
                            title: '电流A',
                            dataIndex: 'XHFJ_XHFJDL',
                            width: '4%',
                        },
                        {
                            title: '风机轴承温度℃',
                            dataIndex: 'XHFJ_FJZCWD',
                            width: '4%',
                        },
                        {
                            title: '电机轴承温度℃',
                            dataIndex: 'XHFJ_DJZCWD',
                            width: '4%',
                        },
                        {
                            title: '电机绕组温度℃',
                            dataIndex: 'XHFJ_DJRZWD',
                            width: '4%',
                        },
                        {
                            title: '震动1# mm',
                            dataIndex: 'ZD1',
                            width: '4%',
                        },
                        {
                            title: '震动2# mm',
                            dataIndex: 'ZD2',
                            width: '4%',
                        },
                    ]
                },
                {
                    title: '袋收尘器',
                    dataIndex: 'DSCQ',
                    children: [
                        {
                            title: '入口温度℃',
                            dataIndex: 'RKWD',
                            width: '4%',
                        },
                        {
                            title: '入口压力Pa',
                            dataIndex: 'RKYL',
                            width: '4%',
                        },
                        {
                            title: '出口温度℃',
                            dataIndex: 'CKWD',
                            width: '4%',
                        },
                        {
                            title: '出口压力Pa',
                            dataIndex: 'CKYL',
                            width: '4%',
                        }
                    ]
                },
                {
                    title: '尾排风机',
                    dataIndex: 'WPFJ',
                    children: [
                        {   
                            title: '入口阀门开度%',
                            dataIndex: 'WPfJ_RKFMKD',
                            width: '4%',
                        },
                        {
                            title: '电流A',
                            dataIndex: 'WPfJ_WPFJDL',
                            width: '4%',
                        },
                        {
                            title: '转速rpm',
                            dataIndex: 'WPfJ_SLMZS',
                            width: '4%',
                        },
                        {
                            title: '风机轴承温度℃',
                            dataIndex: 'WPfJ_FJZCWD',
                            width: '4%',
                        },
                        {
                            title: '电机轴承温度℃',
                            dataIndex: 'WPfJ_DJZCWD',
                            width: '4%',
                        },
                        {
                            title: '电机绕组温度℃',
                            dataIndex: 'WPfJ_DJRZWD',
                            width: '4%',
                        }
                    ]
                },
                {
                    title: '增湿塔出口温度℃',
                    dataIndex: 'ZSTCKWD',
                    width: '4%',
                },
                {
                    title: '人员',
                    dataIndex:'person',
                    width:'5%',
                }
                //,
                // {
                //     title: '暂存',
                //     dataIndex:'btn_save',
                //     width:'5%',
                // }
            ];
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


        const {data,timeChose,allTime} = this.props;
        const Data = deepCopy(data);
        const time = deepCopy(allTime);

        for (let i = 0; i < 8; i++) {

            const index = i + timeChose * 9;
            const value = Data[index]['data']; //value是个数组

            data_tab1.push(
                {
                    time: time[timeChose][i],
                    WLL: <span><Input
                    style={this.changeStyle(value[0])}
                    defaultValue={''}
                    value={isNaN(value[0]) ? null : value[0]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 0)}
                /></span>,
                    RMPDDL:<span><Input
                    style={this.changeStyle(value[1])}
                    defaultValue={''}
                    value={isNaN(value[1]) ? null : value[1]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 1)}
                /></span>,
                    LMDL: <span><Input
                    style={this.changeStyle(value[2])}
                    defaultValue={''}
                    value={isNaN(value[2]) ? null : value[2]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 2)}
                /></span>,

                    QZWD: <span><Input
                    style={this.changeStyle(value[3])}
                    defaultValue={''}
                    value={isNaN(value[3]) ? null : value[3]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 3)}
                /></span>,

                    HZWD: <span><Input
                    style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(value[4]) ? null : value[4]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 4)}
                /></span>,

                    RZWD: <span><Input
                    style={this.changeStyle(value[5])}
                    defaultValue={''}
                    value={isNaN(value[5]) ? null : value[5]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 5)}
                /></span>,

                    CZ:<span><Input
                    style={this.changeStyle(value[6])}
                    defaultValue={''}
                    value={isNaN(value[6]) ? null : value[6]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 6)}
                /></span>,

                    SP: <span><Input
                    style={this.changeStyle(value[7])}
                    defaultValue={''}
                    value={isNaN(value[7]) ? null : value[7]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 7)}
                /></span>,

                    RMWD: <span><Input
                    style={this.changeStyle(value[8])}
                    defaultValue={''}
                    value={isNaN(value[8]) ? null : value[8]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 8)}
                /></span>,
                    RMFY:<span><Input
                    style={this.changeStyle(value[9])}
                    defaultValue={''}
                    value={isNaN(value[9]) ? null : value[9]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 9)}
                /></span>,

                    CMWD: <span><Input
                    style={this.changeStyle(value[10])}
                    defaultValue={''}
                    value={isNaN(value[10]) ? null : value[10]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 10)}
                /></span>,

                    CMFY: <span><Input
                    style={this.changeStyle(value[11])}
                    defaultValue={''}
                    value={isNaN(value[11]) ? null : value[11]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 11)}
                /></span>,

                    MJYC: <span><Input
                    style={this.changeStyle(value[12])}
                    defaultValue={''}
                    value={isNaN(value[12]) ? null : value[12]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 12)}
                /></span>,

                    MGYL: <span><Input
                    style={this.changeStyle(value[13])}
                    defaultValue={''}
                    value={isNaN(value[13]) ? null : value[13]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 13)}
                /></span>,

                    LMPS: <span><Input
                    style={this.changeStyle(value[14])}
                    defaultValue={''}
                    value={isNaN(value[14]) ? null : value[14]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 14)}
                /></span>,

                    1: <span><Input
                    style={this.changeStyle(value[15])}
                    defaultValue={''}
                    value={isNaN(value[15]) ? null : value[15]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 15)}
                /></span>,
                    
                    2: <span><Input
                    style={this.changeStyle(value[16])}
                    defaultValue={''}
                    value={isNaN(value[16]) ? null : value[16]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 16)}
                /></span>,

                    3: <span><Input
                    style={this.changeStyle(value[17])}
                    defaultValue={''}
                    value={isNaN(value[17]) ? null : value[17]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 17)}
                /></span>,

                    4: <span><Input
                    style={this.changeStyle(value[18])}
                    defaultValue={''}
                    value={isNaN(value[18]) ? null : value[18]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 18)}
                /></span>,

                    person: Data[index]['user'],
                   // btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }
        const data_tab2 = [];
        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 9;
            const value = Data[index]['data']; //value是个数组
            const tab = 19;
            data_tab2.push(
                {
                    time: time[timeChose][i],
                    XFJDL: <span><Input
                    style={this.changeStyle(value[tab])}
                    value={isNaN(value[tab]) ? null : value[tab]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, tab)}
                /></span>,
                    XFJZS: <span><Input
                    style={this.changeStyle(value[1+tab])}
                    value={isNaN(value[tab+1]) ? null : value[tab+1]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 1+tab)}
                /></span>,
                    WXHTSJDL: <span><Input
                    style={this.changeStyle(value[2+tab])}
                    value={isNaN(value[tab+2]) ? null : value[tab+2]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 2+tab)}
                /></span>,
                    RKTSJDL: <span><Input
                    style={this.changeStyle(value[3+tab])}
                    value={isNaN(value[tab+3]) ? null : value[tab+3]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 3+tab)}
                /></span>,
                    XHFJ_RKFMKD: <span><Input
                    style={this.changeStyle(value[4+tab])}
                    value={isNaN(value[tab+4]) ? null : value[tab+4]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 4+tab)}
                /></span>,
                    XHFJ_XHFJDL: <span><Input
                    style={this.changeStyle(value[5+tab])}
                    value={isNaN(value[tab+5]) ? null : value[tab+5]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 5+tab)}
                /></span>,
                    XHFJ_FJZCWD: <span><Input
                    style={this.changeStyle(value[6+tab])}
                    value={isNaN(value[tab+6]) ? null : value[tab+6]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 6+tab)}
                /></span>,
                    XHFJ_DJZCWD: <span><Input
                    style={this.changeStyle(value[7+tab])}
                    value={isNaN(value[tab+7]) ? null : value[tab+7]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 7+tab)}
                /></span>,
                    XHFJ_DJRZWD:<span><Input
                    style={this.changeStyle(value[8+tab])}
                    value={isNaN(value[tab+8]) ? null : value[tab+8]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 8+tab)}
                /></span>,
                    ZD1: <span><Input
                    style={this.changeStyle(value[9+tab])}
                    value={isNaN(value[tab+9]) ? null : value[tab+9]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 9+tab)}
                /></span>,
                    ZD2: <span><Input
                    style={this.changeStyle(value[10+tab])}
                    value={isNaN(value[tab+10]) ? null : value[tab+10]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 10+tab)}
                /></span>,
                    RKWD: <span><Input
                    style={this.changeStyle(value[11+tab])}
                    value={isNaN(value[tab+11]) ? null : value[tab+11]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 11+tab)}
                /></span>,
                    RKYL: <span><Input
                    style={this.changeStyle(value[12+tab])}
                    value={isNaN(value[tab+12]) ? null : value[tab+12]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 12+tab)}
                /></span>,
                    CKWD: <span><Input
                    style={this.changeStyle(value[13+tab])}
                    value={isNaN(value[tab+13]) ? null : value[tab+13]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 13+tab)}
                /></span>,
                    CKYL: <span><Input
                    style={this.changeStyle(value[14+tab])}
                    value={isNaN(value[tab+14]) ? null : value[tab+14]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 14+tab)}
                /></span>,
                    WPfJ_RKFMKD: <span><Input
                    style={this.changeStyle(value[15+tab])}
                    value={isNaN(value[tab+15]) ? null : value[tab+15]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 15+tab)}
                /></span>,
                    WPfJ_WPFJDL: <span><Input
                        style={this.changeStyle(value[16+tab])}
                        value={isNaN(value[tab+16]) ? null : value[tab+16]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 16+tab)}
                    /></span>,
                    WPfJ_SLMZS: <span><Input
                        style={this.changeStyle(value[16+1+tab])}
                        value={isNaN(value[1+tab+16]) ? null : value[1+tab+16]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 16+1+tab)}
                    /></span>,
                    WPfJ_FJZCWD: <span><Input
                        style={this.changeStyle(value[17+1+tab])}
                        value={isNaN(value[1+tab+17]) ? null : value[1+tab+17]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 17+1+tab)}
                    /></span>,
                    WPfJ_DJZCWD: <span><Input
                        style={this.changeStyle(value[18+1+tab])}
                        value={isNaN(value[1+tab+18]) ? null : value[1+tab+18]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 18+1+tab)}
                    /></span>,
                    WPfJ_DJRZWD: <span><Input
                        style={this.changeStyle(value[19+1+tab])}
                        value={isNaN(value[1+tab+19]) ? null : value[1+tab+19]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 19+1+tab)}
                    /></span>,
                    ZSTCKWD: <span><Input
                        style={this.changeStyle(value[20+1+tab])}
                        value={isNaN(value[1+tab+20]) ? null : value[1+tab+20]}
                        defaultValue={''}
                        onChange={event => this.onInputNumberChange2(event.target.value, index, 20+1+tab)}
                    /></span>,
                    person:Data[index]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
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
                <Tabs defaultActiveKey="0" onChange={callback.bind(this)} >
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

        date:state.getIn(['rawSysOpRe', 'date']),
        allTime:state.getIn(['rawSysOpRe', 'allTime']),
        timeChose:state.getIn(['rawSysOpRe', 'timeChose']),
        data:state.getIn(['rawSysOpRe', 'data']),
        requestFlag:state.getIn(['rawSysOpRe', 'requestFlag']),
        person:state.getIn(['rawSysOpRe', 'person']),
        tableName:state.getIn(['rawSysOpRe', 'tableName']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },

        //上表暂存一行数据
        saveToHome(date, index, tableName, data) {

            dispatch(actionCreators.saveData({
                date:date,
                index:index,
                tableName:tableName,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);