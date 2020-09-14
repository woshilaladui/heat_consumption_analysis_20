import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../RawFAnaRaRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const {TextArea} = Input;

class Remark extends Component {

    handleChangeTextAreaTest(value,indexH, indexL) {
        if(value != null){
            const {data, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来

            NewData[indexH]["data"][indexL] = value.toString();

            updateChange(NewData)
        }
    }


    render() {
        const {data,timeChose,person} = this.props;

        const Data = deepCopy(data);

        const index = 8 + timeChose*9;

        TextArea.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black", resize: "none"}, 
        }

        return (

            <div className='remark'>
                <span><TextArea
                    rows={3}
                    placeholder="备注:"
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

        date:state.getIn(['RawFAnaRaRe', 'date']),
        allTime:state.getIn(['RawFAnaRaRe', 'allTime']),
        timeChose:state.getIn(['RawFAnaRaRe', 'timeChose']),
        data:state.getIn(['RawFAnaRaRe', 'data']),
        requestFlag:state.getIn(['RawFAnaRaRe', 'requestFlag']),
        person:state.getIn(['RawFAnaRaRe', 'person']),
        tableName:state.getIn(['RawFAnaRaRe', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),

    }
};

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },

    }//end return
};


export default connect(mapStateToProps, mapDispathToProps)(Remark);