import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../TXSysAcRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const {TextArea} = Input;

class Remark extends Component {

    handleChangeTextAreaTest(value, indexH, indexL) {
        if(value != null){
            const {data, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来

            NewData[indexH]["data"][indexL] = value.toString();

            updateChange(NewData)
        }
    }

    render() {
        const {data,timeChose} = this.props;

        const Data = deepCopy(data);

        const index =  8 + timeChose*9;

        TextArea.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { resize: "none" } : {opacity:"1", color:"black", resize: "none"},
        }

        return (
            <div className='remark'>
                <span><TextArea
                    rows={3}
                    placeholder="记录情况"
                    value={Data[index]['data'][0]}
                    onChange={event => this.handleChangeTextAreaTest(event.target.value, index, 0)}
                    /*style={{
                        resize: "none"
                    }}*/
                    />
                </span>
            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['TXSysAcRe', 'date']),
        allTime:state.getIn(['TXSysAcRe', 'allTime']),
        timeChose:state.getIn(['TXSysAcRe', 'timeChose']),
        data:state.getIn(['TXSysAcRe', 'data']),
        requestFlag:state.getIn(['TXSysAcRe', 'requestFlag']),
        person:state.getIn(['TXSysAcRe', 'person']),
        tableName:state.getIn(['TXSysAcRe', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },
    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(Remark);