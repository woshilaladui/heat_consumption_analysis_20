import React, {Component, Fragment} from 'react';
import {Button, Divider, Select, DatePicker, Form,} from 'antd';

import moment from 'moment';
import './searchTable.css';
import ReactToPrint from 'react-to-print';
// 中控室表格导入
import BurnSysOpRe from '../../searchTable/centerControlRoom/burnSysOpRe/BurnSysOpRe';
import CoalSysOpRe from '../../searchTable/centerControlRoom/coalSysOpRe/CoalSysOpRe';
import RuYSLYGFXJL from '../../table/centerControlRoom/ruYSLYGFXJL/RuYSLYGFXJL';
import RawSysOpRe from '../../table/centerControlRoom/rawSysOpRe/RawSysOpRe';
import TXSysAcRe from '../../table/centerControlRoom/TXSysAcRe/TXSysAcRe';
import RawFAnaRaRe from '../../table/centerControlRoom/RawFAnaRaRe/RawFAnaRaRe';
import FluoAnaAndDetRe from '../../table/centerControlRoom/fluoAnaAndDetRe/FluoAnaAndDetRe';
import OnlineAutoDetOpRe from '../../table/centerControlRoom/onlineAutoDetOpRe/OnlineAutoDetOpRe';
import CentralControlDaRe from '../../table/centerControlRoom/centralControlDaRe/CentralControlDaRe';
//荧光分析导入
import RawMatCheAnaRe from '../fluorescenceAnaTabel/RawMatCheAnaRe/RawMatCheAnaRe';
import RawMatCheAnaReFMHg from '../fluorescenceAnaTabel/RawMatCheAnaReFMHg/RawMatCheAnaReFMHg';
import RawMatCheAnaReFMHs from '../fluorescenceAnaTabel/RawMatCheAnaReFMHs/RawMatCheAnaReFMHs';
import RawMatCheAnaReSY from '../fluorescenceAnaTabel/RawMatCheAnaReSY/RawMatCheAnaReSY';
import RawMatCheAnaReTF from '../fluorescenceAnaTabel/RawMatCheAnaReTF/RawMatCheAnaReTF';
import WareHouseRawMatCARe from '../fluorescenceAnaTabel/wareHouseRawMatCARe/WareHouseRawMatCARe';
import CMRawCheAnaRe from '../fluorescenceAnaTabel/CMRawMatCheAnaRe/CMRawMatCheAnaRe';
import RYRawMatCheAnaRe from '../fluorescenceAnaTabel/RYRawMatCheAnaRe/RYRawMatCheAnaRe';
import KilnCAnaSumTable from '../fluorescenceAnaTabel/KilnCAnaSumTable/KilnCAnaSumTable';
import FactoryCliAnaSumTable from '../fluorescenceAnaTabel/FactoryCliAnaSumTable/FactoryCliAnaSumTable';
import ControlRoomOriginalRe from '../fluorescenceAnaTabel/ControlRoomOriginalRe/ControlRoomOriginalRe';
// 分析表格导入
import RawMatAnaOriRe from '../../table/analysisTable/rawMatAnaOriRe/RawMatAnaOriRe';
import RawMatAnaOriReSY from '../../table/analysisTable/rawMatAnaOriReSY/RawMatAnaOriReSY';
import RawMatAnaOriReTF from '../../table/analysisTable/rawMatAnaOriReTF/RawMatAnaOriReTF';
import RawMatAnaOriReFMHg from '../../table/analysisTable/rawMatAnaOriReFMHg/RawMatAnaOriReFMHg';
import RawMatAnaOriReFMHs from '../../table/analysisTable/rawMatAnaOriReFMHs/RawMatAnaOriReFMHs';
import CMRawMatAnaOriRe from '../../table/analysisTable/CMRawMatAnaOriRe/CMRawMatAnaOriRe';
import RYRawMatAnaOriRe from '../../table/analysisTable/RYRawMatAnaOriRe/RYRawMatAnaOriRe';
import CYCheAnaSheet from '../../table/analysisTable/CYCheAnaSheet/CYCheAnaSheet';
import CCCheAnaSheet from '../../table/analysisTable/CCCheAnaSheet/CCCheAnaSheet';
import CYPhyPerTest from '../../table/analysisTable/CYPhyPerTest/CYPhyPerTest';
import CCPhyPerTest from '../../table/analysisTable/CCPhyPerTest/CCPhyPerTest';
import JCMoCoCoMa from '../../table/analysisTable/JCMoCoCoMa/JCMoCoCoMa';
import SMIndusAnaOriRe from '../../table/analysisTable/SMIndusAnaOriRe/SMIndusAnaOriRe';
import MFIndusAnaOriRe from '../../table/analysisTable/MFIndusAnaOriRe/MFIndusAnaOriRe';
import MonthElectricity from "../../table/electricityTable/monthElectricity/MonthElectricity";
import ThreeFiveKwTable from "../../table/electricityTable/threeFiveKwTable/ThreeFiveKwTable";

