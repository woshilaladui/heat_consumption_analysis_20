import React, {Component} from 'react';
import {Table, Input, InputNumber, message,} from 'antd';
import {limitDecimals2} from '../../../../package/Limit';

import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

class BottomForm extends Component {



    /**
     * 表格数据提交给父组件
     */
    componentDidMount() {
        //绑定ref
        // this.props.onRef(this);
    }

    /**
     * 磨工输入监听
     */

    handleChangeTextAreaTest(value, indexH, indexL) {

        const {data, updateChange} = this.props;
        let NewData = deepCopy(data)//复制一份出来
        NewData[indexH]["data"][indexL] = value.toString();
        updateChange(NewData)



    }

    /**
     * InputNumber输入监听
     */
    handleChangeInputNumber(value, indexH, indexL) {//立方 平均 合格 indexH 3 indexL(3 4) 5 6

        console.log('event')
        console.log(value)
        console.log('event')
        if(value != null){
            const {data, timeChose, updateChange, startValue, endValue} = this.props;
            let NewData = deepCopy(data)//复制一份出来
            NewData[indexH]["data"][indexL] = value.toString();
            updateChange(NewData)
        }

        // let qualify = this.state.qualify
        // const newData = this.state.Data;

        //newData[timeChose][2][index] = value;
        // weightAverage[timeChose] = null;
        //立升重合法且不为空
        // if (indexH === 3 && (indexL === 1 || indexL === 3)) {
        //
        //
        //     let tempWeight1 = parseFloat(NewData[timeChose * 3 + 2]['data'][2]);
        //     let tempWeight2 = parseFloat(NewData[timeChose * 3 + 2]['data'][3]);
        //
        //
        //     if (NewData[timeChose * 3 + 2]['data'][2] != null && NewData[timeChose * 3 + 2]['data'][3] != null) {
        //         NewData[timeChose * 3 + 2]['data'][4] = ((tempWeight1 + tempWeight2) / 2).toFixed(1).toString()
        //         updateChange(NewData)
        //         if (NewData[timeChose * 3 + 2]['data'][4] >= startValue[1] && NewData[timeChose * 3 + 2]['data'][4] <= endValue[1]) {
        //             NewData[timeChose * 3 + 2]['data'][5] = '合格'
        //             updateChange(NewData)
        //         } else {
        //             NewData[timeChose * 3 + 2]['data'][5] = '不合格'
        //             updateChange(NewData)
        //         }
        //
        //         // this.setState({
        //         //     weightAverage: weightAverage,
        //         //     Data: newData,
        //         //     qualify: qualify
        //         // })
        //     }
        // }

        // else
        //     this.setState({
        //         weightAverage: weightAverage,
        //         Data: newData,
        //         qualify: ''
        //     });

    }





