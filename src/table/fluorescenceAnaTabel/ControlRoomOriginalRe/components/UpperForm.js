import React, {Component} from 'react';
import {Table, Button, InputNumber} from 'antd';
import {limitDecimals2,} from '../../../../package/Limit';
import {numCalculate, numCalculate_Initial} from '../../../../package/NumCalculate';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";
import {
    autoCalculate_average, autoCalculate_average_CRO,
    autoCalculate_IL,
    autoCalculateHJ,
    calculate_pass_rate, calculate_pass_rate_CRO
} from "../../../../Helper/Calculate";
import {HuaYSOrder_JC, ZhongKSOrder_CRO} from "../../../../Constant/TableOrder";


class UpperForm extends Component {


    componentDidMount() {


    }

    /**更新props**/


    /**
     * 表格输入数据变化的监听
     **/
    onInputNumberChange = (value, indexH, indexL) => {

        const {data, updateChange, order, startValue, endValue, timeChose,tableWidth} = this.props;
        let NewData = deepCopy(data);//复制一份出来


        //更新表中所填数据
        if (value != null) {
            NewData[indexH]["data"][indexL] = value;
        }



        //计算合格率
        const position = order.indexOf(indexL);//判断此列是否需要计算合格率

        //判断是否需要计算
        if (position >= 0) {
            //计算合格率
            calculate_pass_rate_CRO(NewData, startValue, endValue, order, tableWidth, timeChose, indexL);
        }

        //计算平均值
        autoCalculate_average_CRO(NewData, timeChose, indexL,tableWidth);

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
    }

    //上传当前数据后台
    /**点击暂存之后上传当前行的数据到后台**start**/
    // postToHome(i) {//i是行数
    //     const {data, timeChose, date, t_name, saveToHome} = this.props;
    //     const Data = JSON.parse(JSON.stringify(upperData))
    //     const index = i + timeChose * 8
    //     saveToHome(index, 1, t_name, date, Data)
    // }

    /**点击暂存之后上传当前行的数据到后台**end**/