import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';


const Option = Select.Option;
const biaoge_list = [
    '烧成系统运行记录', '煤磨系统运行记录', '生料磨系统运行记录', '脱销系统运行记录', '出磨生料荧光分析及配比记录',
    '入窑生料荧光分析及检测记录', '熟料荧光分析及检测记录', '在线自动检测运行记录(排放物)', '中控室日报',

    '石灰石进厂原材料化学分析报告单', '砂岩进厂原材料化学分析报告单', '铁粉进厂原材料化学分析报告单', '粉煤灰(干)进厂原材料化学分析报告单',
    '粉煤灰(湿)进厂原材料化学分析报告单', '仓下原材料化学分析报告单', '出磨生料化学分析报告单', '入窑生料化学分析报告单',
    '出窑熟料全分析汇总表', '出厂熟料全分析汇总表', '控制室原始记录',

    '石灰石原材料分析原始记录', '砂岩原材料分析原始记录', '铁粉原材料分析原始记录', '粉煤灰(干)原材料分析原始记录',
    '粉煤灰(湿)原材料分析原始记录', '出磨生料分析原始记录', '入窑生料分析原始记录', '出窑熟料化学分析单', '出厂熟料化学分析单',
    '出窑熟料物理性能检测', '出厂熟料物理性能检测', '进厂原燃材料水分', '神木工业分析原始记录', '煤粉工业分析原始记录',

    '每月电量表','35KW表',

    '化验室日报', '化验室周报', '化验室月报', '化验室年报',
];

const table_Choose = [
                //0-8是中控室
                <BurnSysOpRe/>,
                <CoalSysOpRe/>,
                <RawSysOpRe/>,
                <TXSysAcRe/>,
                <RawFAnaRaRe/>,
                <RuYSLYGFXJL/>,
                <FluoAnaAndDetRe/>,
                <OnlineAutoDetOpRe/>,
                <CentralControlDaRe/>,
                //9-19是荧光分析
                <RawMatCheAnaRe/>,//9
                <RawMatCheAnaReSY/>,//10
                <RawMatCheAnaReTF/>,//11
                <RawMatCheAnaReFMHg/>,//12
                <RawMatCheAnaReFMHs/>,//13
                <WareHouseRawMatCARe/>,//14
                <CMRawCheAnaRe/>,//15
                <RYRawMatCheAnaRe/>,//16
                <KilnCAnaSumTable/>,//17
                <FactoryCliAnaSumTable/>,//18
                <ControlRoomOriginalRe/>,//19
                //20-33是分析表格
                <RawMatAnaOriRe/>,//20
                <RawMatAnaOriReSY/>,//21
                <RawMatAnaOriReTF/>,//22
                <RawMatAnaOriReFMHg/>,//23
                <RawMatAnaOriReFMHs/>,//24
                <CMRawMatAnaOriRe/>,//25
                <RYRawMatAnaOriRe/>,//26
                <CYCheAnaSheet/>,//28
                <CCCheAnaSheet/>,//28
                <CYPhyPerTest/>,//29
                <CCPhyPerTest/>,//30
                <JCMoCoCoMa/>,//31
                <SMIndusAnaOriRe/>,//32
                <MFIndusAnaOriRe/>,//33
                //34-35是电量表格
                <MonthElectricity />,//34
                <ThreeFiveKwTable />,//35
];

class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: '0',//表格选项
            table_Display: new Array(36).fill('none'),//控制表格的显示，默认全不显示
            t_name_Display: [],//控制表格下拉框中 中控室表格是否显示
            defaultValue:"",//表格默认展示
        }
    }


    componentWillMount() {
        let departmentId = window.localStorage.department;
        console.log(departmentId);
        switch(departmentId){
            case "1":    //化验室
                this.setState({
                    t_name_Display: [
                    'none','none','none','none','none','none','none','none','none','',
                    '','','','','','','','','','',
                    '','','','','','','','','','',
                    '','','','','','',
                    ],
                    defaultValue:"9",
                });
                break;
            case "2":    //中控室
                this.setState({
                    t_name_Display: [
                    '','','','','','','','','','none',
                    'none','none','none','none','none','none','none','none','none','none',
                    'none','none','none','none','none','none','none','none','none','none',
                    'none','none','none','none','none','none',
                    ],
                    defaultValue:"0",
                });
                break;
            case "3":    //行政部门
                this.setState({
                    t_name_Display: [
                    'none','none','none','none','none','none','none','none','none','none',
                    'none','none','none','none','none','none','none','none','none','none',
                    'none','none','none','none','none','none','none','none','none','none',
                    'none','none','none','none','none','none',
                    ],
                    defaultValue:"",
                });
                break;
            case "4":    //总部
                this.setState({
                    t_name_Display: [],
                    defaultValue:"0",
                });
                break;
            default:
                this.setState({
                    t_name_Display: [],
                    defaultValue:"0",
                });
        }
    }

    componentDidMount() {
        this.props.changeSearchFlag(false);
        this.props.handleChangeTime(moment().format("YYYY/MM/DD"));
    }

    componentWillUnmount(){
        this.props.changeSearchFlag(true);
        this.props.handleChangeTime(moment().format("YYYY/MM/DD"));
    }

    //选择表格类型
    handleChange = (value) => {
        this.setState({
            selectValue: value,
        });
    };

    //控制表格显示
    setVisibility = (table) => {
        const table_Display = new Array(38).fill('none')
        table_Display[table] = 'block'
        this.setState({
            table_Display: table_Display
        })
    };

    //提交按钮事件
    handleQuery = () => {
        const {selectValue} = this.state
        this.setVisibility(selectValue);//改变表格显示状态
    };

    handlePrint = () => {
        window.document.body.innerHTML = window.document.getElementById("abc").innerHTML;
        window.print();
        window.location.reload();
    };

    render() {

        const {t_name_Display} = this.state;

        return (
            <div className='search' style={{padding: '1%'}}>
                <div className='search_head'>
                    <Divider/>
                    <span>请选择表格类型：</span>
                    <Select defaultValue={this.state.defaultValue} style={{width: 230, margin: '10px'}} onChange={this.handleChange}>
                        <Option value="0" style={{display:t_name_Display[0]}}>{biaoge_list[0]}</Option>
                        <Option value="1" style={{display:t_name_Display[1]}}>{biaoge_list[1]}</Option>
                        <Option value="2" style={{display:t_name_Display[2]}}>{biaoge_list[2]}</Option>
                        <Option value="3" style={{display:t_name_Display[3]}}>{biaoge_list[3]}</Option>
                        <Option value="4" style={{display:t_name_Display[4]}}>{biaoge_list[4]}</Option>
                        <Option value="5" style={{display:t_name_Display[5]}}>{biaoge_list[5]}</Option>
                        <Option value="6" style={{display:t_name_Display[6]}}>{biaoge_list[6]}</Option>
                        <Option value="7" style={{display:t_name_Display[7]}}>{biaoge_list[7]}</Option>
                        <Option value="8" style={{display:t_name_Display[8]}}>{biaoge_list[8]}</Option>

                        <Option value="9" style={{display:t_name_Display[9]}}>{biaoge_list[9]}</Option>
                        <Option value="10" style={{display:t_name_Display[10]}}>{biaoge_list[10]}</Option>
                        <Option value="11" style={{display:t_name_Display[11]}}>{biaoge_list[11]}</Option>
                        <Option value="12" style={{display:t_name_Display[12]}}>{biaoge_list[12]}</Option>
                        <Option value="13" style={{display:t_name_Display[13]}}>{biaoge_list[13]}</Option>
                        <Option value="14" style={{display:t_name_Display[14]}}>{biaoge_list[14]}</Option>
                        <Option value="15" style={{display:t_name_Display[15]}}>{biaoge_list[15]}</Option>
                        <Option value="16" style={{display:t_name_Display[16]}}>{biaoge_list[16]}</Option>
                        <Option value="17" style={{display:t_name_Display[17]}}>{biaoge_list[17]}</Option>
                        <Option value="18" style={{display:t_name_Display[18]}}>{biaoge_list[18]}</Option>
                        <Option value="19" style={{display:t_name_Display[19]}}>{biaoge_list[19]}</Option>

                        <Option value="20" style={{display:t_name_Display[20]}}>{biaoge_list[20]}</Option>
                        <Option value="21" style={{display:t_name_Display[21]}}>{biaoge_list[21]}</Option>
                        <Option value="22" style={{display:t_name_Display[22]}}>{biaoge_list[22]}</Option>
                        <Option value="23" style={{display:t_name_Display[23]}}>{biaoge_list[23]}</Option>
                        <Option value="24" style={{display:t_name_Display[24]}}>{biaoge_list[24]}</Option>
                        <Option value="25" style={{display:t_name_Display[25]}}>{biaoge_list[25]}</Option>
                        <Option value="26" style={{display:t_name_Display[26]}}>{biaoge_list[26]}</Option>
                        <Option value="27" style={{display:t_name_Display[27]}}>{biaoge_list[27]}</Option>
                        <Option value="28" style={{display:t_name_Display[28]}}>{biaoge_list[28]}</Option>
                        <Option value="29" style={{display:t_name_Display[29]}}>{biaoge_list[29]}</Option>
                        <Option value="30" style={{display:t_name_Display[30]}}>{biaoge_list[30]}</Option>
                        <Option value="31" style={{display:t_name_Display[31]}}>{biaoge_list[31]}</Option>
                        <Option value="32" style={{display:t_name_Display[32]}}>{biaoge_list[32]}</Option>
                        <Option value="33" style={{display:t_name_Display[33]}}>{biaoge_list[33]}</Option>

                        <Option value="34" style={{display:t_name_Display[34]}}>{biaoge_list[34]}</Option>
                        <Option value="35" style={{display:t_name_Display[35]}}>{biaoge_list[35]}</Option>
                    </Select>
                    <span>请选择日期：</span>
                    <DatePicker
                        defaultValue={moment()}
                        format="YYYY-MM-DD"
                        placeholder='选择日期'
                        onChange={this.props.handleChangeTime}
                        style={{margin: '10px'}}
                    />
                    <Button type="primary" style={{margin: '10px'}} onClick={this.handleQuery}>查询</Button>

                    <Divider/>
                </div>
                <div className='chakan_body'>
                    <section
                        style={{display: this.state.table_Display[this.state.selectValue]}}
                    >
                        {table_Choose[this.state.selectValue]}
                    </section>
                </div>
            </div>

        )

    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        handleChangeTime(e){
            if (!e) {
                return;
            }
            dispatch(actionCreators.changeSearchTime(moment(e).format("YYYY/MM/DD")));
        },

        changeSearchFlag(flag){
            dispatch(actionCreators.changeSearchFlag(flag));
        },

        changeSearchTime(date){
            dispatch(actionCreators.changeSearchTime(date));
        }
    }//end return
};

//export default SearchTable;
export default connect(mapStateToProps, mapDispathToProps)(SearchTable);