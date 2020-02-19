import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";

class ButtonConfirmationBox extends Component{


    postAllToHome(){
        const { saveAllBottomToHome, t_name, bottomData,date} = this.props;
        const tempBottomData = JSON.parse(JSON.stringify(bottomData))
        saveAllBottomToHome(t_name,date,tempBottomData);
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
        date:state.getIn(['onlineAutoDetOpRe', 'date']),
        timeChose:state.getIn(['onlineAutoDetOpRe', 'timeChose']),
        upperDataFront:state.getIn(['onlineAutoDetOpRe', 'upperDataFront']),
        upperDataLast:state.getIn(['onlineAutoDetOpRe', 'upperDataLast']),
        bottomData:state.getIn(['onlineAutoDetOpRe', 'bottomData']),
        person:state.getIn(['onlineAutoDetOpRe', 'person']),
        t_name:state.getIn(['onlineAutoDetOpRe', 't_name']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        saveAllBottomToHome( tableName, date, data){
            dispatch(actionCreators.saveData({
                tableType:2,
                tableName:tableName,
                date:date,
                data:data,
                num:1//提交下表的1行数据
            }))
        },

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);