import React, {Component, Fragment} from 'react';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {requestCheckPermission} from "../../../http/request/RequestUser"
import {deepCopy} from "../../../Helper/Copy";
import moment from 'moment';

//煤粉工业分析原始记录
class MFIndusAnaOriRe extends Component {
    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, date, tableName, setOldData,modelData} = this.props;

        setOldData(date,tableName,deepCopy(modelData));

    }
    componentWillReceiveProps(nextProps, nextContext) {
        const { tableName, setOldData, date,searchFlag } = nextProps; //新的props
        const {modelData} = this.props;


        if(this.props.date != date){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
        if(this.props.searchFlag != searchFlag){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }
    }

    render(){
        return(
            <Fragment>
                <div style={{padding: '1%'}} ref={(el) => this.refs = el}>
                    <h1 align="center">煤粉工业分析原始记录</h1>
                    {/*表单最上的时间及人员显示*/}
                    <TimeShow/>
                    <div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                       <UpperForm/>
                    </div>
                    <div
                        style={{
                            float: "right",
                            margin: "0px 50px 20px 0px",
                            display: "inline-block"
                        }}
                    >
                        <ButtonComfirmBox/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        //date:state.getIn(['mfIndusAnaOriRe', 'date']),
        data:state.getIn(['mfIndusAnaOriRe', 'data']),
        modelData:state.getIn(['mfIndusAnaOriRe', 'modelData']),
        requestFlag:state.getIn(['mfIndusAnaOriRe', 'requestFlag']),
        person:state.getIn(['mfIndusAnaOriRe', 'person']),
        tableName:state.getIn(['mfIndusAnaOriRe', 'tableName']),
        date: state.getIn(['searchTable', 'date']),
        searchFlag: state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        }
    }//end return
}

//export default MFIndusAnaOriRe;
export default connect(mapStateToProps, mapDispathToProps)(MFIndusAnaOriRe);