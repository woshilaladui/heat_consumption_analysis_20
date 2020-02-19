import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';


export default class MiddleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            TabChoose: 0,
            average: [null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null],//平均
            ratio: [null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null,],//比值
            passRate: [null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null,],//合格率
            isNormal: [],
            BanCi: ['含量',''],
            // person: this.props.person
        }
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        this.setState({
            Data: this.props.BottomData,
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        this.setState({
            Data: this.props.BottomData,
        });
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        const rep = /^(\-)*(\d+)\.(\d{2}).*$/;
        event = event.replace(rep, '$1$2.$3');
        NewData[hour]["t_data"][indexL] = event;
        this.setState({
            Data: NewData
        });
    };

    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {
            // if (isNaN(value) || value > 100) {
            //     return {
            //         borderColor: 'red',
            //         color:'red',
            //     }
            // }
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
        const hour = i + this.props.timeChose * 8;
        const a = this.state.Data[hour]['t_data'];
        const t_data = a.join(',');
        console.log("t_data:"+ t_data);
        const jsondata = {
            "data": [
                {
                    "riqi": this.props.riqi,
                    "hour": hour,
                    "t_name": "ZKSX2",
                    "t_type": 1,
                    "t_data": t_data,
                    "name": window.localStorage.name,
                }
            ]
        };
        console.log("i:"+ i +":"+ jsondata.toString());
        fetch("/api/ZhongKS/save", {
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
                    message.info('暂存'+hour+'点钟数据成功');
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
        const data = [];
        const Data = this.state.Data;
        for (let i = 0; i < 2; i++) {
            const hour = i
            // const value = Data[hour]['t_data'];
            data.push(
                {
                    LX: this.state.BanCi[i],
                    IL: <span><Input
                        // style={this.changeStyle(value[0])}
                        defaultValue={''}
                        // value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    SiO2: <span><Input

                        // style={this.changeStyle(value[1])}
                        defaultValue={''}
                        // value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                    /></span>,
                    Al2O3: <span><Input
                        // style={this.changeStyle(value[2])}
                        defaultValue={''}
                        // value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                    /></span>,
                    Fe2O3: <span><Input

                        // style={this.changeStyle(value[3])}
                        defaultValue={''}
                        // value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                    /></span>,
                    CaO: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    MgO: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    SO3: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    Na2O: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    K2O: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    Cl: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    person: '',
                    // Data[hour]['name'],
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