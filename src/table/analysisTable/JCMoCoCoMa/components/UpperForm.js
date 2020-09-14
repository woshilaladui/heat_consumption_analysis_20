import React, {Component} from 'react';
import {Table, Select, message, Input, DatePicker,InputNumber} from 'antd';
import moment from 'moment';


import * as actionCreators from "../../../analysisTable/JCMoCoCoMa/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";

const {Option} = Select;
const dateFormat = 'YYYY/MM/DD';

class UpperForm extends Component {

    componentWillMount() {

    }


    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {

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
    };

    onInputChange2 = (value, indexH, indexL) => {
        const {data, updateChange} = this.props;
        let NewData = deepCopy(data);//复制一份出来

        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
            updateChange(NewData);
        }
    };


    timeChange(time,indexH,indexL){

        const {data, updateChange} = this.props;
        let NewData = deepCopy(data);//复制一份出来

        //更新表中所填数据
        if (time != null) {
            NewData[indexH]["data"][indexL] = moment(time).format('YYYY/MM/DD').toString();
            updateChange(NewData);
        }
    }


    // select方法
    onChangeSelect = (value,indexH,indexL) => {
        const {data, updateChange} = this.props;
        let NewData = deepCopy(data);//复制一份出来

        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
            updateChange(NewData);
        }

    };

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

        const dataSource = [];
        const {data,date,person} = this.props;
        const Data = deepCopy(data);


        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }
        
        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        dataSource.push(
            {
                XMMC: '原材料名称',
                NRSM: <Select
                    value={Data[0]['data'][0]}
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
                    value={Data[1]['data'][0]}
                    onChange={event => this.onInputChange2(event.target.value, 1, 0)}
                    style={{width: 200}}
                />
            },
            {
                XMMC: '日期',

                NRSM: <DatePicker
                    format='YYYY/MM/DD'
                    onChange={date => this.timeChange(date,2,0)}
                    value={ Data[2]['data'][0]?moment(Data[2]['data'][0], dateFormat):moment(date, dateFormat)}

                    defaultValue={ moment(date, dateFormat)}
                                  style={{width: 200}}/>
            },
            {
                XMMC: '班次',
                NRSM: <Select
                    showSearch
                    value={Data[3]['data'][0]}
                    //defaultValue={Data[3]['data'][0]}
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
                    value={Data[4]['data'][0]}
                    onChange={event => this.onInputChange2(event, 4, 0)}
                    style={{width: 200}}/>
            },
            {
                XMMC: '取样人',
                NRSM: <Input
                    value={Data[5]['data'][0]}
                    onChange={event => this.onInputChange2(event.target.value, 5, 0)}
                    style={{width: 200}}/>
            },
            {
                XMMC: '做样人',
                NRSM: person
            }
        );
        // }

        /**中间八行的数据输入**end**/

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={dataSource} pagination={false}/>

            </div>
        );
    }

}
//定义映射
const mapStateToProps = (state) => {
    return {
        //LX
        date: state.getIn(['JCMoCoCoMa', 'date']),
        timeChose: state.getIn(['JCMoCoCoMa', 'timeChose']),
        data: state.getIn(['JCMoCoCoMa', 'data']),
        requestFlag: state.getIn(['JCMoCoCoMa', 'requestFlag']),
        person: state.getIn(['JCMoCoCoMa', 'person']),
        tableName: state.getIn(['JCMoCoCoMa', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {

            dispatch(actionCreators.updateData({data: deepCopy(NewData)}))
        },


    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(UpperForm);