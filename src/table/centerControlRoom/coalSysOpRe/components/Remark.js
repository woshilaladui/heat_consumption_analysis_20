import React, {Component} from 'react';
import { Input,Row, Col } from 'antd';
import {connect} from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {deepCopy} from "../../../../Helper/Copy";
class Remark extends Component{
    handleInputChange(value,indexH,indexL){

        if(value != null){
            const {data, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来

            NewData[indexH]["data"][indexL] = value.toString();

            updateChange(NewData)
        }

    }

    render(){
        const titleArr = ["夜班","白班","中班"]//0 1 2
        const {data,timeChose,person} = this.props;

        const Data = deepCopy(data);
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
                                onChange={event => {this.handleInputChange(event.target.value,8+timeChose*9,0)}}
                                value={Data[8+timeChose*9]['data'][0]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={5}><label>原煤仓累计量:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,8+timeChose*9,1)}}
                                value={Data[8+timeChose*9]['data'][1]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={4}><label>头煤仓重:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,8+timeChose*9,2)}}
                                value={Data[8+timeChose*9]['data'][2]}
                                type = "text"
                                style={{width:'80px'}}
                            /></Col>
                            <Col span={4}><label>尾煤仓重:</label><Input
                                onChange={event => {this.handleInputChange(event.target.value,8+timeChose*9,3)}}
                                value={Data[8+timeChose*9]['data'][3]}
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
        date:state.getIn(['coalSysOpRe', 'date']),
        allTime:state.getIn(['coalSysOpRe', 'allTime']),
        timeChose:state.getIn(['coalSysOpRe', 'timeChose']),
        data:state.getIn(['coalSysOpRe', 'data']),
        requestFlag:state.getIn(['coalSysOpRe', 'requestFlag']),
        person:state.getIn(['coalSysOpRe', 'person']),
        tableName:state.getIn(['coalSysOpRe', 'tableName']),
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