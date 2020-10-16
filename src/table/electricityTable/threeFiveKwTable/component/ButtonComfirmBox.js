import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";

import {Table} from "../../../../http/constant/Constant"

class ButtonConfirmationBox extends Component{
    

    

    cancel() {

    }

    postAllToHome(){
        const {data, saveAllToHome, tableName,date} = this.props;
        const Data = deepCopy(data)
        saveAllToHome(date,tableName, Data);

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
                > 提交</Button>
            </Popconfirm>

        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        //date: state.getIn(['threeFiveKwTable', 'date']),
        data: state.getIn(['threeFiveKwTable', 'data']),
        tableName: state.getIn(['threeFiveKwTable', 'tableName']),
        date: state.getIn(['searchTable', 'date']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        saveAllToHome(date,tableName, data){
            dispatch(actionCreators.saveData({
                tableType:Table.UPPER_TABLE,
                date:date,
                tableName:tableName,
                data:data,
                num:1
            }));
        }

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);