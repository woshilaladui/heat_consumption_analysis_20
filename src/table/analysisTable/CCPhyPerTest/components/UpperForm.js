import React, {Component} from 'react';
import {Input, Table, Button, message} from 'antd';
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getAnalysisJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";


export default class UpperForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],//原始填写的数据
            t_name: "",
            date: "",
            BanCi: ['安定性', '初凝(min)', '终凝(min)', 'SO3', '比表面积', '3天抗折', '3天抗压', '上月28天抗折', '上月28天抗压', '稠度', '28天抗压S', '出厂熟料合格', '富裕强度合格'],
            Placeholder:['合格/不合格','','','','','','','多条数据','多条数据','','上月28天抗压的标准','合格/不合格','合格/不合格']
            // person: this.props.person
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
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        this.setState({
            Data: this.props.upperData,
            date: this.props.date,
            t_name: this.props.t_name,
        });
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        //
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

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    postToHome(i) {//i是行数
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
        HuaYSSave(
            URL.HUAYS_SAVE,
            getAnalysisJsonSaveData({
                tableName:this.props.t_name,
                date:this.props.date,
                data:this.state.Data,
                num:13//5行数据提交
            }))
            .then((response) => {
                message.info('提交成功');
                //获取存放的人
                updateOperator({Data:this.state.Data,num: 13})
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
                title: "填写内容",
                dataIndex: 'TXNR'
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


        /**中间八行的数据输入**start**/
        const data = [];
        const Data = this.state.Data;
        for (let i = 0; i < 13; i++) {

            const value = Data[i]['t_data'];
            data.push(
                {
                    XMMC: this.state.BanCi[i],
                    TXNR: <span><Input

                        placeholder={this.state.Placeholder[i]}
                        defaultValue={''}
                        value={value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    person: Data[i]['user'],
                    btn_save: <Button type='primary' onClick={() => this.postToHome(i, 0)}>暂存</Button>,
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