import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";

const {TextArea} = Input;

class Remark extends Component {

    handleChangeTextAreaTest(value, indexH, indexL) {
        const {bottomData, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来

        NewData[0]["t_data"][0] = value.toString();
        updateChange(NewData)
    }

    render() {
        const {bottomData} = this.props;
        const Data = JSON.parse(JSON.stringify(bottomData))
        return (
            <div className='remark'>
                <span><TextArea
                    rows={3}
                    placeholder="记录情况"
                    value={Data[0]['t_data'][0]}
                    onChange={event => this.handleChangeTextAreaTest(event.target.value, 0, 0)}
                    style={{
                        resize: "none"
                    }}/>
                </span>
            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['TXSysAcRe', 'date']),
        timeChose: state.getIn(['TXSysAcRe', 'timeChose']),
        bottomData: state.getIn(['TXSysAcRe', 'bottomData']),
        person: state.getIn(['TXSysAcRe', 'person']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateBottomData(NewData))
        },
    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(Remark);