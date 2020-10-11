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
        console.log("煤磨")
        console.log("煤磨")
        console.log("煤磨")
        const{data,CRO_data,CRO_data_modelData,date,tableName,searchdate,tableName_CRO,modelData,requestFlag,getOldData,setOldData,requestFlag_CRO} = this.props

        let realdate = date;
        if( moment(searchdate).format("YYYY/MM/DD") != date){
            realdate = moment(searchdate).format("YYYY/MM/DD");
        };

        if(requestFlag||moment(searchdate).format("YYYY/MM/DD") != date){
            getOldData(
              realdate,
                tableName,
                deepCopy(modelData)
            );
        }//end if
        if(requestFlag_CRO||moment(searchdate).format("YYYY/MM/DD") != date){
            setOldData(
              realdate,
                tableName_CRO,
                deepCopy(CRO_data_modelData)
            );
        }//end if
    }

    componentWillReceiveProps(nextProps){
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, tableName_CRO, setOldData, getOldData, searchdate,modelData,CRO_data_modelData } = nextProps; //新的props

        if(oldSearchDate != searchdate){
            getOldData(moment(searchdate).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            setOldData(moment(searchdate).format("YYYY/MM/DD"),tableName_CRO, deepCopy(CRO_data_modelData));
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

        date:state.getIn(['coalSysOpRe', 'date']),
        timeChose:state.getIn(['coalSysOpRe', 'timeChose']),
        data:state.getIn(['coalSysOpRe', 'data']),
        CRO_data:state.getIn(['coalSysOpRe', 'CRO_data']),
        requestFlag:state.getIn(['coalSysOpRe', 'requestFlag']),
        requestFlag_CRO:state.getIn(['coalSysOpRe', 'requestFlag_CRO']),
        person:state.getIn(['coalSysOpRe', 'person']),
        tableName:state.getIn(['coalSysOpRe', 'tableName']),
        tableName_CRO:state.getIn(['coalSysOpRe', 'tableName_CRO']),
        modelData:state.getIn(['coalSysOpRe', 'modelData']),
        CRO_data_modelData:state.getIn(['coalSysOpRe', 'CRO_data_modelData']),
        searchdate:state.getIn(['searchTable', 'date']),
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
