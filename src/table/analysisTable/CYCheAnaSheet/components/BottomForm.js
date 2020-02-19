import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';


export default class BottomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            Data: [],//原始填写的数据
            TabChoose: 0,
            isNormal: [],
            BanCi: ['率值'],
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
                title: 'KH',
                dataIndex: 'KH'
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

        /**表头的设计**end**/


        /**限制输入数值位数的函数**end**/

        /**中间八行的数据输入**start**/
        const data = [];
        const Data = this.state.Data;
        for (let i = 0; i < 1; i++) {
            const hour = i
            // const value = Data[hour]['t_data'];
            data.push(
                {
                    1: this.state.BanCi[i],
                    KH: <span><Input

                        // style={this.changeStyle(value[1])}
                        defaultValue={''}
                        // value={isNaN(value[1]) ? null : value[1]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                    /></span>,
                    N: <span><Input
                        // style={this.changeStyle(value[2])}
                        defaultValue={''}
                        // value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                    /></span>,
                    P: <span><Input

                        // style={this.changeStyle(value[3])}
                        defaultValue={''}
                        // value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                    /></span>,
                    2: '矿物组合',
                    C2S: <span><Input
                    // style={this.changeStyle(value[4])}
                    defaultValue={''}
                    // value={isNaN(value[4]) ? null : value[4]}
                    onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                /></span>,
                    C3S: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    C3A: <span><Input

                        // style={this.changeStyle(value[4])}
                        defaultValue={''}
                        // value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    C4AF: <span><Input

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
                    className="pper_table" columns={columns_bottom} bordered
                    dataSource={data} pagination={false}/>
            </div>
        );
    }

}