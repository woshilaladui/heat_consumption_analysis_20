import React, { Component} from 'react';
import {Button} from 'antd';
import { Popconfirm } from 'antd';
import * as actionCreators from "../../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";

class ButtonConfirmBox extends Component{


    postAllToHome(){
        const {upperDataMiddle, saveAllUpperToHome, saveAllBottomToHome, t_name, bottomData,date} = this.props;
        const tempUpperDataMiddle = JSON.parse(JSON.stringify(upperDataMiddle))
        const tempBottomData = JSON.parse(JSON.stringify(bottomData))
        saveAllUpperToHome(t_name,date,tempUpperDataMiddle);
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
        date: state.getIn(['TXSysAcRe', 'date']),
        timeChose: state.getIn(['TXSysAcRe', 'timeChose']),
        upperData: state.getIn(['TXSysAcRe', 'upperData']),
        bottomData: state.getIn(['TXSysAcRe', 'bottomData']),
        requestFlag: state.getIn(['TXSysAcRe', 'requestFlag']),
        person: state.getIn(['TXSysAcRe', 'person']),
        t_name: state.getIn(['TXSysAcRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        saveAllUpperToHome( tableName, date, data) {//提交上表的数据
            dispatch(actionCreators.saveData({
                tableType:1,
                tableName:tableName,
                date:date,
                data:data,
                num:24//24行数据
            }))
        },
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

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmBox);