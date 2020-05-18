import React, {Component} from 'react';
import {Button} from 'antd';
import {Popconfirm} from 'antd';

import * as actionCreators from "../../setStandard/store/actionCreators";

import {connect} from "react-redux";
import {deepCopy} from "../../../Helper/Copy";

class ButtonConfirmationBox extends Component {


    cancel() {

    }

    postAllToHome() {
        const {
            date,
            tableChose,
            tableNameList,
            newStartValue,
            newEndValue,
            newReason,
            saveAllToHome,
            person
        } = this.props;

        let tempTableNameList = deepCopy(tableNameList);


        saveAllToHome(
            tempTableNameList[tableChose],
            newStartValue,
            newEndValue,
            newReason,
            date,
            person
        );
    }

    render() {
        return(
            <Popconfirm title={"是否提交"} onConfirm={()=> this.postAllToHome()} onCancel={this.cancel}
                        placement={this.arrowPointAtCenter}
                        okText="是"
                        cancelText="否">
                <Button type={this.props.type} size={"large"} htmlType={"button"}
                        style={{
                            margin:'20px 5px 0px 5px'
                        }}
                > 提交</Button>
            </Popconfirm>

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
        allItem:state.getIn(['setStandard', 'allItem']),
        tableNameList:state.getIn(['setStandard', 'tableNameList']),

        newStartValue:state.getIn(['setStandard', 'newStartValue']),
        newEndValue:state.getIn(['setStandard', 'newEndValue']),
        newReason:state.getIn(['setStandard', 'newReason']),
        newUsername:state.getIn(['setStandard', 'newUsername']),


    }
};

const mapDispathToProps = (dispatch) => {
    return {
        saveAllToHome(
            tableName,
            startValue,
            endValue,
            reason,
            createdAt,
            person
        ) {
            dispatch(actionCreators.saveData(
                tableName,
                startValue,
                endValue,
                reason,
                createdAt,
                person
            ));
        }

    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);