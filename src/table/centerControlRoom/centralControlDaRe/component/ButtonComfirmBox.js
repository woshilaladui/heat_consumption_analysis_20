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
        const Data = deepCopy(data);
        saveAllToHome(date,tableName, Data);

    }
    test(){
        alert('test')
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
                        //onClick={() => alert('aa')}
                > 提交</Button>
            </Popconfirm>

        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['centralControlDaRe', 'date']),
        timeChose: state.getIn(['centralControlDaRe', 'timeChose']),
        data: state.getIn(['centralControlDaRe', 'data']),
        tableName: state.getIn(['centralControlDaRe', 'tableName']),

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
                num:33
            }));
        }

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);