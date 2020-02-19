import React, {Component} from 'react';
import {Input, Row, Col} from 'antd';
import * as actionCreators from "../../rawSysOpRe/store/actionCreators";
import {connect} from "react-redux";

class Remark extends Component {
    handleInputChange(value, indexH, indexL) {
        const {bottomData, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来

        NewData[indexH]["t_data"][indexL] = value.toString();
        updateChange(NewData)
    }

    render() {
        const titleArr = ["夜班", "白班", "中班"]
        const {person, timeChose, bottomData} = this.props;
        const Data = JSON.parse(JSON.stringify(bottomData))//下表的数据
        const index = timeChose * 2;
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
                                <label>原煤仓重:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index,0)}}
                                    value={Data[index]['t_data'][0]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>原煤仓累计量:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index,1)}}
                                    value={Data[index]['t_data'][1]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>头煤仓重:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index,2)}}
                                    value={Data[index]['t_data'][2]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>尾煤仓重:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index,3)}}
                                    value={Data[index]['t_data'][3]}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div style={{margin: "3px 0"}}>
                        <Row type="flex" justify="start">
                            <Col span={6}>
                                <label>原煤仓重:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index+1,0)}}
                                    value={Data[index+1]['t_data'][0]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>原煤仓累计量:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index+1,1)}}
                                    value={Data[index+1]['t_data'][1]}
                                />
                            </Col>
                            <Col span={6}>
                                <label>头煤仓重:</label>
                                <Input
                                    type="text"
                                    style={{width: '80px'}}
                                    onChange={event => {this.handleInputChange(event.target.value,index+1,2)}}
                                    value={Data[index+1]['t_data'][2]}
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
        date: state.getIn(['rawSysOpRe', 'date']),
        timeChose: state.getIn(['rawSysOpRe', 'timeChose']),
        bottomData: state.getIn(['rawSysOpRe', 'bottomData']),
        person: state.getIn(['rawSysOpRe', 'person']),
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