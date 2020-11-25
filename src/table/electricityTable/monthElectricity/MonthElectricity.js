import React, {Component, Fragment} from 'react';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import BottomForm from './component/BottomForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {deepCopy} from "../../../Helper/Copy";

import moment from 'moment';

//每月电量表
class MonthElectricity extends Component {
    returnBack = () => {
        this.props.history.push("/index");
    };

    //判定是否已登录，是否有权限
    componentWillMount() {
    }

    componentDidMount() {
        /**首先查询当前页面是否有历史纪录并赋值formData**/
        const {data, date, tableName, setOldData, requestFlag, searchFlag, modelData, queryData} = this.props;
        if(searchFlag){
            setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }else{
            queryData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
        }

    }

    componentWillReceiveProps(nextProps){

        const { tableName, setOldData, date, searchFlag, queryData } = nextProps; //新的props


        const { modelData,data } = this.props;

        if(this.props.date != date){
            if(searchFlag){
                setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            }else{
                queryData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            }
        }

        if(this.props.searchFlag != searchFlag){
            console.log("1");
            if(searchFlag){
                setOldData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            }else{
                queryData(moment(date).format("YYYY/MM/DD"), tableName, deepCopy(modelData));
            }
        }
    }

	render(){
		return(
			<Fragment>
				<div style={{padding: '1%'}} ref={(el) => this.refs = el}>
					<h1 align="center">每月电量表</h1>
					{/*表单最上的时间及人员显示*/}
					<TimeShow/>
					<div
                        style={{
                            border: "2px solid black",
                            margin: "0px 30px 0px 30px"
                        }}
                    >
                       <UpperForm/>
                       {this.props.searchFlag ? null : (<BottomForm />)}
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
				</div>
			</Fragment>
		)
	}
}

//定义映射
const mapStateToProps = (state) => {
    return {
        data:state.getIn(['monthElectricity', 'data']),
        requestFlag:state.getIn(['monthElectricity', 'requestFlag']),
        person:state.getIn(['monthElectricity', 'person']),
        tableName:state.getIn(['monthElectricity', 'tableName']),
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
        modelData:state.getIn(['monthElectricity', 'modelData']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        },
        queryData(date,tableName,data){
            dispatch(actionCreators.queryData(date,tableName,data))
        },
    }//end return
}

//export default MonthElectricity;
export default connect(mapStateToProps, mapDispathToProps)(MonthElectricity);