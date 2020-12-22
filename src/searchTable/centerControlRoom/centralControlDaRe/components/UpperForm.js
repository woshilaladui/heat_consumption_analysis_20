import React, {Component} from 'react';
import {Table, Input, Button, message} from 'antd';

export default class UpperForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Time: [],//第一列的时间变化自动控制
            //Data: [],//原始填写的数据
            passRate: [],//合格率
            average: [],//平均
            LX: ['立磨','','','煤磨','','','旋窑','',''] //表头类型
        }
    }


    /**初始化**/
    componentDidMount() {
        //绑定ref
        this.props.onRef(this);
    }

    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        const allTime = [
            ['0点班','','','0点班','','','0点班','',''],
            ['8点班','','','8点班','','','8点班','',''],
            ['4点班','','','4点班','','','4点班','','']
        ];
        this.setState({
            Time: [...allTime[this.props.timeChose]],
            Data: this.props.upperData,
        })
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const allTime = [
            ['0点班','','','0点班','','','0点班','',''],
            ['8点班','','','8点班','','','8点班','',''],
            ['4点班','','','4点班','','','4点班','','']
        ];
        this.setState({
            Time: [...allTime[nextProps.timeChose]],
            Data: nextProps.upperData,
        });
        this.updataData_Initial(nextProps.standard);
    }

    //暂存函数
    postToHome(i) {//i是行数
        /*const hour = i + this.props.timeChose * 8;
        const a = this.state.Data[hour]['t_data'];
        const t_data = a.join(',');
        const jsondata = {
            "data": [
                {
                    "riqi": this.props.riqi,
                    "hour": hour,
                    "t_name": "RYS",
                    "t_type": 1,
                    "t_data": t_data,
                    "name": window.localStorage.name,
                }
            ]
        };
        fetch("/api/HuaYS/save", {
            method: 'POST',
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['code'] === 0) {
                    message.info('暂存成功');
                    const Data = this.state.Data;
                    Data[hour]['name'] = window.localStorage.name;
                    this.setState({
                        Data: Data
                    })
                }
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));*/
        const {data, timeChose, date, tableName, saveToHome} = this.props;
        const Data = deepCopy(data)

        //计算具体下标位置
        const index = i + timeChose * 12//每班有13行数据
        saveToHome(
            date,
            index,
            tableName,
            Data
        )
    }

    //提交函数
    /*postAllToHome() {
        const timeChoose = this.props.timeChose * 8;
        for (let i = timeChoose; i < timeChoose + 8; i++) {
            const a = this.state.Data[i]['t_data'];
            const t_data = a.join(',');
            const jsondata = {
                "data": [
                    {
                        "riqi": this.props.riqi,
                        "hour": i,
                        "t_name": "RYS",
                        "t_type": 1,
                        "t_data": t_data,
                        "name": window.localStorage.name,
                    }
                ]
            };
            fetch("/api/HuaYS/save", {
                method: 'POST',
                body: JSON.stringify(jsondata), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': window.localStorage.authorization,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data['code'] === 0) {
                        message.info('提交' + i + '点钟数据成功');
                        const Data = this.state.Data;
                        Data[i]['name'] = window.localStorage.name;
                        this.setState({
                            Data: Data
                        })
                    }
                    else if (data['code'] === 1) {
                        message.error('提交' + i + '点钟数据失败');
                    }
                })
                .catch(error => console.error('Error:', error))
        }*/
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
    updataData(standard) {
        let temp1 = 0;
        let inputCount = [];
        let passCount = [];
        const hour = this.props.timeChose * 8;//都加上选择的时间
        const Data = this.state.Data;
        const passRate = this.state.passRate;
        const average = this.state.average;
        for (let i = 0; i < 15; i++) {//i是列
            inputCount[i] = 0;//输入的总数
            passCount[i] = 0;//合格数
            for (let j = hour; j < hour + 8; j++) {//j是行
                // Data[j]['t_data'][i] = parseFloat(Data[j]['t_data'][i]);
                if (!isNaN(parseFloat(Data[j]['t_data'][i])) && (parseFloat(Data[j]['t_data'][i]) != null)) {
                    inputCount[i]++;
                    if (parseFloat(Data[j]['t_data'][i]) <= standard[i]) {
                        passCount[i]++;
                    }
                }
                if (inputCount[i] === 0) {
                    temp1 = null;
                }
                else {
                    if (isNaN(temp1 = passCount[i] / inputCount[i])) {
                        temp1 = null;
                    }
                    else {
                        temp1 = Number(temp1 * 100).toFixed(1) + '%';
                    }
                }
                passRate[i + this.props.timeChose * 15] = temp1;
            }
        }
        //计算均值的部分
        for (let i = 0; i < 15; i++) {
            temp1 = 0;
            if (inputCount[i] === 0) {
                temp1 = null;
            }
            else {
                for (let j = hour; j < hour + 8; j++) {
                    if (!isNaN(parseFloat(Data[j]['t_data'][i]))) {
                        temp1 += parseFloat(Data[j]['t_data'][i]);
                    }
                }
                if (isNaN(temp1 = temp1 / inputCount[i])) {
                    temp1 = 0;
                }
                temp1 = temp1.toFixed(3);
            }
            average[i + this.props.timeChose * 15] = temp1;
        }
        this.setState({
            passRate: passRate,//合格率
            average: average
        })
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        const rep = /^(\-)*(\d+)\.(\d{2}).*$/;
        // (([1-9]{1}[0-9]{0,2})|([0]{1}))|((([1-9]{1}[0-9]{0,2})|([0]{1}))\.([0-9]{0,2}))
        // const rep = /^(([1-9]{1}\d*)|(0{1}))\.(\d{2})$/;
        // console.log(this.limitDecimals2(event));
        event = event.replace(rep, '$1$2.$3');
        NewData[hour]["t_data"][indexL] = event;
        this.setState({
            Data: NewData
        });
    };
    onInputNumberChange3 = (event, indexH, indexL) => {
        let NewData = this.state.Data;
        let hour = indexH + this.props.timeChose * 8;
        const rep = /^(\-)*(\d+)\.(\d{3}).*$/;
        event = event.replace(rep, '$1$2.$3');
        NewData[hour]["t_data"][indexL] = event;
        this.setState({
            Data: NewData
        });
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
                title: '类型',
                dataIndex: 'LX',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if(index === 0){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 1){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 2){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 3){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 4){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 5){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 6){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 7){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 8){
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '班次',
                dataIndex: 'time',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if(index === 0){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 1){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 2){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 3){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 4){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 5){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 6){
                        obj.props.rowSpan = 3;
                    }
                    if(index === 7){
                        obj.props.rowSpan = 0;
                    }
                    if(index === 8){
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                }
            },
            {
                title: '运转时间段',
                dataIndex: 'YZSJD',
                children: [
                    {
                        title: '开机',
                        dataIndex: 'KJ'
                    },
                    {
                        title: '喂料',
                        dataIndex: 'WL'
                    },
                    {
                        title: '停料',
                        dataIndex: 'TL'
                    },
                    {
                        title: '停机',
                        dataIndex: 'TJ'
                    },
                    {
                        title: '原因',
                        dataIndex: 'YY'
                    }
                ]
            },
            {
                title: '运转时间',
                dataIndex: 'YZSJ',
            },
            {
                title: '消耗量',
                dataIndex: 'XHL',
            },
            {
                title: '产量',
                dataIndex: 'CL',
            },
            {
                title: '备注',
                dataIndex: 'BZ',
            },
            {
                title: '操作员',
                dataIndex: 'person',
            },
            {
                title: '暂存',
                dataIndex: 'btn_save',
            }
        ];

        const data = [];
        //中间八行的数据输入
        //const Data = this.state.Data;
        const {data, timeChose,person} = this.props;
        const Data = deepCopy(data)

        for (let i = 0; i < 9; i++) {
            //let hour = i + this.props.timeChose * 6;
            let hour = i + timeChose * 6;
            const value = Data[hour]['t_data'];
            data.push(
                {   
                    LX: this.state.LX[i],
                    time: this.state.Time[i],
                    KJ: <span><Input
                        style={this.changeStyle(value[0])}
                        defaultValue={''}
                        value={isNaN(value[0]) ? null : value[0]}
                        onBlur={() => this.updataData(this.props.standard)}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    WL: <span><Input
                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onBlur={() => this.updataData(this.props.standard)}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 1)}
                    /></span>,
                    TL:
                        <span><Input
                            style={this.changeStyle(value[2])}
                            defaultValue={''}
                            value={isNaN(value[2]) ? null : value[2]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                        /></span>,
                    TJ:
                        <span><Input
                            style={this.changeStyle(value[3])}
                            defaultValue={''}
                            value={isNaN(value[3]) ? null : value[3]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                        /></span>,
                    YY:
                        <span><Input
                            style={this.changeStyle(value[4])}
                            defaultValue={''}
                            value={isNaN(value[4]) ? null : value[4]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                        /></span>,
                    YZSJ:
                        <span><Input
                            style={this.changeStyle(value[5])}
                            defaultValue={''}
                            value={isNaN(value[5]) ? null : value[5]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 5)}
                        /></span>,
                    XHL:
                        <span><Input
                            style={this.changeStyle(value[6])}
                            defaultValue={''}
                            value={isNaN(value[6]) ? null : value[6]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 6)}
                        /></span>,
                    CL:
                        <span><Input
                            style={this.changeStyle(value[7])}
                            defaultValue={''}
                            value={isNaN(value[7]) ? null : value[7]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 7)}
                        /></span>,
                    BZ:
                        <span><Input
                            style={this.changeStyle(value[9])}
                            defaultValue={''}
                            value={isNaN(value[9]) ? null : value[9]}
                            onBlur={() => this.updataData(this.props.standard)}
                            onChange={event => this.onInputNumberChange2(event.target.value, i, 9)}
                        /></span>,
                    person :Data[hour]['name'],
                    btn_save:
                        <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                }
            )
        }

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={data} pagination={false}/>
            </div>
        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['centralControlDaRe', 'date']),
        timeChose: state.getIn(['centralControlDaRe', 'timeChose']),
        data: state.getIn(['centralControlDaRe', 'data']),
        person: state.getIn(['centralControlDaRe', 'person']),
        tableName: state.getIn(['centralControlDaRe', 'tableName']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },


        //上表暂存一行数据
        saveToHome(date, index, tableName, data) {


            dispatch(actionCreators.saveData({
                date:date,
                index:index,
                tableName:tableName,
                data:data
            }))
        },

    }//end return
};


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);