    render() {

        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        /*TextArea.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { resize: "none" } : {opacity:"1", color:"black", resize: "none"}, 
        }*/

        const columns = [
            {
                title: '1',
                width: '10%',
                key: '1',
                dataIndex: '1',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 1) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 2) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            }, {
                title: '2',
                width: '11.25%',
                key: '2',
                dataIndex: '2',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 2;
                        obj.props.colSpan = 2;
                    }
                    if (index === 1) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 2) {
                        obj.props.rowSpan = 2;
                        obj.props.colSpan = 2;

                    }
                    if (index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.colSpan = 2;
                        obj.props.rowSpan = 1;
                    }
                    if (index === 5) {
                        obj.props.colSpan = 2;
                        obj.props.rowSpan = 1;
                    }
                    return obj;
                },
            }, {
                title: '3',
                width: '11.25%',
                key: '3',
                dataIndex: '3',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0 || index === 1
                        || index === 2 || index === 3
                    ) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 5) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            }, {
                title: '4',
                width: '7.5%',
                key: '4',
                dataIndex: '4',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0 || index === 2) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 1 || index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    // if (index === 4) {
                    //     obj.props.colSpan = 1;
                    // }
                    // if (index === 5) {
                    //     obj.props.colSpan = 2;
                    // }
                    return obj;
                },
            }, {
                title: '5',
                width: '15%',
                key: '5',
                dataIndex: '5',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0 || index === 2) {
                        obj.props.rowSpan = 2;
                    }
                    if (index === 1 || index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    if( index === 4 ){
                        obj.props.colSpan = 1;
                    }
                    if( index === 5 ){
                        obj.props.colSpan = 1;
                    }
                    return obj;
                },
            }, {
                title: '6',
                width: '7.5%',
                key: '6',
                dataIndex: '6'
            }, {
                title: '7',
                width: '7.5%',
                key: '7',
                dataIndex: '7'
            }, {
                title: '8',
                width: '7.5%',
                key: '8',
                dataIndex: '8'
            }, {
                title: '9',
                width: '7.5%',
                key: '9',
                dataIndex: '9',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    /*if (index === 3) {
                        obj.props.rowSpan = 3;
                        obj.props.colSpan = 2;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 5) {
                        obj.props.rowSpan = 0;
                    }*/
                    if( index === 1) {
                        obj.props.rowSpan = 5;
                        obj.props.colSpan = 2;
                    }
                    if( index > 1) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            }, {
                title: '10',
                width: '15%',
                key: '10',
                dataIndex: '10',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    /*if (index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 5) {
                        obj.props.rowSpan = 0;
                    }*/
                    if (index > 0 ) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            }
        ];


        /**限制输入数值位数的函数**start**/
        // const limitDecimals = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        /**限制输入数值位数的函数**end**/

        const {data, timeChose} = this.props;
        // console.log('bottom')
        // console.log(data)
        // console.log('bottom')
        const Data = deepCopy(data);




        const {TextArea} = Input;

        TextArea.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { resize: "none" } : {opacity:"1", color:"black", resize: "none"}, 
        }
        
        const dataSource = [
            {//handleChangeInputNumber  handleChangeTextAreaTest
                1: '生料磨工',
                2: <TextArea rows={3}
                            // value={Data[timeChose * 3]['data'][0]?Data[timeChose * 3]['data'][0]:""}
                             value={Data[11+timeChose * 15]['data'][0]?Data[11+timeChose * 15]['data'][0]:""}
                             onChange={event => this.handleChangeTextAreaTest(event.target.value, 11+timeChose * 15, 0)}
                             /*style={{
                                 resize: "none"
                             }}*/
                />,
                4: '磨煤工',
                5: <TextArea rows={3}
                     //        value={""}
                             value={Data[11+timeChose * 15]['data'][1]}
                             onChange={event => this.handleChangeTextAreaTest(event.target.value, 11+timeChose * 15, 1)}
                    // onChange={event => this.handleChangeTextAreaTest(event.target.value, timeChose * 3, 1)}
                             /*style={{
                                 resize: "none"
                             }}*/
                />,
                6: '项目',
                7: '水分',
                8: '粒度',
                9: '水筛修正系数C',
                10: <InputNumber
                    value={Data[11+timeChose * 15]['data'][2]}
             //       value={""}
                    step={0.1}
                    min={0}
                    max={100}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 11+timeChose * 15, 2)}/>
            }, {
                6: '石灰石',
                7: <InputNumber
               //     value={""}
                    value={Data[11+timeChose * 15]['data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 11+timeChose * 15, 3)}/>,
                8: <InputNumber
                //    value={""}
                    value={Data[11+timeChose * 15]['data'][4]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 11+timeChose * 15, 4)}/>,
                /*9: '煤筛',
                10: <InputNumber
                //    value={""}
                    value={Data[timeChose * 3]['data'][5]}
                    step={0.1}
                    min={0}
                    max={100}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event.target.value, timeChose * 3, 5)}/>*/
                9: <span>
                    备注：
                    <TextArea
                       value={Data[11+timeChose * 15]['data'][5]} rows={11}
                  //      value={'备注：'}
                        onChange={event => this.handleChangeTextAreaTest(event.target.value, 11+timeChose * 15, 5)}
                        /*style={{
                            resize: "none"
                        }}*/
                    />
                    </span>
            }, {
                1: '生料班长',
                2: <TextArea rows={3}
                  //           value={""}
                             value={Data[12+timeChose * 15]['data'][0]}
                             onChange={event => this.handleChangeTextAreaTest(event.target.value, 12+timeChose * 15, 0)}
                             /*style={{
                                 resize: "none"
                             }}*/
                />,
                4: '磨煤班长',
                5: <TextArea rows={3}
                    //         value={""}
                             value={Data[12+timeChose * 15]['data'][1]}
                             onChange={event => this.handleChangeTextAreaTest(event.target.value, 12+timeChose * 15, 1)}
                             /*style={{
                                 resize: "none"
                             }}*/
                />,
                6: '硅石',
                7: <InputNumber
             //       value={""}
                    value={Data[12+timeChose * 15]['data'][2]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 12+timeChose * 15, 2)}/>,
                8: <InputNumber
                 //   value={""}
                    value={Data[12+timeChose * 15]['data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 12+timeChose * 15, 3)}/>,
                /*9: '外卖',
                10: <InputNumber
                 //   value={""}
                    value={Data[12+timeChose * 15]['data'][4]}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    step={0.1}
                    onChange={event => this.handleChangeInputNumber(event.target.value, 12+timeChose * 15, 4)}/>*/
            }, {
                6: '铁粉',
                7: <InputNumber
                  //  value={""}
                    value={Data[12+timeChose * 15]['data'][5]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 12+timeChose * 15, 5)}/>,
                8: <InputNumber
                   // value={""}
                    value={Data[12+timeChose * 15]['data'][6]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 12+timeChose * 15, 6)}/>,
                /*9: <span>
                    备注：
                    <TextArea
                       value={Data[1 + timeChose * 3]['data'][7]} rows={5}
                  //      value={'备注：'}
                        onChange={event => this.handleChangeTextAreaTest(event.target.value, 1 + timeChose * 3, 7)}
                        style={{
                            resize: "none"
                        }}
                    />
                    </span>*/
            }, {
                1: '时间',
                /*2: timeChose * 8,
                3: timeChose * 8 + 7,*/
                2: <InputNumber
                    value={Data[13+timeChose * 15]['data'][0]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 13+timeChose * 15, 0)}/>,
                /*3:'',
                4: '平均',
                5: '合格',*/
                4: <InputNumber
                    value={Data[13+timeChose * 15]['data'][1]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 13+timeChose * 15, 1)}/>,
                5: <InputNumber
                    value={Data[13+timeChose * 15]['data'][2]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 13+timeChose * 15, 2)}/>,
                6: '粉煤灰',
                7: <InputNumber
                  //  value={""}
                    value={Data[13+timeChose * 15]['data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 13+timeChose * 15, 3)}/>,
                8: <InputNumber
                 //   value={""}
                    value={Data[13+timeChose * 15]['data'][4]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 13+timeChose * 15, 4)}/>
            }, {
                1: '立升重g/l',
                2: <InputNumber
                  //  value={""}
                    value={Data[14+timeChose * 15]['data'][0]?Data[14+timeChose * 15]['data'][0]:"a"}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15, 0)}/>,
                /*3: <InputNumber
                   // value={""}
                    value={Data[14+timeChose * 15]['data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15, 3)}/>,
                4: Data[14+timeChose * 15]['data'][4]? Data[14+timeChose * 15]['data'][4]:"-",
                5: Data[14+timeChose * 15]['data'][5]? Data[14+timeChose * 15]['data'][5]:'-    ',*/
                4:<InputNumber
                    value={Data[14+timeChose * 15]['data'][1]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15,1)}/>,
                5:<InputNumber
                    value={Data[14+timeChose * 15]['data'][2]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15, 2)}/>,
                6: '烟煤',
                7: <InputNumber
                  //  value={""}
                    value={Data[14+timeChose * 15]['data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15, 3)}/>,
                8: <InputNumber
                    //value={""}
                    value={Data[14+timeChose * 15]['data'][4]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 14+timeChose * 15, 4)}/>
            }
        ];

        return (
            <div className="KZSbottom">
                <Table className="KZSbottom_table" dataSource={dataSource} bordered columns={columns} pagination={false}
                       showHeader={false}/>
            </div>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        date: state.getIn(['ControlRoomOriginalRe', 'date']),
        timeChose: state.getIn(['ControlRoomOriginalRe', 'timeChose']),
        data: state.getIn(['ControlRoomOriginalRe', 'data']),
        person: state.getIn(['ControlRoomOriginalRe', 'person']),
        startValue: state.getIn(['ControlRoomOriginalRe', 'startValue']),
        endValue: state.getIn(['ControlRoomOriginalRe', 'endValue']),
        tableName: state.getIn(['ControlRoomOriginalRe', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateData({data: deepCopy(NewData)}))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(BottomForm);
