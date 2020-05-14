import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import * as actionCreators from "../../RawFAnaRaRe/store/actionCreators";
import {connect} from "react-redux";
import {Table} from "../../../../http/constant/Constant";
import {deepCopy} from "../../../../Helper/Copy";

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
                    //onClick={() => alert('aa')}
                > 提交</Button>
            </Popconfirm>

        );
    }
}
//定义映射
const mapStateToProps = (state) => {
    return {

        date:state.getIn(['RawFAnaRaRe', 'date']),
        allTime:state.getIn(['RawFAnaRaRe', 'allTime']),
        timeChose:state.getIn(['RawFAnaRaRe', 'timeChose']),
        data:state.getIn(['RawFAnaRaRe', 'data']),
        requestFlag:state.getIn(['RawFAnaRaRe', 'requestFlag']),
        person:state.getIn(['RawFAnaRaRe', 'person']),
        tableName:state.getIn(['RawFAnaRaRe', 'tableName']),


    }
};

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
};

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);