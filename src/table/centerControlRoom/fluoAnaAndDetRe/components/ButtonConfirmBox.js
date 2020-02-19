import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import * as actionCreators from "../../RawFAnaRaRe/store/actionCreators";
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
        date:state.getIn(['fluoAnaAndDetRe', 'date']),
        timeChose:state.getIn(['fluoAnaAndDetRe', 'timeChose']),
        upperDataFront:state.getIn(['fluoAnaAndDetRe', 'upperDataFront']),
        upperDataLast:state.getIn(['fluoAnaAndDetRe', 'upperDataLast']),
        bottomData:state.getIn(['fluoAnaAndDetRe', 'bottomData']),
        person:state.getIn(['fluoAnaAndDetRe', 'person']),
        t_name:state.getIn(['fluoAnaAndDetRe', 't_name']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        saveAllBottomToHome( tableName, date, data){//提交下表的备注部分
            dispatch(actionCreators.saveData({
                tableType:2,//提交的是下表
                tableName:tableName,
                date:date,
                data:data,
                num:3//提交下表的3行数据 3班的备注信息
            }))
        },

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmationBox);