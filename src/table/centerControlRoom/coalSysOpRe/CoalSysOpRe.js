import React, {Component} from 'react';
import ButtonConfirmBox from './components/BottonConfirmBox';
import TimeShow from './components/TimeShow';
import UpperForm from './components/UpperForm';
import Remark from './components/Remark';
import {connect} from 'react-redux';
import * as actionCreators from './store/actionCreators';
import 'antd/dist/antd.css';
import {deepCopy} from "../../../Helper/Copy";
import moment from 'moment';

// 福石水泥3000t/d中控室煤磨系统运行记录
class CoalSysOpRe extends Component {

    componentWillMount() {
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/

        const{data,CRO_data,date,tableName,tableName_CRO,requestFlag,getOldData,setOldData,requestFlag_CRO} = this.props

        if(requestFlag){
            getOldData(
                date,
                tableName,
                deepCopy(data)
            );
        }//end if
        if(requestFlag_CRO){
            setOldData(
                date,
                tableName_CRO,
                deepCopy(CRO_data)
            );
        }//end if
    }

    componentWillReceiveProps(nextProps){
        const { tableName, tableName_CRO, setOldData, getOldData, date } = nextProps; //新的props

        const modelData = [//定义该页面的数据模板
            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//0-7行代表 0-7小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//9-16行代表 8-15小时
            {data: []},//下表

            {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//18-25行代表 16-23小时
            {data: []},//下表

        ];

        const CRO_modelData = [

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},//均值 比值 合格率
            {data: []}, {data: []}, {data: []}, {data: []},//下表数据

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},

            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []},
            {data: []}, {data: []}, {data: []}, {data: []},
        ];

        if(this.props.date != date){
            getOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            setOldData(moment(date).format("YYYY/MM/DD"),tableName_CRO, deepCopy(CRO_modelData));
        }
    }

    returnBack = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div style={{padding: '1%'}}>
                <h1 align="center">福石水泥3000t/d中控室煤磨系统运行记录</h1>
                <TimeShow/>
                <div
                    style={{
                        border: "1px solid black",
                        margin: "10px 20px 10px 20px"
                    }}
                >
                    {/*/!*表单上半部分*!/*/}
                    <UpperForm/>

                    {/* 表单下部分备注区 */}
                    <Remark/>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                {this.props.searchFlag ? (<ButtonConfirmBox />) : null}
                    
                </div>
            </div>
        );

    }
}

//定义映射
const mapStateToProps = (state) => {
    return {

        //date:state.getIn(['coalSysOpRe', 'date']),
        timeChose:state.getIn(['coalSysOpRe', 'timeChose']),
        data:state.getIn(['coalSysOpRe', 'data']),
        CRO_data:state.getIn(['coalSysOpRe', 'CRO_data']),
        requestFlag:state.getIn(['coalSysOpRe', 'requestFlag']),
        requestFlag_CRO:state.getIn(['coalSysOpRe', 'requestFlag_CRO']),
        person:state.getIn(['coalSysOpRe', 'person']),
        tableName:state.getIn(['coalSysOpRe', 'tableName']),
        tableName_CRO:state.getIn(['coalSysOpRe', 'tableName_CRO']),
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.get_CRO_Data(date,tableName,data))
        },
        //和仓库建立联系
        getOldData(
            date,
            tableName,
            data
        ){
            dispatch(
                actionCreators.getData(date,tableName,data)
            );
        }

    }//end return
}

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(CoalSysOpRe);
