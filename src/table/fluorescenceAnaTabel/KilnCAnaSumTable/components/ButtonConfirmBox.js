import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';

import * as actionCreators from "../../KilnCAnaSumTable/store/actionCreators";
import {connect} from "react-redux";
import {Table} from "../../../../http/constant/Constant";
import {deepCopy} from "../../../../Helper/Copy";

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

        date:state.getIn(['KilnCAnaSumTable', 'date']),
        allTime:state.getIn(['KilnCAnaSumTable', 'allTime']),
        timeChose:state.getIn(['KilnCAnaSumTable', 'timeChose']),
        data:state.getIn(['KilnCAnaSumTable', 'data']),
        requestFlag:state.getIn(['KilnCAnaSumTable', 'requestFlag']),
        person:state.getIn(['KilnCAnaSumTable', 'person']),
        tableName:state.getIn(['KilnCAnaSumTable', 'tableName']),


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
                num:30
            }));
        }

    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);