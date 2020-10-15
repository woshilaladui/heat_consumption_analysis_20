import React, {Component} from 'react';
import {Table, Input, InputNumber, Button, message} from 'antd';
import {numCalculate_Initial, numCalculate, autoCalculate, divisionCalculate} from "../../../../package/NumCalculate"
import {limitDecimals2, limitDecimals3} from "../../../../package/Limit"
import {HuaYSSave} from "../../../../Request/RequsetCenter";
import {URL} from "../../../../Request/Constant";
import {getHuaYSJsonSaveData} from "../../../../Request/JsonCenter";
import {updateOperator} from "../../../../Helper/AutoCalculate";
import * as actionCreators from "../../RYRawMatCheAnaRe/store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
import {connect} from "react-redux";
import {autoCalculateHJ} from "../../../../Helper/Calculate";
import {HuaYSOrder_CX} from "../../../../Constant/TableOrder";

class UpperForm extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         Time: [],//第一列的时间变化自动控制
    //         Data: [],//原始填写的数据
    //     }
    // }


    /**初始化**/
    componentDidMount() {
        //绑定ref
        // this.props.onRef(this);
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        // const allTime = [
        //     ['石灰石','岩砂','粉煤灰(湿)','铁粉'],
        //     ['石灰石','岩砂','粉煤灰(湿)','铁粉'],
        //     ['石灰石','岩砂','粉煤灰(湿)','铁粉']
        // ];
        // this.setState({
        //     Time: [...allTime[this.props.timeChose]],
        //     Data: this.props.upperData,
        // })
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {

    }





    updataData_Initial(standard) {
        let temp1 = 0;//计算均值和合格率的临时数据
        let temp2 = 0;
        let temp3 = 0;
        let str = '';//计算合格比率的临时数据
        let inputCount0 = [], inputCount8 = [], inputCount16 = [];//各班次输入的总数
        let passCount0 = [], passCount8 = [], passCount16 = [];//各班次的合格数
        let passRate0 = [], passRate8 = [], passRate16 = [];//各班次的合格率
        let ratio0 = [], ratio8 = [], ratio16 = [];//各班次的合格比率
        //计算合格率部分
        for (let i = 0; i < 15; i++) {//i是列
            inputCount0[i] = 0;//0点班输入的总数
            passCount0[i] = 0;//0点班合格数
            inputCount8[i] = 0;//8点班输入的总数
            passCount8[i] = 0;//8点班合格数
            inputCount16[i] = 0;//16点班输入的总数
            passCount16[i] = 0;//16点班合格数
            for (let j = 0; j <= 7; j++) {//j是行
                if (!isNaN(this.state.Data[j]['t_data'][i]) && (this.state.Data[j]['t_data'][i] != null)) {
                    inputCount0[i]++;
                    if (this.state.Data[j]['t_data'][i] <= standard[i]) {
                        passCount0[i]++;
                    }
                }
                if (inputCount0[i] === 0) {
                    str = null;
                    temp1 = null;
                }
                else {
                    str = passCount0[i] + '\/' + inputCount0[i];
                    if (isNaN(temp1 = passCount0[i] / inputCount0[i])) {
                        temp1 = null;
                    }
                    else {
                        temp1 = Number(temp1 * 100).toFixed(1) + '%';
                    }
                }
                ratio0[i] = str;
                passRate0[i] = temp1;
            }
            for (let j = 8; j <= 15; j++) {//j是行
                if (!isNaN(this.state.Data[j]['t_data'][i]) && (this.state.Data[j]['t_data'][i] != null)) {
                    inputCount8[i]++;
                    if (this.state.Data[j]['t_data'][i] <= standard[i]) {
                        passCount8[i]++;
                    }
                }
                if (inputCount8[i] === 0) {
                    str = null;
                    temp1 = null;
                }
                else {
                    str = passCount8[i] + '\/' + inputCount8[i];
                    if (isNaN(temp1 = passCount8[i] / inputCount8[i])) {
                        temp1 = null;
                    }
                    else {
                        temp1 = Number(temp1 * 100).toFixed(1) + '%';
                    }
                }
                ratio8[i] = str;
                passRate8[i] = temp1;
            }
            for (let j = 16; j <= 23; j++) {//j是行
                if (!isNaN(this.state.Data[j]['t_data'][i]) && (this.state.Data[j]['t_data'][i] != null)) {
                    inputCount16[i]++;
                    if (this.state.Data[j]['t_data'][i] <= standard[i]) {
                        passCount16[i]++;
                    }
                }
                if (inputCount16[i] === 0) {
                    str = null;
                    temp1 = null;
                }
                else {
                    str = passCount16[i] + '\/' + inputCount16[i];
                    if (isNaN(temp1 = passCount16[i] / inputCount16[i])) {
                        temp1 = null;
                    }
                    else {
                        temp1 = Number(temp1 * 100).toFixed(1) + '%';
                    }
                }
                ratio16[i] = str;
                passRate16[i] = temp1;
            }
            let ratio = ratio0.concat(ratio8);
            ratio = ratio.concat(ratio16);
            let passRate = passRate0.concat(passRate8);
            passRate = passRate.concat(passRate16);
            this.setState({
                ratio: ratio,
                passRate: passRate,
            })
        }
        //计算均值的部分
        let average0 = [], average8 = [], average16 = [];//各班次的合格率
        for (let i = 0; i < 15; i++) {
            temp1 = 0;
            temp2 = 0;
            temp3 = 0;
            if (inputCount0[i] === 0) {
                temp1 = null;
            }
            else {
                for (let j = 0; j < 8; j++) {
                    if (!isNaN(this.state.Data[j]['t_data'][i])) {
                        temp1 += this.state.Data[j]['t_data'][i];
                    }
                }
                if (isNaN(temp1 = temp1 / inputCount0[i])) {
                    temp1 = 0;
                }
                temp1 = temp1.toFixed(3);
            }
            average0[i] = temp1;
            if (inputCount8[i] === 0) {
                temp2 = null;
            }
            else {
                for (let j = 8; j < 16; j++) {
                    if (!isNaN(this.state.Data[j]['t_data'][i])) {
                        temp2 += this.state.Data[j]['t_data'][i];
                    }
                }
                if (isNaN(temp2 = temp2 / inputCount8[i])) {
                    temp2 = 0;
                }
                temp2 = temp2.toFixed(3);
            }
            average8[i] = temp2;
            if (inputCount16[i] === 0) {
                temp3 = null;
            }
            else {
                for (let j = 16; j < 24; j++) {
                    if (!isNaN(this.state.Data[j]['t_data'][i])) {
                        temp3 += this.state.Data[j]['t_data'][i];
                    }
                }
                if (isNaN(temp3 = temp3 / inputCount16[i])) {
                    temp3 = 0;
                }
                temp3 = temp3.toFixed(3);
            }
            average16[i] = temp3;
        }
        let average = average0.concat(average8);
        average = average.concat(average16);
        this.setState({
            average: average
        });
    }

    /***
     * 进行底部的合格率、平均数的计算更新以及是否正常的判断
     **/
    updataData() {
        const arr = numCalculate(this.state);
        this.setState({
            ratio: arr[0],//合格比率
            passRate: arr[1],//合格率
            average: arr[2],//平均值
        })
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        const {data, updateChange, order, startValue, endValue, width, timeChose,tableWidth,tableName} = this.props;

        let NewData = deepCopy(data);//复制一份出来
        let hour = indexH + timeChose * 4;
        NewData[hour]["data"][indexL] = event;
        let sum = autoCalculateHJ(NewData[indexH]['data'], width);
        NewData[indexH]['data'][HuaYSOrder_CX.HeJi] = sum;
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
    };


    render() {

        // 表头
        const columns = [
            {
                title: '时间',
                key: 'time',
                dataIndex: 'time',
                width:"3%"
            },
            {
                title: '附着水',
                dataIndex: 'FuZhuoShui_list',
                key: 'FuZhuoShui_list',
                width:"6%"
            },
            {
                title: '不溶物',
                key: 'BuRongWu_list',
                dataIndex: 'BuRongWu_list',
                width:"6%"
            },
            {
                title: 'LL/%',
                key: 'LL_list',
                dataIndex: 'LL_list',
                width:"6%"
            },
            {
                title: 'SiO2/%',
                key: 'ErYangHG_list',
                dataIndex: 'ErYangHG_list',
                width:"6%"
            },
            {
                title: 'Al2O3/%',
                key: 'YangHuaL_list',
                dataIndex: 'YangHuaL_list',
                width:"6%"
            },
            {
                title: 'Fe2O3/%',
                key: 'YangHuaT_list',
                dataIndex: 'YangHuaT_list',
                width:"6%"
            },
            {
                title: 'CaO/%',
                key: 'YangHuaG_list',
                dataIndex: 'YangHuaG_list',
                width:"6%"
            },
            {
                title: 'MgO/%',
                key: 'YangHuaMei_list',
                dataIndex: 'YangHuaMei_list',
                width:"6%"
            },
            {
                title: 'MnO/%',
                key: 'YangHuaMeng_list',
                dataIndex: 'YangHuaMeng_list',
                width:"6%"
            },
            {
                title: 'TO/%',
                key: 'TO_list',
                dataIndex: 'TO_list',
                width:"6%"
            },
            {
                title: 'SO3/%',
                key: 'SanYangHL_list',
                dataIndex: 'SanYangHL_list',
                width:"6%"
            },
            {
                title: '合计',
                key: 'HeJi',
                dataIndex: 'HeJi',
                width:"6%"
            },
            {
                title: 'KH/%',
                key: 'KH_list',
                dataIndex: 'KH_list',
                width:"6%"
            },
            {
                title: 'N/%',
                key: 'n',
                dataIndex: 'n',
                width:"6%"
            },
            {
                title: 'P/%',
                key: 'P',
                dataIndex: 'P',
                width:"6%"
            },
            // {
            //     title:'备注',
            //     key:'Remarks_list',
            //     dataIndex:'Remarks_list',
            // },
            {
                title: '人员',
                key: 'person',
                dataIndex: 'person',
                width:"3%"
            },
            // {
            //     title: '暂存',
            //     key: 'btn_save',
            //     dataIndex: 'btn_save',
            //     width:"4%"
            // }
        ];

        const dataSource = [];

        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"},
        }
            //中间八行的数据输入
        const {data, timeChose, allTime} = this.props;
        const Data = deepCopy(data);
        const time = deepCopy(allTime);
        // console.log("this.props.timeChose")
        // console.log(this.props.timeChose)
        // console.log("this.props.timeChose")

        for (let i = 0; i < 4; i++) {
            let hour = i + timeChose * 4;
            const value = Data[hour]['data'];
            dataSource.push(
                {
                    time: time[timeChose][i],
                    FuZhuoShui_list: <span><InputNumber
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        // onBlur={() => this.updataData(this.props.standard)}
                        onChange={value => this.onInputNumberChange2(value, i, 0)}
                    /></span>,
                    BuRongWu_list: <span><InputNumber
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        // onBlur={() => this.updataData(this.props.standard)}
                        onChange={value => this.onInputNumberChange2(value, i, 1)}
                    /></span>,
                    LL_list:
                        <span><InputNumber
                            style={this.changeStyle(value[2])}
                            defaultValue={''}
                            value={isNaN(value[2]) ? null : value[2]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 2)}
                        /></span>,
                    ErYangHG_list:
                        <span><InputNumber
                            style={this.changeStyle(value[3])}
                            defaultValue={''}
                            value={isNaN(value[3]) ? null : value[3]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 3)}
                        /></span>,
                    YangHuaL_list:
                        <span><InputNumber
                            style={this.changeStyle(value[4])}
                            defaultValue={''}
                            value={isNaN(value[4]) ? null : value[4]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 4)}
                        /></span>,
                    YangHuaT_list:
                        <span><InputNumber
                            style={this.changeStyle(value[5])}
                            defaultValue={''}
                            value={isNaN(value[5]) ? null : value[5]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 5)}
                        /></span>,
                    YangHuaG_list:
                        <span><InputNumber
                            style={this.changeStyle(value[6])}
                            defaultValue={''}
                            value={isNaN(value[6]) ? null : value[6]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 6)}
                        /></span>,
                    YangHuaMei_list:
                        <span><InputNumber
                            style={this.changeStyle(value[7])}
                            defaultValue={''}
                            value={isNaN(value[7]) ? null : value[7]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 7)}
                        /></span>,
                    YangHuaMeng_list:
                        <span><InputNumber
                            style={this.changeStyle(value[8])}
                            defaultValue={''}
                            value={isNaN(value[8]) ? null : value[8]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 8)}
                        /></span>,
                    TO_list:
                        <span><InputNumber
                            style={this.changeStyle(value[9])}
                            defaultValue={''}
                            value={isNaN(value[9]) ? null : value[9]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 9)}
                        /></span>,
                    SanYangHL_list:
                        <span><InputNumber
                            style={this.changeStyle(value[10])}
                            defaultValue={''}
                            value={isNaN(value[10]) ? null : value[10]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 10)}
                        /></span>,
                    HeJi:
                        <span><InputNumber
                            style={this.changeStyle(value[11])}
                            defaultValue={''}
                            value={isNaN(value[11]) ? null : value[11]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 11)}
                        /></span>,
                    KH_list:
                        <span><InputNumber
                            style={this.changeStyle(value[12])}
                            defaultValue={''}
                            value={isNaN(value[12]) ? null : value[12]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 12)}
                        /></span>,
                    n:
                        <span><InputNumber
                            style={this.changeStyle(value[13])}
                            defaultValue={''}
                            value={isNaN(value[13]) ? null : value[13]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 13)}
                        /></span>,
                    P:
                        <span><InputNumber
                            style={this.changeStyle(value[14])}
                            defaultValue={''}
                            value={isNaN(value[14]) ? null : value[14]}
                            // onBlur={() => this.updataData(this.props.standard)}
                            onChange={value => this.onInputNumberChange2(value, i, 14)}
                        /></span>,
                    person:
                        Data[hour]['user'],
                    // btn_save:
                    //     <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }


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
        width: state.getIn(['WareHouseRawMatCARe', 'width']),
        tableWidth: state.getIn(['WareHouseRawMatCARe', 'tableWidth']),
        allTime: state.getIn(['WareHouseRawMatCARe', 'allTime']),
        timeChose: state.getIn(['WareHouseRawMatCARe', 'timeChose']),
        data: state.getIn(['WareHouseRawMatCARe', 'data']),
        requestFlag: state.getIn(['WareHouseRawMatCARe', 'requestFlag']),
        startValue: state.getIn(['WareHouseRawMatCARe', 'startValue']),
        endValue: state.getIn(['WareHouseRawMatCARe', 'endValue']),
        person: state.getIn(['WareHouseRawMatCARe', 'person']),
        tableName: state.getIn(['WareHouseRawMatCARe', 'tableName']),
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