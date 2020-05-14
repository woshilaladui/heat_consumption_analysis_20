import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../ruYSLYGFXJL/store/actionCreators";
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

        const index = timeChose;

        return (

            <div className='remark'>
                <span><TextArea
                    rows={3}
                    placeholder="备注:"
                    value={Data[index]['data'][0]}
                    onChange={event => this.handleChangeTextAreaTest(event.target.value, index, 0)}
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

        date:state.getIn(['ruYSLYGFXJL', 'date']),
        allTime:state.getIn(['ruYSLYGFXJL', 'allTime']),
        timeChose:state.getIn(['ruYSLYGFXJL', 'timeChose']),
        data:state.getIn(['ruYSLYGFXJL', 'data']),
        requestFlag:state.getIn(['ruYSLYGFXJL', 'requestFlag']),
        person:state.getIn(['ruYSLYGFXJL', 'person']),
        tableName:state.getIn(['ruYSLYGFXJL', 'tableName']),

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