import React, {Component} from 'react';
import {Table, Tabs,Input} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";


const TabPane = Tabs.TabPane;

class UpperPartOfTheForm extends Component {


    /**
     * 第一列的时间变化
     */
    componentWillMount() {

    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }


    /**
     *
     * @param value
     * @param indexH 具体的行号
     * @param indexL
     */
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
        const {upperData, timeChose, date, t_name, saveToHome} = this.props;
        const Data = JSON.parse(JSON.stringify(upperData))
        const index = i + timeChose * 8
        saveToHome(index,1,t_name,date,Data);
    }
    /**点击暂存之后上传当前行的数据到后台**end**/

    render() {
        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1",color:"black"},
        }
        /**表头的设计**start**/
        const columns_tab1 = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '8%',
            },
            {
                title: '喂料量t/h',
                dataIndex: 'WLL',
                width: '5%',
            },
            {
                title: '立磨主电机',
                dataIndex: 'LMZDJ',
                children: [
                    {
                        title: '电流A',
                        dataIndex: 'LMDL',
                        width: '5%',
                    },
                    {
                        title: '前轴温度℃',
                        dataIndex: 'QZWD',
                        width: '5%',
                    },
                    {
                        title: '后轴温度℃',
                        dataIndex: 'HZWD',
                        width: '5%',
                    },
                    {
                        title: '绕组温度℃',
                        dataIndex: 'RZWD',
                        width: '5%',
                    }
                ]
            },
            {
                title: '入磨温度℃',
                dataIndex: 'RMWD',
                width: '5%',
            },
            {
                title: '入磨负压pa',
                dataIndex: 'RMFY',
                width: '5%',
            },
            {
                title: '出磨温度℃',
                dataIndex: 'CMWD',
                width: '5%',
            },
            {
                title: '出磨负压pa',
                dataIndex: 'CMFY',
                width: '5%',
            },
            {
                title: '磨机压差pa',
                dataIndex: 'MJYC',
                width: '5%',
            },
            {
                title: '磨机震动mm',
                dataIndex: 'MJZD',
                width: '5%',
            },
            {
                title: '磨辊压力Mpa',
                dataIndex: 'MGYL',
                width: '5%',
            },
            {
                title: '磨辊轴承温度',
                dataIndex: 'MGZCWD',
                children:[
                    {
                        title: '1#℃',
                        dataIndex: '1',
                        width: '5%',
                    },
                    {
                        title: '2#℃',
                        dataIndex: '2',
                        width: '5%',
                    }
                ]
            },
            {
                title: '选粉机转数rpm',
                dataIndex: 'XFJZS',
                width: '5%',
            },
                {
                    title: '人员',
                    dataIndex:'person',
                    width:'8%',
                }
                // ,
                // {
                //     title: '暂存',
                //     dataIndex:'btn_save',
                //     width:'9%',
                // }
            ];
        

        const columns_tab2 = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '5%',
            },
            {
                title: '袋收尘',
                dataIndex: 'DFC',
                children:[
                    {
                        title: '出口温度℃',
                        dataIndex: 'CKWD',
                        width: '5%',
                    },
                    {
                        title: '出口压力pa',
                        dataIndex: 'CKYL',
                        width: '5%',
                    },
                    {
                        title: '压差pa',
                        dataIndex: 'YC',
                        width: '5%',
                    }
                ]
            },
            {
                title: '灰斗温度℃',
                dataIndex: 'HDWD',
                width: '5%',
            },
            {
                title: 'CO含量%',
                dataIndex: 'COHL',
                width: '5%',
            },
            {
                title: '煤磨排风机',
                dataIndex: 'MMPFJ',
                children:[
                    {
                        title: '入口阀门开度%',
                        dataIndex: 'RKFMKD',
                        width: '5%',
                    },
                    {
                        title: 'MM电流A',
                        dataIndex: 'DL',
                        width: '5%',
                    },
                    {
                        title: '风机轴承温度℃',
                        dataIndex: 'FJZCWD',
                        width: '5%',
                    },
                    {
                        title: '电机轴承温度℃',
                        dataIndex: 'DJZCWD',
                        width: '5%',
                    },
                    {
                        title: '电机绕组温度℃',
                        dataIndex: 'DJRZWD',
                        width: '5%',
                    }
                ]
            },
            {
                title: '头煤仓重t',
                dataIndex: 'TMCZ',
                width: '5%',
            },
            {
                title: '尾煤仓重',
                dataIndex: 'WMCZ',
                width: '5%',
            },
            {
                title: '头煤仓温度℃',
                dataIndex: 'TMCWD',
                width: '5%',
            },
            {
                title: '尾煤仓温度℃',
                dataIndex: 'WMCWD',
                width: '5%',
            },
            {
                title: '细度',
                dataIndex: 'XD',
                width: '5%',
            },
            {
                title: '水分',
                dataIndex: 'SF',
                width: '5%',
            },
            {
                title: '灰分',
                dataIndex: 'HF',
                width: '5%',
            },
            {
                title: '人员',
                dataIndex:'person',
                width:'5%',
            },
            // {
            //     title: '暂存',
            //     dataIndex:'btn_save',
            //     width:'5%',
            // }
        ]
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
                    LMDL:<span><Input
                    style={this.changeStyle(value[1])}
                    defaultValue={''}
                    value={isNaN(value[1]) ? null : value[1]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 1)}
                /></span>,
                    QZWD: <span><Input
                    style={this.changeStyle(value[2])}
                    defaultValue={''}
                    value={isNaN(value[2]) ? null : value[2]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 2)}
                /></span>,

                    HZWD: <span><Input
                    style={this.changeStyle(value[3])}
                    defaultValue={''}
                    value={isNaN(value[3]) ? null : value[3]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 3)}
                /></span>,

                    RZWD: <span><Input
                    style={this.changeStyle(value[4])}
                    defaultValue={''}
                    value={isNaN(value[4]) ? null : value[4]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 4)}
                /></span>,

                    RMWD:<span><Input
                    style={this.changeStyle(value[5])}
                    defaultValue={''}
                    value={isNaN(value[5]) ? null : value[5]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 5)}
                /></span>,

                    RMFY: <span><Input
                    style={this.changeStyle(value[6])}
                    defaultValue={''}
                    value={isNaN(value[6]) ? null : value[6]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 6)}
                /></span>,

                    CMWD: <span><Input
                    style={this.changeStyle(value[7])}
                    defaultValue={''}
                    value={isNaN(value[7]) ? null : value[7]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 7)}
                /></span>,
                    CMFY:<span><Input
                    style={this.changeStyle(value[8])}
                    defaultValue={''}
                    value={isNaN(value[8]) ? null : value[8]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 8)}
                /></span>,

                    MJYC: <span><Input
                    style={this.changeStyle(value[9])}
                    defaultValue={''}
                    value={isNaN(value[9]) ? null : value[9]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 9)}
                /></span>,

                    MJZD: <span><Input
                    style={this.changeStyle(value[10])}
                    defaultValue={''}
                    value={isNaN(value[10]) ? null : value[10]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 10)}
                /></span>,

                    MGYL: <span><Input
                    style={this.changeStyle(value[11])}
                    defaultValue={''}
                    value={isNaN(value[11]) ? null : value[11]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 11)}
                /></span>,

                    1: <span><Input
                    style={this.changeStyle(value[12])}
                    defaultValue={''}
                    value={isNaN(value[12]) ? null : value[12]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 12)}
                /></span>,

                    2: <span><Input
                    style={this.changeStyle(value[13])}
                    defaultValue={''}
                    value={isNaN(value[13]) ? null : value[13]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 13)}
                /></span>,
                    
                    XFJZS: <span><Input
                    style={this.changeStyle(value[14])}
                    defaultValue={''}
                    value={isNaN(value[14]) ? null : value[14]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 14)}
                /></span>,

                    person: Data[index]['user'],
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }
        const data_tab2 = [];
        const Data_CRO=deepCopy(this.props.CRO_data);
        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 9;
            const index_CRO = i + timeChose * 14;
            const value = Data[index]['data']; //value是个数组
            const value_CRO = Data_CRO[index_CRO]['data'];
            const tab = 15;
            data_tab2.push(
                {
                    time: time[timeChose][i],
                    CKWD: <span><Input
                    style={this.changeStyle(value[tab])}
                    value={isNaN(value[tab]) ? null : value[tab]}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, tab)}
                /></span>,
                    CKYL: <span><Input
                    style={this.changeStyle(value[1+tab])}
                    value={isNaN(value[tab+1]) ? null : value[tab+1]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 1+tab)}
                /></span>,
                    YC: <span><Input
                    style={this.changeStyle(value[2+tab])}
                    value={isNaN(value[tab+2]) ? null : value[tab+2]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 2+tab)}
                /></span>,
                    HDWD: <span><Input
                    style={this.changeStyle(value[3+tab])}
                    value={isNaN(value[tab+3]) ? null : value[tab+3]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 3+tab)}
                /></span>,
                    COHL: <span><Input
                    style={this.changeStyle(value[4+tab])}
                    value={isNaN(value[tab+4]) ? null : value[tab+4]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 4+tab)}
                /></span>,
                    RKFMKD: <span><Input
                    style={this.changeStyle(value[5+tab])}
                    value={isNaN(value[tab+5]) ? null : value[tab+5]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 5+tab)}
                /></span>,
                    DL: <span><Input
                    style={this.changeStyle(value[6+tab])}
                    value={isNaN(value[tab+6]) ? null : value[tab+6]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 6+tab)}
                /></span>,
                    FJZCWD: <span><Input
                    style={this.changeStyle(value[7+tab])}
                    value={isNaN(value[tab+7]) ? null : value[tab+7]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 7+tab)}
                /></span>,
                    DJZCWD:<span><Input
                    style={this.changeStyle(value[8+tab])}
                    value={isNaN(value[tab+8]) ? null : value[tab+8]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 8+tab)}
                /></span>,
                    DJRZWD: <span><Input
                    style={this.changeStyle(value[9+tab])}
                    value={isNaN(value[tab+9]) ? null : value[tab+9]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 9+tab)}
                /></span>,
                    TMCZ: <span><Input
                    style={this.changeStyle(value[10+tab])}
                    value={isNaN(value[tab+10]) ? null : value[tab+10]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 10+tab)}
                /></span>,
                    WMCZ: <span><Input
                    style={this.changeStyle(value[11+tab])}
                    value={isNaN(value[tab+11]) ? null : value[tab+11]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 11+tab)}
                /></span>,
                    TMCWD: <span><Input
                    style={this.changeStyle(value[12+tab])}
                    value={isNaN(value[tab+12]) ? null : value[tab+12]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 12+tab)}
                /></span>,
                    WMCWD: <span><Input
                    style={this.changeStyle(value[13+tab])}
                    value={isNaN(value[tab+13]) ? null : value[tab+13]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 13+tab)}
                /></span>,
                    XD: <span><Input
                    style={this.changeStyle(value_CRO[7])}
                    value={isNaN(value_CRO[7]) ? null : value_CRO[7]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 14+tab)}
                /></span>,
                    SF: <span><Input
                    style={this.changeStyle(value_CRO[8])}
                    value={isNaN(value_CRO[8]) ? null : value_CRO[8]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 15+tab)}
                /></span>,
                    HF: <span><Input
                    style={this.changeStyle(value[16+tab])}
                    value={isNaN(value[tab+16]) ? null : value[tab+16]}
                    defaultValue={''}
                    onChange={event => this.onInputNumberChange2(event.target.value, index, 16+tab)}
                /></span>,
                    person:Data[index]['user'],
                  // btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
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
            <div className="coalSOR">
                {/*表格填写*/}
                <Tabs defaultActiveKey="0" onChange={callback.bind(this)} >
                    <TabPane tab="表1" key="0"><Table
                        className="coalSOR_table1" columns={columns_tab1} bordered
                        dataSource={data_tab1} pagination={false}/>
                    </TabPane>
                    <TabPane tab="表2" key="1"><Table
                        className="coalSOR_table2" columns={columns_tab2} bordered
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
        date:state.getIn(['coalSysOpRe', 'date']),
        allTime:state.getIn(['coalSysOpRe', 'allTime']),
        timeChose:state.getIn(['coalSysOpRe', 'timeChose']),
        data:state.getIn(['coalSysOpRe', 'data']),
        CRO_data:state.getIn(['coalSysOpRe', 'CRO_data']),
        requestFlag:state.getIn(['coalSysOpRe', 'requestFlag']),
        person:state.getIn(['coalSysOpRe', 'person']),
        tableName:state.getIn(['coalSysOpRe', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
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


export default connect(mapStateToProps, mapDispathToProps)(UpperPartOfTheForm);