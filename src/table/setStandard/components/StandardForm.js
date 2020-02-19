import React, {Component} from 'react';
import {InputNumber, Input, Table, DatePicker, message} from 'antd';
import moment from 'moment';
import Format, {SetStandardFormat} from '../../../package/Format';
import {limitDecimals2, limitDecimals3} from '../../../package/Limit';


export default class StandardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Item: [],//第一列的设置项目变化自动控制
            //Data里第一列为起始值，第二列为终点值，第三列为修改原因
            Data: [
                [[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []],
                [[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []],
            ],//十个表每个表有三个数组，分别对应起始值，终点值，原因
            Time: moment(),//设置的时间
            refresh: true,//提交完后页面刷新
            tableChose: 0,
            username: '',
            reason: [],
            t_name_list:
                [
                    'RMA_SHS', 'RMA_SY', "RMA_TF", "RMA_FMHg",
                    'RMA_FMHs', 'CRM', 'RMC', 'KAS',
                    'FAS', 'CRO',
                ],
        }
    }

    /**
     * 第一列的设置项变化
     */
    componentWillMount() {
        const allItem = [
            ['SiO2', 'CaO', 'MgO', 'R2O'],
            ['水分', 'SiO2', 'R2O'],
            ['水分', 'Fe2O3', 'R2O'],
            ['水分', 'IL', 'Al2O3', 'R2O'],
            ['水分', 'IL', 'Al2O3', 'R2O'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['FCaO','立升重'],
        ];
        this.setState({
            Item: [...allItem[this.props.tableChose]],
            username: this.props.username,
            time: this.props.time,
            startValue: this.props.startValue,
            endValue: this.props.endValue,
            reason: this.props.reason,
            t_name_list: this.props.t_name_list,
            tableChose: this.props.tableChose,

        });

    }

    componentWillReceiveProps(nextProps) {
        const allItem = [
            ['SiO2', 'CaO', 'MgO', 'R2O'],
            ['水分', 'SiO2', 'R2O'],
            ['水分', 'Fe2O3', 'R2O'],
            ['水分', 'IL', 'Al2O3', 'R2O'],
            ['水分', 'IL', 'Al2O3', 'R2O'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['KH', 'N', 'P'],
            ['FCaO','立升重'],
        ];
        this.setState({
            Item: [...allItem[nextProps.tableChose]],
            username: nextProps.username,
            time: nextProps.time,
            startValue: nextProps.startValue,
            endValue: nextProps.endValue,
            reason: nextProps.reason,
            t_name_list: nextProps.t_name_list,
            tableChose: nextProps.tableChose,
        })
        //}
    }

    componentDidMount() {
        //绑定ref
        this.props.onRef(this);
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     * 数值  行  列
     **/
        //event输入框的值，indexF下标的第一个，indexS下标的第二个
    onInputNumberChange2 = (event, indexF, indexS) => {
        const {Data, tableChose} = this.state;
        Data[tableChose][indexF][indexS] = event;
        this.setState({
            Data: Data
        });
    };

    onInputStringChange = (event, indexF, indexS) => {
        // if (indexF === 2 && !isNaN(event.target.value)) {
        // }
        const {Data, tableChose} = this.state;
        Data[tableChose][indexF][indexS] = event.target.value;
        this.setState({
            Data: Data
        });
    };

    //时间选择框响应
    handleTimeChange = (event) => {
        if (!event) {
            return;
        }
        this.setState({
            Time: event
        })

    };


    postToHome() {
        const {Data, Time, startValue, endValue, t_name_list, tableChose, reason, Item} = this.state;//新标准新误差和生效时间
        //临时数组
        let new_startValue = [], new_endValue = [], new_reason = [];
        for (let i = 0; i < Data[tableChose][0].length; i++) {
            new_startValue[i] = /*isNaN(Data[tableChose][0][i]) ? startValue[i] : */Data[tableChose][0][i];
            new_endValue[i] = /*isNaN(Data[tableChose][1][i]) ? endValue[i] : */Data[tableChose][1][i];
            new_reason[i] = /*isNaN(Data[tableChose][1][i]) ? endValue[i] : */Data[tableChose][2][i];
        }
        let changed = false//判定是否有填写数据
        for (let i = 0; i < Item.length; i++) {
            //i是行数
            /**填写了新标准**/
            console.log('第' + i + '行数据：' + Data[tableChose][0][i], Data[tableChose][1][i])
            if (
                //起始值和终点值各自合法且不为空
                (!isNaN(Data[tableChose][0][i]) && Data[tableChose][0][i] != null) &&
                (!isNaN(Data[tableChose][1][i]) && Data[tableChose][1][i] != null)
            ) {
                //填写过数据
                changed = true
                /**没填写原因**/
                if (Data[tableChose][2][i] == null) {
                    message.error('第' + (i + 1) + '行数据未填写修改原因，提交失败');
                    return;
                }
                /**标准未变化**/
                // if (Data[tableChose][0][i] === startValue[i] && Data[tableChose][1][i] === endValue[i]) {
                //     message.error('第' + (i + 1) + '行数据未变化,提交失败');
                //     return;
                // }
            }
            else {
                new_startValue[i] = startValue[i];//对应数据改为之前的标准
                new_endValue[i] = endValue[i];//对应数据改为之前的标准
                new_reason[i] = reason[i];//对应数据改为之前的标准
            }
        }
        if (changed) {
            const jsondata = {
                't_name': t_name_list[tableChose],
                'startValue': new_startValue + '',
                'endValue': new_endValue + '',
                'reason': new_reason + '',
                // 'remarks': JSON.stringify(Data[2]),
                'createdAt': Time.format('YYYY-MM-DD HH:mm:ss')
            };
            fetch("/api/standard/add", {
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
                        message.info('保存成功');
                    }
                    else if (data['code'] === 401) {
                        message.error('权限不足');
                    }
                    else if (data['code'] === 1) {
                        message.error('添加数据失败');
                    }
                    else if (data['detail']) {
                        message.error('保存失败')
                    }
                })
                .catch(error => console.error('Error:', error));
            //更新完新标准后刷新页面原标准数据
            fetch("/api/standard/query", {
                method: 'POST',
                body: JSON.stringify({'t_name': t_name_list[this.props.tableChose]}), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.authorization,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['code'] === 0) {
                        const {startValue, endValue, username, time, reason} = this.state
                        const arr = SetStandardFormat(data['standard'], startValue, endValue, username, time, reason)
                        this.setState({
                            startValue: arr[0],
                            endValue: arr[1],
                            username: arr[2],
                            time: arr[3],
                            reason: arr[4],
                        });
                    }
                })
                .catch(error => console.error('Error:', error))
        }
        else
            message.error('未改变数据或数据输入不完整，提交失败')
    }

    render() {


        /** 表头**/
        const columns = [
            {
                title: '指标',
                key: 'Item',
                dataIndex: 'Item',
                // fixed: 'left',
                width: '6%'
            },
            {
                title: '原设置人员',
                dataIndex: 'OldPerson',
                key: 'OldPerson',
                width: '6%',//设置的表格长度
            },
            {
                title: '原起始值',
                dataIndex: 'OldStartValue',
                key: 'OldStartValue',
                width: '6%',//设置的表格长度
            },
            {
                title: '原终点值',
                key: 'OldEndValue',
                dataIndex: 'OldEndValue',
                width: '6%',//设置的表格长度
            },
            {
                title: '原生效时间',
                key: 'OldTime',
                dataIndex: 'OldTime',
                width: '12%',
            },
            {
                title: '原修改原因',
                key: 'OldReason',
                dataIndex: 'OldReason',
                width: '15%',
            },
            {
                title: '新标准起始值',
                key: 'NewStartValue',
                dataIndex: 'NewStartValue',
                width: '8%',
            },
            {
                title: '新终点值',
                key: 'NewEndValue',
                dataIndex: 'NewEndValue',
                width: '8%',//设置的表格长度
            },
            {
                title: '新生效时间',
                key: 'NewTime',
                dataIndex: 'NewTime',
                width: '20%',
            },
            {
                title: '修改原因',
                key: 'Reason',
                dataIndex: 'Reason',
                width: '20%',
            },
            // {
            //     title: '备注',
            //     key: 'Remark',
            //     dataIndex: 'Remark',
            //     width: '25%',
            // },
        ];

        /**限制输入数值位数的函数**start**/
        // const limitDecimals2 = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        // const limitDecimals3 = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        /**限制输入数值位数的函数**end**/

        const data = [];
        /**表格数据输入**/
        for (let i = 0; i < this.state.Item.length; i++) {
            const tableChose = this.state.tableChose
            const Data = this.state.Data;
            data.push(
                {
                    Item: <span>{this.state.Item[i]}</span>,
                    OldPerson: <span>{this.state.username}</span>,
                    OldStartValue: <span>{isNaN(this.state.startValue[i]) ? '' : this.state.startValue[i]}</span>,
                    OldEndValue: <span>{isNaN(this.state.endValue[i]) ? '' : this.state.endValue[i]}</span>,
                    OldTime: this.state.time,
                    OldReason: this.state.reason[i],
                    NewStartValue: <InputNumber
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        value={Data[tableChose][0][i]}
                        step={0.01}
                        style={{width: 'auto'}}
                        onChange={event => this.onInputNumberChange2(event, 0, i)}
                    />,
                    NewEndValue: <InputNumber
                        formatter={limitDecimals3}//限制输入数值位数
                        parser={limitDecimals3}//限制输入数值位数
                        value={Data[tableChose][1][i]}
                        step={0.001}
                        style={{width: 'auto'}}
                        onChange={event => this.onInputNumberChange2(event, 1, i)}
                    />,

                    NewTime: <div>
                        <DatePicker showTime={{format: 'HH:mm'}} value={this.state.Time} format={'YYYY-MM-DD HH:mm'}
                                    onChange={event => this.handleTimeChange(event)}
                        />

                    </div>
                    ,
                    Reason: <Input
                        value={Data[tableChose][2][i]}
                        onChange={event => this.onInputStringChange(event, 2, i)}
                    />,
                    // Remark: <Input
                    //     value={Data[3][i]}
                    //     onChange={event => this.onInputStringChange(event, 3, i)}
                    // />,
                }
            )
        }

        //数据的自动处理显示部分


        return (
            <div>
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={data} pagination={false}/>

            </div>
        );
    }

}
