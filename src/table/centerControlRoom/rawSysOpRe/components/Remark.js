import React, {Component} from 'react';
import {Input, Row, Col} from 'antd';
import * as actionCreators from "../../rawSysOpRe/store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

class Remark extends Component {
    handleInputChange(value, indexH, indexL) {
        if(value != null){
            const {data, updateChange} = this.props;
            let NewData = deepCopy(data)//复制一份出来

            NewData[indexH]["data"][indexL] = value.toString();

            updateChange(NewData)
        }
    }

    render() {
        const titleArr = ["夜班", "白班", "中班"]
        const {data,timeChose,person} = this.props;

        const Data = deepCopy(data);

        const index = 8 + timeChose*9;

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { width: "80px" } : {opacity:"1", color:"black", width: "80px"},
        }

        return (
            <div className='remark' style={{width: "100%", height: 160}}>
                <div className='title'
                     style={{
                         float: "left",
                         borderRight: "1px solid black",
                         width: "5.5%",
                         textAlign: "center",
                         height: 160,
                         paddingTop: 50
                     }}
                >备注
                </div>
                <div className='content'
                     style={{width: "90%"}}
                >
                    <span>{titleArr[timeChose]}</span>
                    <div>
                        <Row type="flex" justify="space-between">
                            <Col span={6}>
                                <label>石灰石称累计:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,0)}}
                                    value={Data[index]['data'][0]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>砂岩称累计:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,1)}}
                                    value={Data[index]['data'][1]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>铁粉称累计:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,2)}}
                                    value={Data[index]['data'][2]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>粉煤灰称累计:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,3)}}
                                    value={Data[index]['data'][3]}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{margin: "3px 0"}}>
                        <Row type="flex" justify="start">
                            <Col span={6}>
                                <label>总累计:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,4)}}
                                    Value={Data[index]['data'][0]+Data[index]['data'][1]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>均化库库位:</label>
                                <Input
                                    type="text"
                                    /*style={{width: '80px'}}*/
                                    onChange={event => {this.handleInputChange(event.target.value,index,5)}}
                                    value={Data[index]['data'][5]}
                                />
                            </Col>
                        </Row>
                    </div>
                    <span>当班人:{person}</span>
                </div>

            </div>
        )
    }
}

//定义映射
const mapStateToProps = (state) => {
    return {

        date:state.getIn(['rawSysOpRe', 'date']),
        allTime:state.getIn(['rawSysOpRe', 'allTime']),
        timeChose:state.getIn(['rawSysOpRe', 'timeChose']),
        data:state.getIn(['rawSysOpRe', 'data']),
        requestFlag:state.getIn(['rawSysOpRe', 'requestFlag']),
        person:state.getIn(['rawSysOpRe', 'person']),
        tableName:state.getIn(['rawSysOpRe', 'tableName']),
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