import React, {Component} from 'react';
import {Table, Select, message, Input, DatePicker, InputNumber} from 'antd';
import moment from 'moment';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

export default class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeChose: 0,
            Data: [],//原始填写的数据
            t_name: "",
            date: "",
            person: this.props.person
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        this.setState({
            Data: this.props.upperData,
            date: this.props.date,
            t_name: this.props.t_name,
            person: this.props.person
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;

        NewData[indexH]["t_data"][indexL] = event;
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


    timeChange(time, index) {

        let NewData = JSON.parse(JSON.stringify(this.state.Data));// JSON.parse(JSON.stringify(response))

        NewData[index]['t_data'][0] = moment(time).format('YYYY/MM/DD').toString()

        this.setState({
            // date:moment(time).format('YYYY/MM/DD'),
            Data: NewData
        })
    }

    // select方法
    onChangeSelect = (value, indexH, indexL) => {
        let NewData = this.state.Data;
        NewData[indexH]["t_data"][indexL] = value;
        this.setState({
            Data: NewData
        });
    }

    postAllToHome() {


        //判断时间选项是否选择过，没选过这存当前的时间
        //TODO 直接修改了state的属性，涉及到线程的问题，待修改
        if(!this.state.Data[0]['t_data'][0])//如果为空的话则对该字段(时间段进行保存)
            this.state.Data[0]['t_data'][0] = moment(this.props.date).format('YYYY/MM/DD').toString()
        if(!this.state.Data[11]['t_data'][0])
            this.state.Data[11]['t_data'][0] = moment(this.props.date).format('YYYY/MM/DD').toString()

        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName: this.props.t_name,
                date: this.state.date,
                data: this.state.Data,
                num: 13//13行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()

    }


    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**表头的设计**start**/
        const columns = [
            {
                title: '项目名称',
                dataIndex: 'XMMC',
            },
            {
                title: "内容说明",
                dataIndex: 'NRSM'
            },
        ];



        const data = [];
        const Data = this.state.Data;//浅拷贝

        data.push(
            {
                XMMC: '检测日期',
                NRSM: <DatePicker
                    format='YYYY/MM/DD'
                    onChange={date => this.timeChange(date, 0)}
                    value={Data[0]['t_data'][0] ? moment(Data[0]['t_data'][0], dateFormat) : moment(this.state.date, dateFormat)}

                    defaultValue={moment(this.state.date, dateFormat)}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '车牌号',
                NRSM: <Input
                    value={Data[1]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event.target.value, 1, 0)
                    }}
                    style={{width: 200}}/>
            },
            {
                XMMC: 'Wy(外水)',
                NRSM: <InputNumber
                    value={Data[2]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 2, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: 'Wf(内水)',
                NRSM: <InputNumber
                    value={Data[3]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 3, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: 'Vf（挥发分）',
                NRSM: <InputNumber
                    value={Data[4]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 4, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: 'Af（灰分）',
                NRSM: <InputNumber
                    value={Data[5]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 5, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: 'C（固定碳）',
                NRSM: <InputNumber
                    value={Data[6]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 6, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: 'S（硫）',
                NRSM: <InputNumber
                    value={Data[7]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event, 7, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '分析基',
                NRSM: <Input
                    value={Data[8]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event.target.value, 8, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '收到基',
                NRSM: <Input
                    value={Data[9]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event.target.value, 9, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '厂家',
                NRSM: <Input
                    value={Data[10]['t_data'][0]}
                    onChange={event => {
                        this.onInputNumberChange2(event.target.value, 10, 0)
                    }}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '进厂日期',
                NRSM: <DatePicker
                    format='YYYY/MM/DD'
                    onChange={date => this.timeChange(date, 11)}
                    value={Data[11]['t_data'][0] ? moment(Data[11]['t_data'][0], dateFormat) : moment(this.state.date, dateFormat)}
                    defaultValue={moment(this.state.date, dateFormat)}
                    style={{width: 200}}/>
            },
            {
                XMMC: '班次',
                NRSM: <Select
                    style={{width: 200}}
                    value={Data[12]['t_data'][0]}
                    placeholder="请选择班次"
                    onChange={value => this.onChangeSelect(value, 12, 0)}
                >
                    <Option value="0点班">0点班</Option>
                    <Option value="8点班">8点班</Option>
                    <Option value="16点班">16点班</Option>
                </Select>
            }
        )

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