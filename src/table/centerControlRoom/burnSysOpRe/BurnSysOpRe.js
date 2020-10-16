import React, {Component, Fragment} from 'react';
import './BurnSysOpRe.css';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import BottomForm from './component/BottomForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {deepCopy} from "../../../Helper/Copy";
import moment from 'moment';

//福石水泥3000t/d中控室烧成系统运行记录
class BurnSysOpRe extends Component {

    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        console.log("Did");
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, date, tableName, setOldData, requestFlag, person, searchFlag } = this.props;
        console.log(requestFlag);
        if(requestFlag){
            setOldData(date,tableName,deepCopy(data));
        }

    }

    componentWillReceiveProps(nextProps){
        console.log("变了");
        const oldSearchDate = this.props.searchdate; //旧的props
        const { tableName, setOldData, searchdate } = nextProps; //新的props
        const {updateCRF} =this.props;
        const modelData = [//定义该页面的数据模板
                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
                {data: []}, {data: []}, {data: []}, {data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},//下表的数据 8-11行

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
                {data: []}, {data: []}, {data: []}, {data: [
                        '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
                    ]},//下表的数据 20-23行

                {data: []}, {data: []}, {data: []}, {data: []},
                {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
                {data: []}, {data: []}, {data: []}, {data: [
                    '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
                ]},//下表的数据 32-35行

        ];




        if(oldSearchDate != searchdate) {


            setOldData(moment(searchdate).format("YYYY/MM/DD"), tableName, deepCopy(modelData));

            updateCRF();


        }



    }

    componentWillUnmount(){
        console.log("Un");
    }

    

    render() {
        return (
            <Fragment style={{width: "100%", height: "100%"}}>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">福石水泥3000t/d中控室烧成系统运行记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow

                    />
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >

                        <UpperForm/>
                        {/* 表单下半部分 */}
                        <BottomForm/>
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    {this.props.searchFlag ? (<ButtonComfirmBox />) : null}
                </div>
            </Fragment>
        )
    }
}


//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['burnSysOpRe', 'date']),
        timeChose:state.getIn(['burnSysOpRe', 'timeChose']),
        data:state.getIn(['burnSysOpRe', 'data']),
        requestFlag:state.getIn(['burnSysOpRe', 'requestFlag']),
        person:state.getIn(['burnSysOpRe', 'person']),
        tableName:state.getIn(['burnSysOpRe', 'tableName']),
        searchdate:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        },
        updateCRF() {
            dispatch(actionCreators.updateCRF())
        },
    }//end return
};

//export default BurnSysOpRe;
export default connect(mapStateToProps, mapDispathToProps)(BurnSysOpRe);