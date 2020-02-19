import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../ruYSLYGFXJL/store/actionCreators";
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
                    placeholder="备注:"
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
        date: state.getIn(['ruYSLYGFXJL', 'date']),
        timeChose: state.getIn(['ruYSLYGFXJL', 'timeChose']),
        bottomData: state.getIn(['ruYSLYGFXJL', 'bottomData']),
        person: state.getIn(['ruYSLYGFXJL', 'person']),
        t_name: state.getIn(['ruYSLYGFXJL', 't_name']),
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