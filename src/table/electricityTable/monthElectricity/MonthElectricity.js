import React, {Component, Fragment} from 'react';
import ButtonComfirmBox from './component/ButtonComfirmBox';
import TimeShow from './component/TimeShow';
import UpperForm from './component/UpperForm';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {requestCheckPermission} from "../../../http/request/RequestUser"
import {deepCopy} from "../../../Helper/Copy";

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
        const {data, date, tableName, setOldData,requestFlag} = this.props;
        if(requestFlag){
            setOldData(date,tableName,deepCopy(data));
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
        //date:state.getIn(['monthElectricity', 'date']),
        data:state.getIn(['monthElectricity', 'data']),
        requestFlag:state.getIn(['monthElectricity', 'requestFlag']),
        person:state.getIn(['monthElectricity', 'person']),
        tableName:state.getIn(['monthElectricity', 'tableName']),
        date:state.getIn(['searchTable', 'date']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(date,tableName,data){
            dispatch(actionCreators.getData(date,tableName,data))
        }
    }//end return
}

//export default MonthElectricity;
export default connect(mapStateToProps, mapDispathToProps)(MonthElectricity);