    render() {

        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        /**表头的设计**start**/
        const columns = [
            {
                title: '时间',
                width: "10%",
                key: 'time',
                dataIndex: 'time',
            },
            {
                title: '熟料',
                dataIndex: 'ShuL',
                key: 'ShuL',
                children: [{
                    title: 'FCaO/%',
                    width: "7.5%",
                    key: 'FCaO',
                    dataIndex: 'FCaO',
                    // render: (value, row, index) => {
                    //     const obj = {
                    //         children: value,
                    //         props: {}
                    //     };
                    //     if (index === 9) {
                    //         obj.props.colSpan = 2;
                    //     }
                    //     if (index === 10) {
                    //         obj.props.colSpan = 2;
                    //     }
                    //     if (index === 11) {
                    //         obj.props.colSpan = 2;
                    //     }
                    //     return obj;
                    // },
                },
                //     {
                //     title: '是否正常',
                //     width: "7.5%",
                //     key: 'IsNormal',
                //     dataIndex: 'IsNormal',
                //     render: (value, row, index) => {
                //         const obj = {
                //             children: value,
                //             props: {}
                //         };
                //         if (index === 9) {
                //             obj.props.colSpan = 0
                //         }
                //         if (index === 10) {
                //             obj.props.colSpan = 0;
                //         }
                //         if (index === 11) {
                //             obj.props.colSpan = 0;
                //         }
                //         return obj;
                //     },
                // }
                ],

            },
            {
                title: '出磨生料',
                key: 'Chu',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'ChuFineness',
                        dataIndex: 'ChuFineness'
                    },
                    {
                        title: '900孔',
                        width: "7.5%",
                        key: 'Chu900',
                        dataIndex: 'Chu900'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'ChuWater',
                        dataIndex: 'ChuWater'
                    }
                ],
            },
            {
                title: '入磨生料',
                key: 'Ru',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'RuFineness',
                        dataIndex: 'RuFineness'
                    },
                    {
                        title: '900孔',
                        width: "7.5%",
                        key: 'Ru900',
                        dataIndex: 'Ru900'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'RuWater',
                        dataIndex: 'RuWater'
                    }
                ],
            },
            {
                title: '煤粉',
                key: 'Coal',
                children: [
                    {
                        title: '细度/um',
                        width: "7.5%",
                        key: 'CoalFineness',
                        dataIndex: 'CoalFineness'
                    },
                    {
                        title: '水分',
                        width: "7.5%",
                        key: 'CoalWater',
                        dataIndex: 'CoalWater'
                    }
                ],
            },
            {
                title: '人员',
                width: "7.5%",
                key: 'person',
                dataIndex: 'person',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 9) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 10) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 11) {
                        obj.props.rowSpan = 0;
                    }

                    return obj;
                },
            },
            // {
            //     title: '暂存',
            //     width: "7.5%",
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            //     render: (value, row, index) => {
            //         const obj = {
            //             children: value,
            //             props: {}
            //         };
            //         if (index === 9) {
            //             obj.props.rowSpan = 3;
            //         }
            //         if (index === 10) {
            //             obj.props.rowSpan = 0;
            //         }
            //         if (index === 11) {
            //             obj.props.rowSpan = 0;
            //         }
            //
            //         return obj;
            //     },
            // }
        ];
        /**表头的设计**end**/


        const dataSource = [];

        const {data, timeChose, allTime} = this.props;
        console.log('upper')
        console.log(data)
        console.log('upper')
        const Data = deepCopy(data);
        const time = deepCopy(allTime);

        console.log('upper')
        console.log(Data)
        console.log('upper')
        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 15;

            const value = Data[index]['data'];
            dataSource.push(
                {
                    time: time[timeChose][i],
                    FCaO: <span><InputNumber
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(0)}//失焦后对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 0)}
                    /></span>,
                    ChuFineness: <span><InputNumber
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(1)}//失焦后对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 1)}
                    /></span>,
                    Chu900: <span><InputNumber
                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(2)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 2)}
                    /></span>,
                    ChuWater: <span><InputNumber
                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(3)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 3)}
                    /></span>,
                    RuFineness: <span><InputNumber
                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(4)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 4)}
                    /></span>,
                    Ru900: <span><InputNumber
                        style={this.changeStyle(value[5])}
                        defaultValue={''}
                        value={isNaN(value[5]) ? null : value[5]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(5)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 5)}
                    /></span>,
                    RuWater: <span><InputNumber
                        style={this.changeStyle(value[6])}
                        defaultValue={''}
                        value={isNaN(value[6]) ? null : value[6]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(6)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 6)}
                    /></span>,
                    CoalFineness: <span><InputNumber
                        style={this.changeStyle(value[7])}
                        defaultValue={''}
                        value={isNaN(value[7]) ? null : value[7]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(7)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 7)}
                    /></span>,
                    CoalWater: <span><InputNumber
                        style={this.changeStyle(value[8])}
                        defaultValue={''}
                        value={isNaN(value[8]) ? null : value[8]}
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        // precision={2}//数值精确值
                        // onBlur={() => this.updataData(8)}//对数据平均值等进行计算
                        onChange={event => this.onInputNumberChange(event, i, 8)}
                    /></span>,
                    person: Data[i + index]['user'],
                    // btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }
        /**中间八行的数据输入**end**/

        /**数据的自动处理显示部分**start**/

        dataSource.push(
            {
                time: '平均',
                FCaO:Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.fcao] ,
                ChuFineness: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_XD],
                Chu900:Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_900K] ,
                ChuWater:Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_SF] ,
                RuFineness: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_XD],
                Ru900: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_900K],
                RuWater: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_SF],
                CoalFineness: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_XD],
                CoalWater: Data[8 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_SF]
            }, {
                time: '总合格数\/总数',
                FCaO:Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.fcao] ,
                ChuFineness: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_XD],
                Chu900:Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_900K] ,
                ChuWater:Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_SF] ,
                RuFineness: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_XD],
                Ru900: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_900K],
                RuWater: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_SF],
                CoalFineness: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_XD],
                CoalWater: Data[9 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_SF]
            }, {
                time: '合格率',
                FCaO:isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.fcao])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.fcao]+" %" ,
                ChuFineness: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_XD])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_XD]+" %" ,
                Chu900:isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_900K])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_900K]+" %"  ,
                ChuWater:isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_SF])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.CMSL_SF]+" %"  ,
                RuFineness: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_XD])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_XD]+" %" ,
                Ru900: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_900K])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_900K]+" %" ,
                RuWater: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_SF])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.RMSL_SF]+" %" ,
                CoalFineness: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_XD])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_XD]+" %" ,
                CoalWater: isNaN(Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_SF])?null:Data[10 + timeChose * 15]['data'][ZhongKSOrder_CRO.MF_SF]+" %"
            }
        );
        /**数据的自动处理显示部分**end**/


        return (
            <div className="upper">
                {/*表格填写*/}
                <Table className="upper" columns={columns} bordered dataSource={dataSource} pagination={false}/>
            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['ControlRoomOriginalRe', 'date']),
        timeChose: state.getIn(['ControlRoomOriginalRe', 'timeChose']),
        data: state.getIn(['ControlRoomOriginalRe', 'data']),
        order: state.getIn(['ControlRoomOriginalRe', 'order']),
        tableWidth: state.getIn(['ControlRoomOriginalRe', 'tableWidth']),
        allTime: state.getIn(['ControlRoomOriginalRe', 'allTime']),
        startValue: state.getIn(['ControlRoomOriginalRe', 'startValue']),
        endValue: state.getIn(['ControlRoomOriginalRe', 'endValue']),
        person: state.getIn(['ControlRoomOriginalRe', 'person']),
        tableName: state.getIn(['ControlRoomOriginalRe', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {

            dispatch(actionCreators.updateData({data: deepCopy(NewData)}))
        },


    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);