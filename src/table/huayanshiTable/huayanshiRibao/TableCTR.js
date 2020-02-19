import React from 'react';
import {Table, Input, Button, message,Popconfirm} from 'antd';
import moment from "moment";
import {getOldData, getStandard} from "../../../Request/RequsetCenter";
import {Standard, URL} from "../../../Request/Constant";
import {getHuaYSJsonData} from "../../../Request/JsonCenter";

//化验室日报--控制室原始记录
export default class TableCTR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            CTRData: [
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
                {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
            ],
            ctrAverage:[],//算均值
            isTrue:'',
            startValue:[],
            endValue:[],
            t_name:"CRO"
        }
    }
    getDataAndStandard() {
        let dataPromise = getOldData(
            URL.HUAYS_QUERY,
            getHuaYSJsonData("CRO", this.state.date),
            "CRO",
            Standard.HAVA,
            this.state.CTRData
        )
        let standardPromise = getStandard(
            URL.HUAYS_STANDARD,
            {t_name:this.state.t_name},
            this.state.t_name,
            this.state.startValue,
            this.state.endValue)
         Promise.all([dataPromise,standardPromise])
            .then((response)=>{
                this.setState(() => ({
                    CTRData: response[0],
                    startValue: response[1].startValue,
                    endValue: response[1].endValue,
                    person: window.localStorage.name,
                }))
                this.calculCtr();
            })
            .catch()
    }
componentDidMount() {
    this.getDataAndStandard();

}
    calculCtr(){
        let Data = JSON.parse(JSON.stringify(this.state.CTRData))
        let newData=this.averageNum(9,Data);
        console.log("standard")
        console.log(this.state.startValue[0])
        console.log(this.state.endValue)
        console.log("standard")
        if(parseFloat(newData[0]) >=this.state.startValue[0] && parseFloat(newData[0]) <= this.state.endValue[0]){
            this.setState(() => ({
                ctrAverage:newData,
                isTrue: '合格'
            }))
        }else if(newData[0]!=null){
            this.setState(() => ({
                ctrAverage:newData,
                isTrue: '不合格'
            }))




    }else {
            this.setState(() => ({
                ctrAverage:newData,
                isTrue: ''
            }))
        }
        }
    averageNum(width,Data){
        let average=Array(width).fill(0);
        let inputCount = Array(width).fill(0);//输入的数组


        for (let i = 0; i < width; i++) {
            let temp = 0;
           // const position = order.indexOf(i)//判断此列是否需要计算均值
            for (let j = 0; j < 23; j++) {//j是行i是列

                if (!isNaN(parseFloat(Data[j]['t_data'][i])) && (parseFloat(Data[j]['t_data'][i]) != null)) {
                    inputCount[i]++;

                }


            }
            //计算均值的部分

            if (inputCount[i] === 0) {
                temp = null;
            }
            else {
                for (let j = 0; j < 23; j++) {
                    if (!isNaN(parseFloat(Data[j]['t_data'][i]))) {
                        temp += parseFloat(Data[j]['t_data'][i]);
                    }
                }
                if (isNaN(temp = temp / inputCount[i])) {
                    temp = 0;
                }
                temp = temp.toFixed(2);
            }
            average[i] = temp;
        }
        return average;

    }

    render() {
        const columns = [
            {
                title: '控制室原始记录',
               // width: "10%",
                key: 'Title',
                dataIndex: 'Title',
                children:[{
                    title: '时间',
                   //width: "7.5%",
                    key: 'time',
                    dataIndex: 'time',
                }]
            },
            {
                title: '熟料',
                dataIndex: 'ShuL',
                key: 'ShuL',
                children: [{
                    title: 'FCaO/%',
                    //width: "7.5%",
                    key: 'FCaO',
                    dataIndex: 'FCaO',
                    render: (value, row, index) => {
                        const obj = {
                            children: value,
                            props: {}
                        };
                        if (index === 9) {
                            obj.props.colSpan = 2;
                        }
                        if (index === 10) {
                            obj.props.colSpan = 2;
                        }
                        if (index === 11) {
                            obj.props.colSpan = 2;
                        }
                        return obj;
                    },
                }, {
                    title: '是否正常',
                    //width: "7.5%",
                    key: 'IsNormal',
                    dataIndex: 'IsNormal',
                    render: (value, row, index) => {
                        const obj = {
                            children: value,
                            props: {}
                        };
                        if (index === 9) {
                            obj.props.colSpan = 0
                        }
                        if (index === 10) {
                            obj.props.colSpan = 0;
                        }
                        if (index === 11) {
                            obj.props.colSpan = 0;
                        }
                        return obj;
                    },
                }
                ],

            },
            {
                title: '出磨生料',
                key: 'Chu',
                children: [
                    {
                        title: '细度/um',
                        //width: "7.5%",
                        key: 'ChuFineness',
                        dataIndex: 'ChuFineness'
                    },
                    {
                        title: '900孔',
                       //width: "7.5%",
                        key: 'Chu900',
                        dataIndex: 'Chu900'
                    },
                    {
                        title: '水分',
                        //width: "7.5%",
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
                       // width: "7.5%",
                        key: 'RuFineness',
                        dataIndex: 'RuFineness'
                    },
                    {
                        title: '900孔',
                       //width: "7.5%",
                        key: 'Ru900',
                        dataIndex: 'Ru900'
                    },
                    {
                        title: '水分',
                      //  width: "7.5%",
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
                     //   width: "7.5%",
                        key: 'CoalFineness',
                        dataIndex: 'CoalFineness'
                    },
                    {
                        title: '水分',
                      //  width: "7.5%",
                        key: 'CoalWater',
                        dataIndex: 'CoalWater'
                    }
                ],
            },

        ];
        // if(parseFloat(newData[0]) >= startValue[0] && parseFloat(newData[0]) <= endValue[0]){
        //         this.setState(() => ({
        //             ctrAverage:newData,
        //             isTrue: '合格'
        //         }))

        const time=['均值'];
        const data=[];
        data.push({
            time:time,
            IsNormal:this.state.isTrue,
            FCaO:this.state.ctrAverage[0],
            ChuFineness:this.state.ctrAverage[1],
            Chu900:this.state.ctrAverage[2],
            ChuWater:this.state.ctrAverage[3],
            RuFineness:this.state.ctrAverage[4],
            Ru900:this.state.ctrAverage[5],
            RuWater:this.state.ctrAverage[6],
            CoalFineness:this.state.ctrAverage[7],
            CoalWater:this.state.ctrAverage[8],

        })
        return(
            <div>
                <Table  columns={columns}  bordered dataSource={data}pagination={false}/>

            </div>
        );
    }
}
