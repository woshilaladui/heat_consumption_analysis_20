import React, {Component} from 'react';
import {Table, InputNumber} from 'antd';

import {limitDecimals2} from "../../../../package/Limit";

import {HuaYSOrder_JC} from "../../../../Constant/TableOrder"

import * as actionCreators from "../../RawMatCheAnaReSY/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";
import {
    autoCalculate_average,
    autoCalculate_IL,
    autoCalculateHJ,
    calculate_pass_rate
} from "../../../../Helper/Calculate";

class UpperForm extends Component {


    /**初始化**/
    componentDidMount() {

    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {

    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {


        const {data, updateChange, order, startValue, endValue, width, timeChose,tableWidth} = this.props;
        let NewData = deepCopy(data);//复制一份出来


        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
        }

        //更新IL字段
        if(indexL === 5 || indexL === 6){
            autoCalculate_IL(NewData,indexH);
        }


        //计算合格率
        const position = order.indexOf(indexL);//判断此列是否需要计算合格率

        //判断是否需要计算
        if (position >= 0) {
            //计算合格率
            calculate_pass_rate(NewData, startValue, endValue, order, tableWidth, timeChose, indexL);
        }

        //计算平均值
        autoCalculate_average(NewData, timeChose, indexL,tableWidth);

        //计算合计的平均值
        let sum_average_sum =Array(3).fill(0);
        let inputCount = Array(3).fill(0);//3个班次中非0的个数
        let sum = autoCalculateHJ(NewData[indexH]['data'], width);
        NewData[indexH]['data'][HuaYSOrder_JC.HJ] = sum;

        for (let i = 0; i < 8; i++) {
            let index = i + timeChose * 10;
            if (!isNaN(parseFloat(NewData[index]['data'][HuaYSOrder_JC.HJ]))
              &&
              (parseFloat(NewData[index]['data'][HuaYSOrder_JC.HJ]) != null)
              &&
              NewData[index]['data'][HuaYSOrder_JC.HJ] != ''
            ) {
                inputCount[timeChose]++;

                sum_average_sum[timeChose] += NewData[index]['data'][HuaYSOrder_JC.HJ];
            }


        }//end for


        NewData[timeChose*10+8]['data'][HuaYSOrder_JC.HJ] = ((sum_average_sum[timeChose]*1.0)/inputCount[timeChose]).toFixed(3)
        //更新数据
        updateChange(NewData);


    };


    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {
            if (isNaN(value) || value > 100) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }

        const {startValue, endValue} = this.props;

        if (value) {
            if (isNaN(value) || value >= startValue || value <= endValue) {
                return {
                    borderColor: 'red',
                    color: 'red',
                }
            }
        }

    };


    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
                width: "7%"
            },
            {
                title: '水分',
                dataIndex: "SF",
                width: "8%"
            },
            {
                title: 'IL',
                dataIndex: 'IL',
                width: "8%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "8%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "8%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "8%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "8%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "8%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "8%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "6%"
            },

        ];

        const dataSource = [];
        //中间八行的数据输入
        const {data, timeChose, allTime} = this.props;
        const Data = deepCopy(data);
        const time = deepCopy(allTime);

        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        for (let i = 0; i < 8; i++) {

            const index = i + timeChose * 10;

            const value = Data[index]['data'];
            dataSource.push(
                {
                    time: time[timeChose][i],
                    SF: <span><InputNumber
                        style={this.changeStyle(value[HuaYSOrder_JC.SF])}
                        defaultValue={''}
                        value={isNaN(value[HuaYSOrder_JC.SF]) ? null : value[HuaYSOrder_JC.SF]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.SF)}
                    /></span>,
                    IL: <span>{isNaN(value[HuaYSOrder_JC.IL]) ? null : value[HuaYSOrder_JC.IL]}</span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.SiO2])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.SiO2]) ? null : value[HuaYSOrder_JC.SiO2]}
                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.SiO2)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.Al2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.Al2O3]) ? null : value[HuaYSOrder_JC.Al2O3]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.Al2O3)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.Fe2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.Fe2O3]) ? null : value[HuaYSOrder_JC.Fe2O3]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.Fe2O3)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.CaO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.CaO]) ? null : value[HuaYSOrder_JC.CaO]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.CaO)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_JC.MgO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_JC.MgO]) ? null : value[HuaYSOrder_JC.MgO]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_JC.MgO)}
                        /></span>,
                    HJ: <span>{isNaN(value[HuaYSOrder_JC.HJ]) ? null : value[HuaYSOrder_JC.HJ].toFixed(2)}</span>,
                    person:
                        Data[index]['user'],

                }
            )
        }


        dataSource.push(
            {
                time: '平均',
                SF: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.SF],
                IL:    isNaN(Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.IL])?null:Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.IL],
                SiO2: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.SiO2],
                Al2O3: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.Al2O3],
                Fe2O3: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.Fe2O3],
                CaO: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.CaO],
                MgO: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.MgO],
                HJ: Data[8 + timeChose * 10]['data'][HuaYSOrder_JC.HJ]


            },
            {
                time: '合格率',
                SF: Data[9 + timeChose * 10]['data'][HuaYSOrder_JC.SF],
                IL: '~~',
                SiO2: Data[9 + timeChose * 10]['data'][HuaYSOrder_JC.SiO2],
                Al2O3: '~~',
                Fe2O3: '~~',
                CaO: '~~',
                MgO: '~~',
                HJ: '~~',
            }
        );


        return (
            <div className="upper">
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={dataSource} pagination={false}/>
            </div>
        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {


        date: state.getIn(['RawMatCheAnaReSY', 'date']),
        order: state.getIn(['RawMatCheAnaReSY', 'order']),//tableWidth
        width: state.getIn(['RawMatCheAnaReSY', 'width']),
        tableWidth: state.getIn(['RawMatCheAnaReSY', 'tableWidth']),
        allTime: state.getIn(['RawMatCheAnaReSY', 'allTime']),
        timeChose: state.getIn(['RawMatCheAnaReSY', 'timeChose']),
        data: state.getIn(['RawMatCheAnaReSY', 'data']),
        requestFlag: state.getIn(['RawMatCheAnaReSY', 'requestFlag']),
        startValue: state.getIn(['RawMatCheAnaReSY', 'startValue']),
        endValue: state.getIn(['RawMatCheAnaReSY', 'endValue']),
        person: state.getIn(['RawMatCheAnaReSY', 'person']),
        tableName: state.getIn(['RawMatCheAnaReSY', 'tableName']),
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