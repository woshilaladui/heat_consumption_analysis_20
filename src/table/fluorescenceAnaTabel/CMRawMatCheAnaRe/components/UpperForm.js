
import React, {Component} from 'react';
import {Table, InputNumber} from 'antd';

import {limitDecimals2} from "../../../../package/Limit";

import {HuaYSOrder_CMRYSL, HuaYSOrder_JC} from "../../../../Constant/TableOrder"

import * as actionCreators from "../../CMRawMatCheAnaRe/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";
import {
    autoCalculate_average,
    autoCalculate_IL,
    autoCalculateHJ,
    calculate_pass_rate,
    autoCalculate_KH,
    autoCalculate_N,
    autoCalculate_P, calculate_pass_rate_cmsl
} from "../../../../Helper/Calculate";

class UpperForm extends Component {




    componentDidMount() {

    }


    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     * 参数顺序  输入的数值，行数，列数
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        const {data, updateChange, order, startValue, endValue, width, timeChose,tableWidth,tableName} = this.props;
        let NewData = deepCopy(data);//复制一份出来


        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
        }

        //更新IL字段
        if(indexL === HuaYSOrder_CMRYSL.CaO || indexL === HuaYSOrder_CMRYSL.MgO){
            autoCalculate_IL(NewData,indexH);
        }

        //更新KH字段
        //(CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
        if(
            indexL === HuaYSOrder_CMRYSL.CaO
            ||
            indexL === HuaYSOrder_CMRYSL.Fe2O3
            ||
            indexL === HuaYSOrder_CMRYSL.Al2O3
            ||
            indexL === HuaYSOrder_CMRYSL.SiO2
        ){

            autoCalculate_KH(NewData,indexH,tableName);

        }

        //更新N字段
        //SiO2/(Al2O3+Fe2O3)
        if(
            indexL === HuaYSOrder_CMRYSL.SiO2
            ||
            indexL === HuaYSOrder_CMRYSL.Al2O3
            ||
            indexL === HuaYSOrder_CMRYSL.Fe2O3
        ){

            autoCalculate_N(NewData,indexH,tableName);

            // if(!(
            //     NewData[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3] === null
            //     &&
            //     NewData[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3] === null
            // )){
            //
            // }

        }

        //更新P字段
        //Al2O3/ Fe2O3
        if(
            indexL === HuaYSOrder_CMRYSL.Al2O3
            ||
            indexL === HuaYSOrder_CMRYSL.Fe2O3
        ){

            autoCalculate_P(NewData,indexH,tableName);

            //Fe2O3 不能空
            // if(
            //
            //         NewData[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3] !== null
            //
            // ){
            //
            // }
        }


        //计算合格率
        const position = order.indexOf(indexL);//判断此列是否需要计算合格率

        //判断是否需要计算

            //计算合格率和KH N P 合计平均值
        console.log("NewData")
        console.log(NewData)
        console.log("NewData")
            calculate_pass_rate_cmsl(NewData, startValue, endValue, order, width, timeChose, indexL);


        //计算平均值
        autoCalculate_average(NewData, timeChose, indexL,tableWidth);
        let sum = autoCalculateHJ(NewData[indexH]['data'], width);
        NewData[indexH]['data'][HuaYSOrder_JC.HJ] = sum;

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
        }//end if
    };

    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
                width: "5.5%"
            },
            {
                title: '水分',
                dataIndex: "SF",
                width: "5.5%"
            },
            {
                title: 'IL',
                dataIndex: 'IL',
                width: "5.5%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "5.5%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "5.5%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "5.5%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "5.5%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "5.5%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "5.5%"
            },
            {
                title: 'K2O',
                dataIndex: 'K2O',
                width: "5.5%"
            },
            // {
            //     title: 'Na2O',
            //     dataIndex: 'Na2O',
            //     width: "5.5%"
            // },
            {
                title: 'KH',
                dataIndex: 'KH',
                width: "5.5%"
            },
            {
                title: 'N',
                dataIndex: 'N',
                width: "5.5%"
            },
            {
                title: 'P',
                dataIndex: 'P',
                width: "5.5%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "5%"
            },
            // {
            //     title: '暂存',
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            //     width: "6%"
            // }
        ];

        const dataSource = [];
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
                        style={this.changeStyle(value[HuaYSOrder_CMRYSL.SF])}
                        defaultValue={''}
                        value={isNaN(value[HuaYSOrder_CMRYSL.SF]) ? null : value[HuaYSOrder_CMRYSL.SF]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.SF)}
                    /></span>,
                    IL:
                        <span>{isNaN(value[HuaYSOrder_CMRYSL.IL]) ? null : value[HuaYSOrder_CMRYSL.IL]}</span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.SiO2])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.SiO2]) ? null : value[HuaYSOrder_CMRYSL.SiO2]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.SiO2)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.Al2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.Al2O3]) ? null : value[HuaYSOrder_CMRYSL.Al2O3]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.Al2O3)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.Fe2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.Fe2O3]) ? null : value[HuaYSOrder_CMRYSL.Fe2O3]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.Fe2O3)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.CaO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.CaO]) ? null : value[HuaYSOrder_CMRYSL.CaO]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.CaO)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.MgO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.MgO]) ? null : value[HuaYSOrder_CMRYSL.MgO]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.MgO)}
                        /></span>,
                    HJ:
                        <span>{isNaN(value[HuaYSOrder_CMRYSL.HJ]) ? null : value[HuaYSOrder_CMRYSL.HJ].toFixed(2)}</span>,
                    K2O:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_CMRYSL.K2O])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_CMRYSL.K2O]) ? null : value[HuaYSOrder_CMRYSL.K2O]}
                            formatter={limitDecimals2}//限制输入数值位数
                            parser={limitDecimals2}//限制输入数值位数

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_CMRYSL.K2O)}
                        /></span>,
                    // Na2O:
                    //     <span><InputNumber
                    //         style={this.changeStyle(value[9])}
                    //         defaultValue={''}
                    //         value={isNaN(value[9]) ? null : value[9]}
                    //         formatter={limitDecimals2}//限制输入数值位数
                    //         parser={limitDecimals2}//限制输入数值位数
                    //         onBlur={() => this.updataData(9)}
                    //         onChange={event => this.onInputNumberChange2(event, i, 9)}
                    //     /></span>,
                    KH:
                        <span>{isNaN(value[HuaYSOrder_CMRYSL.KH]) ? null : value[HuaYSOrder_CMRYSL.KH]}</span>,
                    N:
                        <span>{isNaN(value[HuaYSOrder_CMRYSL.N]) ? null : value[HuaYSOrder_CMRYSL.N]}</span>,
                    P:
                        <span>{isNaN(value[HuaYSOrder_CMRYSL.P]) ? null : value[HuaYSOrder_CMRYSL.P]}</span>,
                    person:
                        Data[index]['user'],
                    // btn_save:
                    //     <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }


        dataSource.push(
            {
                time: '平均',
                SF:      Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.SF],
                IL:      Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.IL],
                SiO2:    Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.SiO2],
                Al2O3:   Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.Al2O3],
                Fe2O3:   Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.Fe2O3],
                CaO:     Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.CaO],
                MgO:     Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.MgO],
                HJ:      Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.HJ],
                K2O:     Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.K2O],
                KH:      Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.KH],
                N:       Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.N],
                P:       Data[8 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.P],

            },
            {
                time: '合格率',
                SF: '~',
                IL: '~',
                SiO2: '~',
                Al2O3: '~',
                Fe2O3: '~',
                CaO: '~',
                MgO: '~',
                HJ: '~',
                K2O: '~',
                KH:  isNaN(Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.KH])?null:Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.KH]+'%',
                N:  isNaN(Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.N])?null:Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.N]+'%',
                P:  isNaN(Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.P])?null:Data[9 + timeChose * 10]['data'][HuaYSOrder_CMRYSL.P]+'%',
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
        date: state.getIn(['CMRawMatCheAnaRe', 'date']),
        order: state.getIn(['CMRawMatCheAnaRe', 'order']),
        width: state.getIn(['CMRawMatCheAnaRe', 'width']),
        tableWidth: state.getIn(['CMRawMatCheAnaRe', 'tableWidth']),
        allTime: state.getIn(['CMRawMatCheAnaRe', 'allTime']),
        timeChose: state.getIn(['CMRawMatCheAnaRe', 'timeChose']),
        data: state.getIn(['CMRawMatCheAnaRe', 'data']),
        requestFlag: state.getIn(['CMRawMatCheAnaRe', 'requestFlag']),
        startValue: state.getIn(['CMRawMatCheAnaRe', 'startValue']),
        endValue: state.getIn(['CMRawMatCheAnaRe', 'endValue']),
        person: state.getIn(['CMRawMatCheAnaRe', 'person']),
        tableName: state.getIn(['CMRawMatCheAnaRe', 'tableName']),
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