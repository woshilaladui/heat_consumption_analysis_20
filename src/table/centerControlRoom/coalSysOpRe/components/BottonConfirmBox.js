import React, {Component} from 'react';
import {Button} from 'antd';
import {Popconfirm} from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {Table} from "../../../../http/constant/Constant";
import {deepCopy} from "../../../../Helper/Copy";

class ButtonConfirmBox extends Component {

    cancel() {
    }

    postAllToHome() {
        const {data, saveAllToHome, tableName,date} = this.props;
        const Data = deepCopy(data)
        saveAllToHome(date,tableName, Data);

    }


    render() {
        return (
            <Popconfirm title={"是否提交" } onConfirm={()=> this.postAllToHome()} onCancel={this.cancel}
                        placement={this.arrowPointAtCenter}
                        okText="是"
                        cancelText="否">
                <Button type={this.props.type} size={"large"} htmlType={"button"}
                        style={{
                            margin: '20px 5px 0px 5px'
                        }}
                >提交</Button>
            </Popconfirm>

        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        //date:state.getIn(['coalSysOpRe', 'date']),
        allTime:state.getIn(['coalSysOpRe', 'allTime']),
        timeChose:state.getIn(['coalSysOpRe', 'timeChose']),
        data:state.getIn(['coalSysOpRe', 'data']),
        requestFlag:state.getIn(['coalSysOpRe', 'requestFlag']),
        person:state.getIn(['coalSysOpRe', 'person']),
        tableName:state.getIn(['coalSysOpRe', 'tableName']),
        date:state.getIn(['searchTable', 'date']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        saveAllToHome(date,tableName, data){
            dispatch(actionCreators.saveData({
                tableType:Table.ALL_TABLE,
                date:date,
                tableName:tableName,
                data:data,
                num:27
            }));
        }

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmBox);