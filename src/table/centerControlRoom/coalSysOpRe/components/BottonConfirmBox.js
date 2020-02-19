import React, {Component} from 'react';
import {Button} from 'antd';
import {Popconfirm} from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";

class ButtonConfirmBox extends Component {

    cancel() {
    }

    postAllToHome() {
        const {upperData, saveAllUpperToHome, saveAllBottomToHome, t_name, bottomData, date} = this.props;
        const tempUpperData = JSON.parse(JSON.stringify(upperData))
        const tempBottomData = JSON.parse(JSON.stringify(bottomData))
        saveAllUpperToHome(t_name, date, tempUpperData);
        saveAllBottomToHome(t_name, date, tempBottomData);
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
        date: state.getIn(['coalSysOpRe', 'date']),
        timeChose: state.getIn(['coalSysOpRe', 'timeChose']),
        bottomData: state.getIn(['coalSysOpRe', 'bottomData']),
        person: state.getIn(['coalSysOpRe', 'person']),
        upperData: state.getIn(['coalSysOpRe', 'upperData']),
        t_name: state.getIn(['coalSysOpRe', 't_name']),

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateBottomData(NewData))
        },
        saveAllUpperToHome(tableName, date, data) {//提交上表的数据
            dispatch(actionCreators.saveData({
                tableType: 1,
                tableName: tableName,
                date: date,
                data: data,
                num: 24//24行数据
            }))
        },
        saveAllBottomToHome(tableName, date, data) {
            dispatch(actionCreators.saveData({
                tableType: 2,
                tableName: tableName,
                date: date,
                data: data,
                num: 3//提交下表的3行数据
            }))
        },

    }//end return
}

export default connect(mapStateToProps, mapDispathToProps)(ButtonConfirmBox);