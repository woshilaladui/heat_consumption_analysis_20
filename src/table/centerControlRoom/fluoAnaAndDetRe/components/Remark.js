import React, {Component} from 'react';
import {Input} from 'antd';
import * as actionCreators from "../../fluoAnaAndDetRe/store/actionCreators";
import {connect} from "react-redux";

const {TextArea} = Input;

class Remark extends Component {

    handleChangeTextAreaTest(value) {
        const {bottomData, updateChange,timeChose} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来

        NewData[timeChose]["t_data"][0] = value.toString();//每个班都有一个备注
        updateChange(NewData)
    }


    render() {
        const {bottomData,timeChose} = this.props;
        const Data = JSON.parse(JSON.stringify(bottomData))
        return (

            <div className='remark'>
                <span><TextArea
                    rows={3}
                    placeholder="备注:"
                    value={Data[timeChose]['t_data'][0]}
                    onChange={event => this.handleChangeTextAreaTest(event.target.value)}
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
        date: state.getIn(['fluoAnaAndDetRe', 'date']),
        timeChose: state.getIn(['fluoAnaAndDetRe', 'timeChose']),
        bottomData: state.getIn(['fluoAnaAndDetRe', 'bottomData']),
        person: state.getIn(['fluoAnaAndDetRe', 'person']),
        t_name: state.getIn(['fluoAnaAndDetRe', 't_name']),
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