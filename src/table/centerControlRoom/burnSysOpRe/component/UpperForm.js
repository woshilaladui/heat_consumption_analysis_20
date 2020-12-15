import React, {Component} from 'react';
import {Table, Tabs, Input, Button} from 'antd';
import "./UpperForm.css"
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";
import moment from 'moment'

const TabPane = Tabs.TabPane;

class UpperForm extends Component {


    /**
     * 第一列的时间变化
     */
    componentWillMount() {
        const BanCi = ['零点班', '八点班', '十六点班'];
        this.setState({
            BanCi: BanCi[this.props.timeChose],
        });
    }

    /**更新props**/
    componentWillReceiveProps(nextProps) {
        const BanCi = ['零点班', '八点班', '十六点班'];
        this.setState({
            BanCi: BanCi[nextProps.timeChose],
        });
    }

    /**
     * 表格输入数据变化的监听，同时所有的数据更新
     **/
    onInputNumberChange2 = (value, indexH, indexL) => {
        if (value != null) {
            const {data, timeChose, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来
            let index = indexH + timeChose * 12;
            NewData[index]["data"][indexL] = value;
            updateChange(NewData)
        }

    };

    //控制输入框的样式
    changeStyle = (value) => {
        if (value) {

            if (isNaN(value)|| value > 100) {
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

    //生成-n * len ~ n * len 的随机数
    rad(initNum,n,len){
        //确定是加还是减
        let a = Math.round(Math.random()); //0 代表 - ; 1 代表 +
        //获取0~n的随机整数
        let b = Math.floor(Math.random()*n);
        //返回随机值
        let c = null;
        if(a==0){
            c = initNum - b * len;
        } else{
            c = initNum + b * len;
        }
        return c;
    }

    //自动检测
    notReal(i){
        const {data, timeChose, date, tableName, updateChange} = this.props;
        let notRealData = deepCopy(data);
        let index = i + timeChose * 12//每班有13行数据
        //C1
        notRealData[index]["data"][5] = this.rad(7.0,5,0.1);
        notRealData[index]["data"][6] = this.rad(7.0,5,0.1);
        notRealData[index]["data"][7] = this.rad(8,5,1);
        notRealData[index]["data"][8] = this.rad(-7,5,1);
        //C1
        notRealData[index]["data"][9] = this.rad(7.4,5,0.1);
        notRealData[index]["data"][10] = this.rad(7.6,5,0.1);
        notRealData[index]["data"][11] = this.rad(40,5,1);
        notRealData[index]["data"][12] = this.rad(12,5,1);
        //C2
        notRealData[index]["data"][13] = this.rad(7.7,5,0.1);
        notRealData[index]["data"][14] = this.rad(7.3,5,0.1);
        notRealData[index]["data"][15] = this.rad(39,5,1);
        notRealData[index]["data"][16] = this.rad(7,5,1);
        //C3
        notRealData[index]["data"][17] = this.rad(7.4,5,0.1);
        notRealData[index]["data"][18] = this.rad(7.4,5,0.1);
        notRealData[index]["data"][19] = this.rad(14,5,1);
        notRealData[index]["data"][20] = this.rad(15,5,1);
        //C4
        notRealData[index]["data"][21] = this.rad(7.6,5,0.1);
        notRealData[index]["data"][22] = this.rad(8.1,5,0.1);
        notRealData[index]["data"][23] = this.rad(-5500,5,100);
        notRealData[index]["data"][24] = this.rad(9,5,1);
        notRealData[index]["data"][25] = this.rad(100,5,3);
        //C5   
        notRealData[index]["data"][26] = this.rad(7.4,5,0.1);
        notRealData[index]["data"][27] = this.rad(7.8,5,0.1);
        notRealData[index]["data"][28] = this.rad(-16,5,1);
        notRealData[index]["data"][29] = this.rad(32,5,2);
        notRealData[index]["data"][30] = this.rad(100,5,3);
        //分解炉
        notRealData[index]["data"][31] = this.rad(908.8,20,1.1);
        notRealData[index]["data"][32] = this.rad(-428,10,2);
        notRealData[index]["data"][33] = this.rad(-518,10,2);;
        //温室
        notRealData[index]["data"][34] = this.rad(1065.2,20,1.1);
        notRealData[index]["data"][35] = this.rad(-202,5,2);
        //胴温最高
        notRealData[index]["data"][36] = "无";
        //二次风温
        notRealData[index]["data"][37] = "无";
        //瓦温最高
        notRealData[index]["data"][38] = "无";
        updateChange(notRealData);
        //const tab = 5;
        /*this.onInputNumberChange2(this.rad(7.0,5,0.1), i, 0 + tab);//左端C1入口温度
        this.onInputNumberChange2(this.rad(7.2,5,0.1), i, 1 + tab);//C1出口温度
        this.onInputNumberChange2(this.rad(8,5,1), i, 2 + tab);//C1入口压强
        this.onInputNumberChange2(this.rad(7,5,1), i, 3 + tab);//C1出口压强

        this.onInputNumberChange2(this.rad(7.4,5,0.1), i, 4 + tab);//右端C1入口温度
        this.onInputNumberChange2(this.rad(7.6,5,0.1), i, 5 + tab);//C1出口温度
        this.onInputNumberChange2(this.rad(40,5,1), i, 6 + tab);//C1入口压强
        this.onInputNumberChange2(this.rad(12,5,1), i, 7 + tab);//C1出口压强

        this.onInputNumberChange2("", i, 8 + tab);//C2入口温度
        this.onInputNumberChange2("", i, 9 + tab);//C2出口温度
        this.onInputNumberChange2("", i, 10 + tab);//C2入口压强
        this.onInputNumberChange2("", i, 11 + tab);//C2出口压强
        this.onInputNumberChange2("", i, 12 + tab);//C3入口温度
        this.onInputNumberChange2("", i, 13 + tab);//C3出口温度
        this.onInputNumberChange2("", i, 14 + tab);//C3入口压强
        this.onInputNumberChange2("", i, 15 + tab);//C3出口压强
        this.onInputNumberChange2("", i, 16 + tab);//C4入口温度
        this.onInputNumberChange2("", i, 17 + tab);//C4出口温度
        this.onInputNumberChange2("", i, 18 + tab);//C4入口压强
        this.onInputNumberChange2("", i, 19 + tab);//C4出口压强
        this.onInputNumberChange2("", i, 20 + tab);//C4下料压强
        this.onInputNumberChange2("", i, 21 + tab);//C5入口温度
        this.onInputNumberChange2("", i, 22 + tab);//C5出口温度
        this.onInputNumberChange2("", i, 23 + tab);//C5入口压强
        this.onInputNumberChange2("", i, 24 + tab);//C5出口压强
        this.onInputNumberChange2("", i, 25 + tab);//C5下料压强
        this.onInputNumberChange2("", i, 26 + tab);//分解炉出口温度
        this.onInputNumberChange2("", i, 27 + tab);//分解炉出口压强
        this.onInputNumberChange2("", i, 28 + tab);//分解炉中部温度
        
        this.onInputNumberChange2("", i, 29 + tab);//温室温度
        this.onInputNumberChange2("", i, 30 + tab);//温室压力

        this.onInputNumberChange2("", i, 31 + tab);//胴温最高
        this.onInputNumberChange2("", i, 32 + tab);//二次风温
        this.onInputNumberChange2("", i, 33 + tab);//瓦温最高*/
    }

    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        console.log("渲染111"+JSON.stringify(this.props.data));
        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        /**表头的设计**start**/
        const columns = [
            {
                title: '班次',
                dataIndex: 'time',
                width: '10%',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 8;
                    }
                    if (index === 1) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 5) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 6) {
                        obj.props.colSpan = 0;
                    }
                    if (index === 7) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                },
            },
            {
                title: '窑转速',
                key: 'YZS',
                width: '15%',
                children: [{
                    title: 'rpm',
                    dataIndex: 'YZS',
                }],
            },
            {
                title: '窑电流',
                key: 'YDL',
                width: '15%',
                children: [
                    {
                        title: 'A',
                        dataIndex: 'YDL'
                    },
                ],
            },
            {
                title: '生料喂料量',
                key: 'SLWL',
                width: '15%',
                children:
                    [{
                        title: 't/h',
                        dataIndex: 'SLWL'
                    }]
            },
            {
                title: '窑头喂煤量',
                key: 'YTWM',
                width: '15%',
                children: [
                    {
                        title: 't/h',
                        dataIndex: 'YTWM'
                    }
                ],
            },
            {
                title: '窑尾喂煤量',
                key: 'YWWM',
                width: '15%',
                children: [
                    {
                        title: 't/h',
                        dataIndex: 'YWWM'
                    }
                ],
            },
            {
                title: '人员',
                dataIndex: 'person',
                width: '7.5%',
            },
            // {
            //     title: '暂存',
            //     dataIndex: 'btn_save',
            //     width: '7.5%',
            // },
        ];
        const columns_tab2 = [
                {
                    title: '时间',
                    dataIndex: 'time',
                },
                {
                    title: '各点温度',
                    dataIndex: 'DFC',
                    children: [
                        {
                            title: 'C1',
                            dataIndex: 'C1',
                            children: [
                                {
                                    title: '左端入口',
                                    dataIndex: 'out1',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'left_c1_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '左端出口',
                                    dataIndex: 'out2',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'left_c1_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '左端入口',
                                    dataIndex: 'out3',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'left_c1_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '左端出口',
                                    dataIndex: 'out4',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'left_c1_out_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '右端入口',
                                    dataIndex: 'out5',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'right_c1_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '右端出口',
                                    dataIndex: 'out6',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'right_c1_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '右端入口',
                                    dataIndex: 'out7',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'right_c1_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '右端出口',
                                    dataIndex: 'out8',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'right_c1_out_pa',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            title: 'C2',
                            dataIndex: 'C2',
                            children: [
                                {
                                    title: '入口',
                                    dataIndex: 'out9',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'c2_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out10',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'c2_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '入口',
                                    dataIndex: 'out11',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c2_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out12',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c2_out_pa',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            title: 'C3',
                            dataIndex: 'C3',
                            children: [
                                {
                                    title: '入口',
                                    dataIndex: 'out14',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'c3_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out15',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'c3_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '入口',
                                    dataIndex: 'out16',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c3_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out17',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c3_out_pa',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            title: 'C4',
                            dataIndex: 'C4',
                            children: [
                                {
                                    title: '入口',
                                    dataIndex: 'out18',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'c4_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out19',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'c4_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '入口',
                                    dataIndex: 'out20',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c4_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out21',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c4_out_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '下料',
                                    dataIndex: 'xialiao1',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c4_xialiao',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            title: 'C5',
                            dataIndex: 'C5',
                            children: [
                                {
                                    title: '入口',
                                    dataIndex: 'out22',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'c5_in_tem',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out23',
                                    children: [

                                        {
                                            title: '℃',
                                            dataIndex: 'c5_out_tem',
                                        }
                                    ]
                                },
                                {
                                    title: '入口',
                                    dataIndex: 'out24',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c5_in_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '出口',
                                    dataIndex: 'out25',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'c5_out_pa',
                                        },
                                    ]
                                },
                                {
                                    title: '下料',
                                    dataIndex: 'out26',
                                    children: [
                                        {
                                            title: 't',
                                            dataIndex: 'c5_xialiao',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            title: '分解炉',
                            dataIndex: 'fenjielu',
                            children: [
                                {
                                    title: '出口',
                                    dataIndex: 'out27',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'fjl_out',
                                        },
                                    ]
                                },
                                {
                                    title: '压强',
                                    dataIndex: 'yaqiang1',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'fjl_yq',
                                        },
                                    ]
                                },
                                {
                                    title: '中部',
                                    dataIndex: 'zhongbu',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'fjl_middle',
                                        },
                                    ]
                                },

                            ]
                        },
                        {
                            title: '烟室',
                            dataIndex: 'wenshiTem',
                            children: [
                                {
                                    title: '温度',
                                    dataIndex: 'wendu',
                                    children: [
                                        {
                                            title: '℃',
                                            dataIndex: 'wswd',
                                        },
                                    ]
                                },
                                {
                                    title: '压强',
                                    dataIndex: 'yaqiang2',
                                    children: [
                                        {
                                            title: 'Pa',
                                            dataIndex: 'wsyq',
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            title: '胴温最高',
                            dataIndex: 'dongwen',
                            children: [
                                {
                                    title: '℃',
                                    dataIndex: 'dw_top',
                                },
                            ]
                        },
                        {
                            title: '二次风温',
                            dataIndex: 'ecfw',
                            children: [
                                {
                                    title: '℃',
                                    dataIndex: 'ercifengwen',
                                },
                            ]
                        },
                        {
                            title: '瓦温最高',
                            dataIndex: 'wwzg',
                            children: [
                                {
                                    title: '℃',
                                    dataIndex: 'wawenzuigao',
                                },
                            ]
                        },
                    ]
                },
                {
                    title: '自动检测',
                    dataIndex:'btn_save',
                    width:'5%',
                }

            ];
        const columns_tab3 = [
            {
                title: '时间',
                dataIndex: 'time',
            },
            {
                title: '负压',
                dataIndex: 'fy',
                children: [
                    {
                        title: '烟室',
                        children: [
                            {
                                title: 'Pa',
                                dataIndex: 'yanshi'
                            }
                        ]
                    },
                    {
                        title: '窑头',
                        children: [
                            {
                                title: 'Pa',
                                dataIndex: 'yaotou'
                            }
                        ]
                    }
                ]
            },
            {
                title: '电机电流',
                dataIndex: 'djdl',
                children:
                    [
                        {
                            title: '高温风机电流',
                            children: [
                                {
                                    title: 'A',
                                    dataIndex: 'gaowenfengjidianliu'
                                }
                            ]
                        },
                        {
                            title: '高温风机转速',
                            children: [
                                {
                                    title: 'rpm',
                                    dataIndex: 'gaowenfengjizhuansu'
                                }
                            ]
                        },
                        {
                            title: '提升机',
                            children: [
                                {
                                    title: 'A',
                                    dataIndex: 'tishengji'
                                }
                            ]
                        },
                        {
                            title: '排风机',
                            children: [
                                {
                                    title: 'A',
                                    dataIndex: 'paifengji'
                                }
                            ]
                        },
                        {
                            title: '排风机转速',
                            children: [
                                {
                                    title: 'rpm',
                                    dataIndex: 'paifengji_zhuansu'
                                }
                            ]
                        },
                        {
                            title: '破碎机',
                            children: [
                                {
                                    title: 'A',
                                    dataIndex: 'posuiji'
                                }
                            ]
                        },
                        {
                            title: '斜拉链',
                            children: [
                                {
                                    title: 'A',
                                    dataIndex: 'xielalian'
                                }
                            ]
                        },
                    ]
            },
            {
                title: '冷机',
                children:
                    [
                        {
                            title: '一室压力',
                            dataIndex: 'ysyl',
                            children: [
                                {
                                    title: 'Pa',
                                    dataIndex: 'yishiyali'
                                }
                            ]
                        }
                    ]
            },
            {
                title: '气体分析仪',
                children:
                    [
                        {
                            title: 'O2',
                            dataIndex: 'O2',
                            children: [
                                {
                                    title: 'Pa',
                                    dataIndex: 'o2'
                                }
                            ]
                        },
                        {
                            title: 'CO',
                            dataIndex: 'CO',
                            children: [
                                {
                                    title: 'Pa',
                                    dataIndex: 'co'
                                }
                            ]
                        },
                        {
                            title: 'NOX',
                            dataIndex: 'NOX',
                            children: [
                                {
                                    title: 'Pa',
                                    dataIndex: 'nox'
                                }
                            ]
                        },
                    ]
            },
            {
                title: '袋收尘',
                children:
                    [
                        {
                            title: '电压',
                            dataIndex: 'scdy',
                            children: [
                                {
                                    title: '1#',
                                    dataIndex: '1_dy',
                                    children: [
                                        {
                                            title: 'KV',
                                            dataIndex: 'dy_kv_1'
                                        }
                                    ]
                                },
                                {
                                    title: '2#',
                                    dataIndex: '2_dy',
                                    children: [
                                        {
                                            title: 'KV',
                                            dataIndex: 'dy_kv_2'
                                        }
                                    ]
                                },
                                {
                                    title: '3#',
                                    dataIndex: '3_dy',
                                    children: [
                                        {
                                            title: 'KV',
                                            dataIndex: 'dy_kv_3'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '电流',
                            dataIndex: 'scdl',
                            children: [
                                {
                                    title: '1#',
                                    dataIndex: '1_dl',
                                    children: [
                                        {
                                            title: 'MA',
                                            dataIndex: 'dl_ma_1'
                                        }
                                    ]
                                },
                                {
                                    title: '2#',
                                    dataIndex: '2_dl',
                                    children: [
                                        {
                                            title: 'MA',
                                            dataIndex: 'dl_ma_2'
                                        }
                                    ]
                                },
                                {
                                    title: '3#',
                                    dataIndex: '3_dl',
                                    children: [
                                        {
                                            title: 'MA',
                                            dataIndex: 'dl_ma_3'
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
            },
        ];
        /**表头的设计**end**/

        /**
         *
         * data是页面数据
         *
         * Data 是拷贝data之后的数据
         *
         */

        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data, timeChose, person, allTime} = this.props;

        const Data = deepCopy(data)


        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 12;
            const value = Data[index]['data'];
            //Data[index].data


            dataSource.push(
                {
                    time: this.state.BanCi,
                    YZS: <span><Input

                        style={this.changeStyle(value[0])}
                        defaultValue={''}

                        value={isNaN(value[0]) ? null : value[0]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0)}
                    /></span>,
                    YDL: <span><Input

                        style={this.changeStyle(value[1])}
                        defaultValue={''}
                        value={isNaN(value[1]) ? null : value[1]}
                        onChange={
                            event => this.onInputNumberChange2(event.target.value, i, 1)
                        }
                    /></span>,
                    SLWL: <span><Input

                        style={this.changeStyle(value[2])}
                        defaultValue={''}
                        value={isNaN(value[2]) ? null : value[2]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2)}
                    /></span>,
                    YTWM: <span><Input

                        style={this.changeStyle(value[3])}
                        defaultValue={''}
                        value={isNaN(value[3]) ? null : value[3]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3)}
                    /></span>,
                    YWWM: <span><Input

                        style={this.changeStyle(value[4])}
                        defaultValue={''}
                        value={isNaN(value[4]) ? null : value[4]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4)}
                    /></span>,
                    person: Data[index]['user'],//Data[index].user
                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }

        /**中间八行的数据输入**end**/
        const dataSource_tab2 = [];
    
        const tab = 5;
        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 12;
            const value = Data[index]['data'];
            const time = deepCopy(allTime);
            dataSource_tab2.push(
                {
                    time: time[timeChose][i],
                    left_c1_in_tem: <span><Input

                        style={this.changeStyle(value[0 + tab])}
                        defaultValue={''}

                        value={isNaN(value[0 + tab]) ? null : value[0 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 0 + tab)}
                    /></span>,
                    left_c1_out_tem: <span><Input

                        style={this.changeStyle(value[1 + tab])}
                        defaultValue={''}
                        value={isNaN(value[1 + tab]) ? null : value[1 + tab]}
                        onChange={
                            event => this.onInputNumberChange2(event.target.value, i, 1 + tab)
                        }
                    /></span>,
                    left_c1_in_pa: <span><Input
                        style={this.changeStyle(value[2 + tab])}
                        defaultValue={''}
                        value={isNaN(value[2 + tab]) ? null : value[2 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 2 + tab)}
                    /></span>,
                    left_c1_out_pa: <span><Input

                        style={this.changeStyle(value[3 + tab])}
                        defaultValue={''}
                        value={isNaN(value[3 + tab]) ? null : value[3 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 3 + tab)}
                    /></span>,
                    right_c1_in_tem: <span><Input

                        style={this.changeStyle(value[4 + tab])}
                        defaultValue={''}

                        value={isNaN(value[4 + tab]) ? null : value[4 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 4 + tab)}
                    /></span>,
                    right_c1_out_tem: <span><Input

                        style={this.changeStyle(value[5 + tab])}
                        defaultValue={''}
                        value={isNaN(value[5 + tab]) ? null : value[5 + tab]}
                        onChange={
                            event => this.onInputNumberChange2(event.target.value, i, 5 + tab)
                        }
                    /></span>,
                    right_c1_in_pa: <span><Input
                        style={this.changeStyle(value[6 + tab])}
                        defaultValue={''}
                        value={isNaN(value[6 + tab]) ? null : value[6 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 6 + tab)}
                    /></span>,
                    right_c1_out_pa: <span><Input

                        style={this.changeStyle(value[7 + tab])}
                        defaultValue={''}
                        value={isNaN(value[7 + tab]) ? null : value[7 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 7 + tab)}
                    /></span>,
                    c2_in_tem: <span><Input

                        style={this.changeStyle(value[8 + tab])}
                        defaultValue={''}
                        value={isNaN(value[8 + tab]) ? null : value[8 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 8 + tab)}
                    /></span>,
                    c2_out_tem: <span><Input

                        style={this.changeStyle(value[9 + tab])}
                        defaultValue={''}
                        value={isNaN(value[9 + tab]) ? null : value[9 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 9 + tab)}
                    /></span>,
                    c2_in_pa: <span><Input

                        style={this.changeStyle(value[10 + tab])}
                        defaultValue={''}
                        value={isNaN(value[10 + tab]) ? null : value[10 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 10 + tab)}
                    /></span>,
                    c2_out_pa: <span><Input

                        style={this.changeStyle(value[11 + tab])}
                        defaultValue={''}
                        value={isNaN(value[11 + tab]) ? null : value[11 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 11 + tab)}
                    /></span>,
                    c3_in_tem: <span><Input

                        style={this.changeStyle(value[12 + tab])}
                        defaultValue={''}
                        value={isNaN(value[12 + tab]) ? null : value[12 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 12 + tab)}
                    /></span>,
                    c3_out_tem: <span><Input

                        style={this.changeStyle(value[13 + tab])}
                        defaultValue={''}
                        value={isNaN(value[13 + tab]) ? null : value[13 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 13 + tab)}
                    /></span>,
                    c3_in_pa: <span><Input

                        style={this.changeStyle(value[14 + tab])}
                        defaultValue={''}
                        value={isNaN(value[14 + tab]) ? null : value[14 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 14 + tab)}
                    /></span>,
                    c3_out_pa: <span><Input

                        style={this.changeStyle(value[15 + tab])}
                        defaultValue={''}
                        value={isNaN(value[15 + tab]) ? null : value[15 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 15 + tab)}
                    /></span>,
                    c4_in_tem: <span><Input

                        style={this.changeStyle(value[16 + tab])}
                        defaultValue={''}
                        value={isNaN(value[16 + tab]) ? null : value[16 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 16 + tab)}
                    /></span>,
                    c4_out_tem: <span><Input

                        style={this.changeStyle(value[17 + tab])}
                        defaultValue={''}
                        value={isNaN(value[17 + tab]) ? null : value[17 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 17 + tab)}
                    /></span>,
                    c4_in_pa: <span><Input

                        style={this.changeStyle(value[18 + tab])}
                        defaultValue={''}
                        value={isNaN(value[18 + tab]) ? null : value[18 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 18 + tab)}
                    /></span>,
                    c4_out_pa: <span><Input

                        style={this.changeStyle(value[19 + tab])}
                        defaultValue={''}
                        value={isNaN(value[19 + tab]) ? null : value[19 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 19 + tab)}
                    /></span>,
                    c4_xialiao: <span><Input

                        style={this.changeStyle(value[20 + tab])}
                        defaultValue={''}
                        value={isNaN(value[20 + tab]) ? null : value[20 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 20 + tab)}
                    /></span>,
                    c5_in_tem: <span><Input

                        style={this.changeStyle(value[21 + tab])}
                        defaultValue={''}
                        value={isNaN(value[21 + tab]) ? null : value[21 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 21 + tab)}
                    /></span>,
                    c5_out_tem: <span><Input

                        style={this.changeStyle(value[22 + tab])}
                        defaultValue={''}
                        value={isNaN(value[22 + tab]) ? null : value[22 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 22 + tab)}
                    /></span>,
                    c5_in_pa: <span><Input

                        style={this.changeStyle(value[23 + tab])}
                        defaultValue={''}
                        value={isNaN(value[23 + tab]) ? null : value[23 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 23 + tab)}
                    /></span>,
                    c5_out_pa: <span><Input

                        style={this.changeStyle(value[24 + tab])}
                        defaultValue={''}
                        value={isNaN(value[24 + tab]) ? null : value[24 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 24 + tab)}
                    /></span>,
                    c5_xialiao: <span><Input

                        style={this.changeStyle(value[25 + tab])}
                        defaultValue={''}
                        value={isNaN(value[25 + tab]) ? null : value[25 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 25 + tab)}
                    /></span>,
                    fjl_out: <span><Input

                        style={this.changeStyle(value[26 + tab])}
                        defaultValue={''}
                        value={isNaN(value[26 + tab]) ? null : value[26 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 26 + tab)}
                    /></span>,
                    fjl_yq: <span><Input

                        style={this.changeStyle(value[27 + tab])}
                        defaultValue={''}
                        value={isNaN(value[27 + tab]) ? null : value[27 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 27 + tab)}
                    /></span>,
                    fjl_middle: <span><Input

                        style={this.changeStyle(value[28 + tab])}
                        defaultValue={''}
                        value={isNaN(value[28 + tab]) ? null : value[28 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 28 + tab)}
                    /></span>,
                    wswd: <span><Input

                        style={this.changeStyle(value[29 + tab])}
                        defaultValue={''}
                        value={isNaN(value[29 + tab]) ? null : value[29 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 29 + tab)}
                    /></span>,
                    wsyq: <span><Input

                        style={this.changeStyle(value[30 + tab])}
                        defaultValue={''}
                        value={isNaN(value[30 + tab]) ? null : value[30 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 30 + tab)}
                    /></span>,
                    dw_top: <span><Input

                        style={this.changeStyle(value[31 + tab])}
                        defaultValue={''}
                        value={isNaN(value[31 + tab]) ? null : value[31 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 31 + tab)}
                    /></span>,
                    ercifengwen: <span><Input

                        style={this.changeStyle(value[32 + tab])}
                        defaultValue={''}
                        value={isNaN(value[32 + tab]) ? null : value[32 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 32 + tab)}
                    /></span>,
                    wawenzuigao: <span><Input

                        style={this.changeStyle(value[33 + tab])}
                        defaultValue={''}
                        value={isNaN(value[33 + tab]) ? null : value[33 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 33 + tab)}
                    /></span>,
                    btn_save: <Button type='primary' onClick={() => this.notReal(i)}>自动检测</Button>,
                })
        }
        const dataSource_tab3 = [];

        for (let i = 0; i < 8; i++) {
            const index = i + timeChose * 12;
            const value = Data[index]['data'];
            const time = deepCopy(allTime);

            dataSource_tab3.push(
                {
                    time: time[timeChose][i],
                    yanshi: <span><Input

                        style={this.changeStyle(value[34 + tab])}
                        defaultValue={''}
                        value={isNaN(value[34 + tab]) ? null : value[34 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 34 + tab)}
                    /></span>,
                    yaotou: <span><Input

                        style={this.changeStyle(value[35 + tab])}
                        defaultValue={''}
                        value={isNaN(value[35 + tab]) ? null : value[35 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 35 + tab)}
                    /></span>,
                    gaowenfengjidianliu: <span><Input

                        style={this.changeStyle(value[36 + tab])}
                        defaultValue={''}
                        value={isNaN(value[36 + tab]) ? null : value[36 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 36 + tab)}
                    /></span>,
                    gaowenfengjizhuansu: <span><Input

                        style={this.changeStyle(value[37  + tab])}
                        defaultValue={''}
                        value={isNaN(value[37 + tab]) ? null : value[37 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 37 + tab)}
                    /></span>,
                    tishengji: <span><Input

                        style={this.changeStyle(value[38 + tab])}
                        defaultValue={''}
                        value={isNaN(value[38 + tab]) ? null : value[38 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 38 + tab)}
                    /></span>,
                    paifengji: <span><Input

                        style={this.changeStyle(value[39 + tab])}
                        defaultValue={''}
                        value={isNaN(value[39 + tab]) ? null : value[39 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 39 + tab)}
                    /></span>,
                    paifengji_zhuansu: <span><Input

                        style={this.changeStyle(value[40 + tab])}
                        defaultValue={''}
                        value={isNaN(value[40 + tab]) ? null : value[40 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 40 + tab)}
                    /></span>,
                    posuiji: <span><Input

                        style={this.changeStyle(value[41 + tab])}
                        defaultValue={''}
                        value={isNaN(value[41 + tab]) ? null : value[41 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 41 + tab)}
                    /></span>,
                    xielalian: <span><Input

                        style={this.changeStyle(value[42 + tab])}
                        defaultValue={''}
                        value={isNaN(value[42 + tab]) ? null : value[42 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 42 + tab)}
                    /></span>,
                    yishiyali: <span><Input

                        style={this.changeStyle(value[43 + tab])}
                        defaultValue={''}
                        value={isNaN(value[43 + tab]) ? null : value[43 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 43 + tab)}
                    /></span>,
                    o2: <span><Input

                        style={this.changeStyle(value[44 + tab])}
                        defaultValue={''}
                        value={isNaN(value[44 + tab]) ? null : value[44 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 44 + tab)}
                    /></span>,
                    co: <span><Input

                        style={this.changeStyle(value[45 + tab])}
                        defaultValue={''}
                        value={isNaN(value[45 + tab]) ? null : value[45 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 45+ tab)}
                    /></span>,
                    nox: <span><Input

                        style={this.changeStyle(value[46 + tab])}
                        defaultValue={''}
                        value={isNaN(value[46 + tab]) ? null : value[46 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 46 + tab)}
                    /></span>,
                    dy_kv_1: <span><Input

                        style={this.changeStyle(value[47 + tab])}
                        defaultValue={''}
                        value={isNaN(value[47 + tab]) ? null : value[47 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 47 + tab)}
                    /></span>,
                    dy_kv_2: <span><Input

                        style={this.changeStyle(value[48 + tab])}
                        defaultValue={''}
                        value={isNaN(value[48 + tab]) ? null : value[48 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 48 + tab)}
                    /></span>,
                    dy_kv_3: <span><Input

                        style={this.changeStyle(value[49 + tab])}
                        defaultValue={''}
                        value={isNaN(value[49 + tab]) ? null : value[49 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 49 + tab)}
                    /></span>,
                    dl_ma_1: <span><Input

                        style={this.changeStyle(value[50 + tab])}
                        defaultValue={''}
                        value={isNaN(value[50 + tab]) ? null : value[50 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 50 + tab)}
                    /></span>,
                    dl_ma_2: <span><Input

                        style={this.changeStyle(value[51 + tab])}
                        defaultValue={''}
                        value={isNaN(value[51 + tab]) ? null : value[51 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 51 + tab)}
                    /></span>,
                    dl_ma_3: <span><Input

                        style={this.changeStyle(value[52 + tab])}
                        defaultValue={''}
                        value={isNaN(value[52 + tab]) ? null : value[52 + tab]}
                        onChange={event => this.onInputNumberChange2(event.target.value, i, 52 + tab)}
                    /></span>,


                    //btn_save: <Button type='primary' onClick={() => this.postToHome(i)}>暂存</Button>,
                })
        }
        /**数据的自动处理显示部分**end**/
        function callback(key) {
            this.setState({
                TabChoose: key
            });
        }

        return (
            <div className="upper">
                {/*表格填写*/}

                <Tabs defaultActiveKey="0" onChange={callback.bind(this)}>
                    <TabPane tab="表1" key="0">
                        <Table
                            className="pper_table" columns={columns} bordered
                            dataSource={dataSource} pagination={false}
                        />
                    </TabPane>
                    <TabPane tab="表2" key="1"><Table
                        className="pper_table2" columns={columns_tab2} bordered
                        dataSource={dataSource_tab2} scroll={{x: 2000}} pagination={false}/>
                    </TabPane>
                    <TabPane tab="表3" key="2"><Table
                        className="pper_table2" columns={columns_tab3} bordered
                        dataSource={dataSource_tab3}  pagination={false}/>
                    </TabPane>
                </Tabs>

            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        //date: state.getIn(['burnSysOpRe', 'date']),
        timeChose: state.getIn(['burnSysOpRe', 'timeChose']),
        data: state.getIn(['burnSysOpRe', 'data']),
        person: state.getIn(['burnSysOpRe', 'person']),
        tableName: state.getIn(['burnSysOpRe', 'tableName']),
        allTime: state.getIn(['burnSysOpRe', 'allTime']),

        searchFlag:state.getIn(['searchTable', 'searchFlag']),
        date: state.getIn(['searchTable', 'date']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {
            dispatch(actionCreators.updateData({data: deepCopy(NewData)}))
        },


        //上表暂存一行数据
        saveToHome(date, index, tableName, data) {


            dispatch(actionCreators.saveData({
                date: date,
                index: index,
                tableName: tableName,
                data: data
            }))
        },


    }//end return
};


export default connect(mapStateToProps, mapDispathToProps)(UpperForm);