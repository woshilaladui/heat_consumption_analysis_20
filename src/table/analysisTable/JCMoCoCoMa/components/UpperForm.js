import React, {Component} from 'react';
import {Table, Select, message, Input, DatePicker,InputNumber} from 'antd';
import moment from 'moment';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";

const {Option} = Select;
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

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        this.setState({
            Data: this.props.upperData,
            date: this.props.date,
            t_name: this.props.t_name,
            person:this.props.person
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.props.onRef(this);
    }



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
    postToHome(i) {//i是行数const index = i + this.props.timeChose * 8
        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                index:i,
                data:this.state.Data
            }))
            .then((response) => {
                message.info('暂存成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,index:i})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()
    }


    postAllToHome() {

        //TODO 判断时间选项是否没选过，没选过则提交当前的日期
        //TODO 直接修改了state的属性  待修改
        if(!this.state.Data[2]['t_data'][0])//如果为空的话则对该字段(时间段进行保存)
            this.state.Data[2]['t_data'][0] = moment(this.props.date).format('YYYY/MM/DD').toString()
        //设置提交人
        this.state.Data[6]['t_data'][0] = window.localStorage.name;


        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName:this.props.t_name,
                date:this.state.date,
                data:this.state.Data,
                num:7//7行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                //获取存放的人
               // updateOperator({Data:this.state.Data,num: 7})
                this.setState({
                    Data: this.state.Data
                })
            })
            .catch()

    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        NewData[indexH]["t_data"][indexL] = event;
        this.setState({
            Data: NewData
        });
    };


    timeChange(time){

        let NewData = JSON.parse(JSON.stringify(this.state.Data));// JSON.parse(JSON.stringify(response))

        NewData[2]['t_data'][0] = moment(time).format('YYYY/MM/DD').toString()

        this.setState({
           // date:moment(time).format('YYYY/MM/DD'),
            Data: NewData
        })
    }


    // select方法
    onChangeSelect = (value,indexH,indexL) => {
        let NewData = this.state.Data;
        NewData[indexH]["t_data"][indexL] = value;
        this.setState({
            Data: NewData
        });
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
        const Data = this.state.Data;


        data.push(
            {
                XMMC: '原材料名称',
                NRSM: <Select
                    value={Data[0]['t_data'][0]}
                    style={{width: 200}}
                    placeholder="请选择原材料"
                    onChange={value => this.onChangeSelect(value, 0, 0)}
                >
                    <Option value="石灰石">石灰石</Option>
                    <Option value="砂岩">砂岩</Option>
                    <Option value="铁粉">铁粉</Option>
                    <Option value="粉煤灰(干)">粉煤灰(干)</Option>
                    <Option value="粉煤灰(湿)">粉煤灰(湿)</Option>
                </Select>
            },
            {
                XMMC: '产地',
                NRSM: <Input
                    value={Data[1]['t_data'][0]}
                    onChange={event => this.onInputChange2(event.target.value, 1, 0)}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '日期',

                NRSM: <DatePicker
                    format='YYYY/MM/DD'
                    onChange={date => this.timeChange(date)}
                    value={ Data[2]['t_data'][0]?moment(Data[2]['t_data'][0], dateFormat):moment(this.state.date, dateFormat)}

                    defaultValue={ moment(this.state.date, dateFormat)}
                                  style={{width: 200}}/>
            },
            {
                XMMC: '班次',
                NRSM: <Select
                    showSearch
                    value={Data[3]['t_data'][0]}
                    //defaultValue={Data[3]['t_data'][0]}
                    style={{width: 200}}
                    placeholder="请选择班次"
                    onChange={value => this.onChangeSelect(value, 3, 0)}
                >
                    <Select.Option value="0点班">0点班</Select.Option>
                    <Select.Option value="8点班">8点班</Select.Option>
                    <Select.Option value="16点班">16点班</Select.Option>
                </Select>
            },
            {
                XMMC: '水分',
                NRSM: <InputNumber
                    value={Data[4]['t_data'][0]}
                    onChange={event => this.onInputChange2(event, 4, 0)}
                    style={{width: 200}}/>
            },
            {
                XMMC: '取样人',
                NRSM: <Input
                    value={Data[5]['t_data'][0]}
                    onChange={event => this.onInputChange2(event.target.value, 5, 0)}
                    style={{width: 200}}/>
            },
            {
                XMMC: '做样人',
                NRSM: window.localStorage.name
            }
        )
        // }

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