import React, {Component} from 'react';
import ButtonConfirmationBox from './components/ButtonComfirmBox';
import TimeShow from './components/TimeShow';
import StandardForm from './components/StandardForm';
import 'antd/dist/antd.css';
import './SetStandard.css';
import * as actionCreators from "../setStandard/store/actionCreators";
import {connect} from "react-redux";

import {deepCopy} from "../../Helper/Copy";


class SetStandard extends Component {


    componentWillMount() {

    }

    componentDidMount() {
        const {setOldData,requestFlag,tableNameList,tableChose} = this.props;

        if(requestFlag){

            let tempTableNameList = deepCopy(tableNameList);

            setOldData(tempTableNameList[tableChose]);
        }
    }

    /***返回按钮事件 ***/
    returnBack = () => {
        //this.props.history.push("/index");
    };

    render() {
        return (
            <div style={{margin: '30px 30px 30px 30px'}}>
                <h1 align="center">设置标准值</h1>
                {/*表单最上的时间及人员显示*/}
                <TimeShow/>
                <div style={{
                    border: '2px solid black',
                    margin: '0px 20px 0px 20px'
                }}>
                    {/*表单数据部分*/}
                    <StandardForm

                    />
                </div>
                <div
                    style={{
                        float: "right",
                        margin: "0px 50px 20px 0px",
                        display: "inline-block"
                    }}
                >
                    <ButtonConfirmationBox type="primary" buttonText="提交" action={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['setStandard', 'date']),
        tableChose:state.getIn(['setStandard', 'tableChose']),
        requestFlag:state.getIn(['setStandard', 'requestFlag']),
        person:state.getIn(['setStandard', 'person']),
        tableNameList:state.getIn(['setStandard', 'tableNameList']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        setOldData(tableName){
            dispatch(actionCreators.getData(tableName))
        }
    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(SetStandard);