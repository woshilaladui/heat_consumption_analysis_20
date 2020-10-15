import React, {Component} from 'react';
import {Table, InputNumber, Button, message} from 'antd';

import * as actionCreators from "../../KilnCAnaSumTable/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";

import {HuaYSOrder_RMC} from "../../../../Constant/TableOrder";
import {
    autoCalculate_average,
    autoCalculate_KH, autoCalculate_KH_1,
    autoCalculate_N,
    autoCalculate_P, autoCalculateHJ,
} from "../../../../Helper/Calculate";


class UpperForm extends Component {






    componentDidMount() {

    }


    componentWillMount() {

    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }


    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        const {data, updateChange, width, timeChose,tableWidth,tableName,data_CRO} = this.props;
        let NewData = deepCopy(data);//复制一份出来
        let NewData_CRO = deepCopy(data_CRO);//复制一份出来



        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
        }



        //更新KH字段 和KH-
        //(CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
        //(CaO-(1.65* Al2O3+0.35* Fe2O3)-fCaO)/(2.8* SiO2)
        if(
            indexL === HuaYSOrder_RMC.CaO
            ||
            indexL === HuaYSOrder_RMC.Fe2O3
            ||
            indexL === HuaYSOrder_RMC.Al2O3
            ||
            indexL === HuaYSOrder_RMC.SiO2
        ){

            autoCalculate_KH(NewData,indexH,tableName);
            autoCalculate_KH_1(NewData,NewData_CRO,indexH,tableName)

        }

        //更新N字段
        //SiO2/(Al2O3+Fe2O3)
        if(
            indexL === HuaYSOrder_RMC.SiO2
            ||
            indexL === HuaYSOrder_RMC.Al2O3
            ||
            indexL === HuaYSOrder_RMC.Fe2O3
        ){

            autoCalculate_N(NewData,indexH,tableName);

        }

        //更新P字段
        //Al2O3/ Fe2O3
        if(
            indexL === HuaYSOrder_RMC.Al2O3
            ||
            indexL === HuaYSOrder_RMC.Fe2O3
        ){

            autoCalculate_P(NewData,indexH,tableName);

        }


        //计算合格率
        // const position = order.indexOf(indexL);//判断此列是否需要计算合格率
        //
        // //判断是否需要计算
        // if (position >= 0) {
        //     //计算合格率
        //     calculate_pass_rate(NewData, startValue, endValue, order, width, timeChose, indexL);
        // }

        //计算平均值
        autoCalculate_average(NewData, timeChose, indexL,tableWidth);
        let sum = autoCalculateHJ(NewData[indexH]['data'], width);
        NewData[indexH]['data'][HuaYSOrder_RMC.HJ] = sum;

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
                width: "3%"
            },
            {
                title: 'SJ',
                dataIndex: "SJ",
                width: "6%"
            },
            {
                title: 'SiO2',
                dataIndex: 'SiO2',
                width: "6%"
            },
            {
                title: 'Al2O3',
                dataIndex: 'Al2O3',
                width: "6%"
            },
            {
                title: 'Fe2O3',
                dataIndex: 'Fe2O3',
                width: "6%"
            },
            {
                title: 'CaO',
                dataIndex: 'CaO',
                width: "6%"
            },
            {
                title: 'MgO',
                dataIndex: 'MgO',
                width: "6%"
            },
            {
                title: '合计',
                dataIndex: 'HJ',
                width: "6%"
            },
            {
                title: 'fCaO',
                dataIndex: 'fCaO',
                width: "6%"
            },
            {
                title: 'KH',
                dataIndex: 'KH',
                width: "6%"
            },
            {
                title: 'KH_',
                dataIndex: 'KH_',
                width: "6%"
            },
            {
                title: 'N',
                dataIndex: 'N',
                width: "6%"
            },
            {
                title: 'P',
                dataIndex: 'P',
                width: "6%"
            },
            {
                title: 'C3S',
                dataIndex: 'C3S',
                width: "6%"
            },
            {
                title: 'C2S',
                dataIndex: 'C2S',
                width: "6%"
            },
            {
                title: 'C3A',
                dataIndex: 'C3A',
                width: "6%"
            },
            {
                title: 'C4AF',
                dataIndex: 'C4AF',
                width: "6%"
            },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width: "3%"
            },
            // {
            //     title: '暂存',
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            //     width: "4%"
            // }
        ];

        const dataSource = [];


        const {data, timeChose, allTime,data_CRO} = this.props;
        const Data = deepCopy(data);
        const Data_CRO = deepCopy(data_CRO);
        const time = deepCopy(allTime);

        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 10;
            const index_CRO = i + timeChose * 14;
            const value = Data[index]['data'];
            const value_CRO = Data_CRO[index_CRO]['data'];
            dataSource.push(
                {
                    time: time[timeChose][i],
                    SJ: <span><InputNumber
                        style={this.changeStyle(value[HuaYSOrder_RMC.SJ])}
                        defaultValue={''}
                        value={isNaN(value[HuaYSOrder_RMC.SJ]) ? null : value[HuaYSOrder_RMC.SJ]}

                        onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.SJ)}
                    /></span>,
                    SiO2:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.SiO2])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.SiO2]) ? null : value[HuaYSOrder_RMC.SiO2]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.SiO2)}
                        /></span>,
                    Al2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.Al2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.Al2O3]) ? null : value[HuaYSOrder_RMC.Al2O3]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.Al2O3)}
                        /></span>,
                    Fe2O3:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.Fe2O3])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.Fe2O3]) ? null : value[HuaYSOrder_RMC.Fe2O3]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.Fe2O3)}
                        /></span>,
                    CaO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.CaO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.CaO]) ? null : value[HuaYSOrder_RMC.CaO]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.CaO)}
                        /></span>,
                    MgO:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.MgO])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.MgO]) ? null : value[HuaYSOrder_RMC.MgO]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.MgO)}
                        /></span>,
                    HJ:
                        <span>{isNaN(value[HuaYSOrder_RMC.HJ]) ? null : value[HuaYSOrder_RMC.HJ]}</span>,
                    fCaO:
                        <span>{isNaN(value_CRO[0]) ? null : value_CRO[0]}</span>,
                    KH:
                        <span>{isNaN(value[HuaYSOrder_RMC.KH]) ? null : value[HuaYSOrder_RMC.KH]}</span>,
                    KH_:
                        <span>{isNaN(value[HuaYSOrder_RMC.KH_]) ? null : value[HuaYSOrder_RMC.KH_]}</span>,
                    N:
                        <span>{isNaN(value[HuaYSOrder_RMC.N]) ? null : value[HuaYSOrder_RMC.N]}</span>,
                    P:
                        <span>{isNaN(value[HuaYSOrder_RMC.P]) ? null : value[HuaYSOrder_RMC.P]}</span>,
                    C3S:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.C3S])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.C3S]) ? null : value[HuaYSOrder_RMC.C3S]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.C3S)}
                        /></span>,
                    C2S:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.C2S])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.C2S]) ? null : value[HuaYSOrder_RMC.C2S]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.C2S)}
                        /></span>,
                    C3A:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.C3A])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.C3A]) ? null : value[HuaYSOrder_RMC.C3A]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.C3A)}
                        /></span>,
                    C4AF:
                        <span><InputNumber
                            style={this.changeStyle(value[HuaYSOrder_RMC.C4AF])}
                            defaultValue={''}
                            value={isNaN(value[HuaYSOrder_RMC.C4AF]) ? null : value[HuaYSOrder_RMC.C4AF]}

                            onChange={event => this.onInputNumberChange2(event, index, HuaYSOrder_RMC.C4AF)}
                        /></span>,
                    person:
                        Data[index]['user'],
                    // btn_save:
                    //     <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        //数据的自动处理显示部分

        dataSource.push(
            {
                time: '平均',
                SJ:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.SJ],
                SiO2:   Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.SiO2],
                Al2O3:  Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.Al2O3],
                Fe2O3:  Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.Fe2O3],
                CaO:    Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.CaO],
                MgO:    Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.MgO],
                HJ:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.HJ],
                // fCaO:   Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.fCaO],
                fCaO:   Data_CRO[8 + timeChose * 15]['data'][0],
                KH:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.KH],
                KH_:    Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.KH_],
                N:       Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.N],
                P:       Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.P],
                C3S:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.C3S],
                C2S:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.C2S],
                C3A:     Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.C3A],
                C4AF:    Data[8 + timeChose * 10]['data'][HuaYSOrder_RMC.C4AF],
                // Remarks_list:'--',

            },
            {
                time: '合格率',
                SJ: '~~',
                SiO2: '~~',
                Al2O3: '~~',
                Fe2O3: '~~',
                CaO: '~~',
                MgO: '~~',
                HJ: '~~',
                fCaO: '~~',
                KH: '~~',
                KH_: '~~',
                N: '~~',
                P: '~~',
                C3S: '~~',
                C2S: '~~',
                C3A: '~~',
                C4AF: '~~',
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
        date: state.getIn(['KilnCAnaSumTable', 'date']),
        order: state.getIn(['KilnCAnaSumTable', 'order']),
        width: state.getIn(['KilnCAnaSumTable', 'width']),
        tableWidth: state.getIn(['KilnCAnaSumTable', 'tableWidth']),
        allTime: state.getIn(['KilnCAnaSumTable', 'allTime']),
        timeChose: state.getIn(['KilnCAnaSumTable', 'timeChose']),
        data: state.getIn(['KilnCAnaSumTable', 'data']),
        data_CRO: state.getIn(['KilnCAnaSumTable', 'data_CRO']),
        requestFlag: state.getIn(['KilnCAnaSumTable', 'requestFlag']),
        startValue: state.getIn(['KilnCAnaSumTable', 'startValue']),
        endValue: state.getIn(['KilnCAnaSumTable', 'endValue']),
        person: state.getIn(['KilnCAnaSumTable', 'person']),
        tableName: state.getIn(['KilnCAnaSumTable', 'tableName']),
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