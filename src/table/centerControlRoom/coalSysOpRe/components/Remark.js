import React, {Component} from 'react';
import { Input,Row, Col } from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";
class Remark extends Component{
    handleInputChange(value,indexH,indexL){
        const {bottomData,updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来

        NewData[indexH]["t_data"][indexL] = value.toString();
        updateChange(NewData)
    }
    render(){
        const titleArr = ["夜班","白班","中班"]//0 1 2
        const { person,timeChose,bottomData} = this.props;
        const Data = JSON.parse(JSON.stringify(bottomData))//下表的数据
        return(
            <div className = 'remark' style ={{width: "100%", height:72}}>
                <div className = 'title'
                    style = {{float:"left",borderRight:"1px solid black",width:"5.5%",textAlign:"center",height:72,paddingTop:20}}
                >备注</div>
                <div className = 'content'
                    style = {{width:"90%"}}
                >
                    <span>{titleArr[timeChose]}</span>
                    <div>
                        <Row type="flex" justify="space-between">
                            <Col span={4}><label>原煤仓重:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,timeChose,0)}}
                                value={Data[timeChose]['t_data'][0]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={5}><label>原煤仓累计量:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,timeChose,1)}}
                                value={Data[timeChose]['t_data'][1]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={4}><label>头煤仓重:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,timeChose,2)}}
                                value={Data[timeChose]['t_data'][2]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={4}><label>尾煤仓重:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,timeChose,3)}}
                                value={Data[timeChose]['t_data'][3]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                        </Row>
                    </div>,
                    <span>当班人:{person}</span>
                </div>

            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['coalSysOpRe', 'date']),
        timeChose: state.getIn(['coalSysOpRe', 'timeChose']),
        bottomData: state.getIn(['coalSysOpRe', 'bottomData']),
        person: state.getIn(['coalSysOpRe', 'person']),
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