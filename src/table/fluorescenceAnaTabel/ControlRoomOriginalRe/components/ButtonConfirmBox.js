import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";
import {Table} from "../../../../http/constant/Constant";

class ButtonConfirmationBox extends Component{



    postAllToHome(){
        const {data, saveAllToHome, tableName,date} = this.props;
        const Data = deepCopy(data)
        saveAllToHome(date,tableName, Data);
    }
    cancel() {

    }

    render()
    { 
        return(
            <Popconfirm title={"是否提交"} onConfirm={()=> this.postAllToHome()} onCancel={this.cancel}
                        placement={this.arrowPointAtCenter}
                        okText="是"
                        cancelText="否">
                <Button type={this.props.type} size={"large"} htmlType={"button"}
                        style={{
                            margin:'20px 5px 0px 5px'
                        }}
                >提交</Button>
            </Popconfirm>

        );
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['ControlRoomOriginalRe', 'date']),
        timeChose: state.getIn(['ControlRoomOriginalRe', 'timeChose']),
        person: state.getIn(['ControlRoomOriginalRe', 'person']),
        data: state.getIn(['ControlRoomOriginalRe', 'data']),
        tableName: state.getIn(['ControlRoomOriginalRe', 'tableName']),

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
                num:45
            }));
        }

    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);