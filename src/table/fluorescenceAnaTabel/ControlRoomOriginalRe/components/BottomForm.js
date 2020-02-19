import React, {Component} from 'react';
import {Table, Input, InputNumber, message,} from 'antd';
import {limitDecimals2} from '../../../../package/Limit';

import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";

class BottomForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // Data: [[[], [], [], [], ''], [[], [], [], [], ''], [[], [], [], [], '']],
    //         weightAverage: [],//平均立升重
    //         qualify: '',
    //     }
    // }

    /**
     * 表格数据初始化
     */
    /**初始化**/
    // componentWillMount() {
    //     if (this.props.bottomData)
    //         this.setState({
    //             Data: this.props.bottomData,
    //             timeChose: this.props.timeChose,
    //             startValue: this.props.startValue,
    //             endValue: this.props.endValue
    //         });
    //     else
    //         this.setState({
    //             timeChose: this.props.timeChose,
    //             startValue: this.props.startValue,
    //             endValue: this.props.endValue
    //         });
    // }


    // /**更新props**/
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.bottomData)
    //         this.setState({
    //             Data: nextProps.bottomData,
    //             timeChose: nextProps.timeChose,
    //             startValue: nextProps.startValue,
    //             endValue: nextProps.endValue
    //         });
    //     else
    //         this.setState({
    //             timeChose: nextProps.timeChose,
    //             startValue: nextProps.startValue,
    //             endValue: nextProps.endValue
    //         });
    // }


    // postToHome() {
    //     const t_data = JSON.stringify(this.state.Data[this.state.timeChose]);
    //     const jsonData = {
    //         "data": [
    //             {
    //                 "date": this.props.date,
    //                 "hour": this.state.timeChose,
    //                 "t_department": 1,
    //                 "t_section": 2,
    //                 "t_name": "CRO",
    //                 "t_type": 2,
    //                 "t_data": t_data,
    //             }
    //         ]
    //     };
    //     fetch("/api/HuaYS/save", {
    //         method: 'POST',
    //         body: JSON.stringify(jsonData), // data can be `string` or {object}!
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': window.localStorage.authorization,
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data['code'] === 0) {
    //                 message.info('提交成功');
    //             }
    //         })
    //         .catch(error => console.error('Error:', error))
    // }


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
    handleInputChange1(event, index) {
        const newData = this.state.Data;
        newData[this.state.timeChose][0][index] = event.target.value;
        this.setState({
            Data: newData
        });
    }

    handleChangeTextAreaTest(value, indexH, indexL) {
        const {bottomData, timeChose, updateChange} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来
        let hour = indexH + timeChose * 8;
        NewData[hour]["t_data"][indexL] = value.toString();
        updateChange(NewData)
    }

    /**
     * InputNumber输入监听
     */
    handleChangeInputNumber(value, indexH, indexL) {//立方 平均 合格 indexH 3 indexL(3 4) 5 6
        const {bottomData, timeChose, updateChange, startValue, endValue} = this.props;
        let NewData = JSON.parse(JSON.stringify(bottomData))//复制一份出来
        let index = indexH + timeChose * 3;
       // alert(value)

        NewData[index]["t_data"][indexL] = value.toString();
        updateChange(NewData)


        // let qualify = this.state.qualify
        // const newData = this.state.Data;

        //newData[timeChose][2][index] = value;
        // weightAverage[timeChose] = null;
        //立升重合法且不为空
        if (indexH === 2 && (indexL === 2 || indexL === 3)) {


            let tempWeight1 = parseFloat(NewData[timeChose * 3 + 2]['t_data'][2]);
            let tempWeight2 = parseFloat(NewData[timeChose * 3 + 2]['t_data'][3]);


            if (NewData[timeChose * 3 + 2]['t_data'][2] != null && NewData[timeChose * 3 + 2]['t_data'][3] != null) {
                NewData[timeChose * 3 + 2]['t_data'][4] = ((tempWeight1 + tempWeight2) / 2).toFixed(1).toString()
                updateChange(NewData)
                if (NewData[timeChose * 3 + 2]['t_data'][4] >= startValue[1] && NewData[timeChose * 3 + 2]['t_data'][4] <= endValue[1]) {
                    NewData[timeChose * 3 + 2]['t_data'][5] = '合格'
                    updateChange(NewData)
                } else {
                    NewData[timeChose * 3 + 2]['t_data'][5] = '不合格'
                    updateChange(NewData)
                }

                // this.setState({
                //     weightAverage: weightAverage,
                //     Data: newData,
                //     qualify: qualify
                // })
            }
        }

        // else
        //     this.setState({
        //         weightAverage: weightAverage,
        //         Data: newData,
        //         qualify: ''
        //     });

    }


    // /**
    //  *材料输入监听
    //  */
    // handleInputChange2(event, index) {
    //     const newData = this.state.Data;
    //     newData[this.state.timeChose][1][index] = event;
    //     this.setState({
    //         Data: newData
    //     });
    // }

    /**
     * 立升重输入监听
     */
    // handleInputChange3(event, index) {
    //     const {startValue, endValue, timeChose, bottomData} = this.props
    //     let qualify = this.state.qualify
    //     const newData = this.state.Data;
    //
    //     newData[timeChose][2][index] = event;
    //     weightAverage[timeChose] = null;
    //     //立升重合法且不为空
    //     if (!isNaN(newData[timeChose][2][0]) && !isNaN(newData[timeChose][2][1])
    //         && newData[timeChose][2][0] != null && newData[timeChose][2][1] != null) {
    //         weightAverage[timeChose] = ((newData[timeChose][2][0] + newData[timeChose][2][1]) / 2).toFixed(1);
    //         if (weightAverage[timeChose] >= startValue[1] && weightAverage[timeChose] <= endValue[1])
    //             qualify = '合格'
    //         else
    //             qualify = '不合格'
    //         this.setState({
    //             weightAverage: weightAverage,
    //             Data: newData,
    //             qualify: qualify
    //         })
    //     } else
    //         this.setState({
    //             weightAverage: weightAverage,
    //             Data: newData,
    //             qualify: ''
    //         });

    // newData[timeChose][2][index] = event;
    // weightAverage[timeChose] = null;
    // //立升重合法且不为空
    // if (!isNaN(newData[timeChose][2][0]) && !isNaN(newData[timeChose][2][1])
    //     && newData[timeChose][2][0] != null && newData[timeChose][2][1] != null) {
    //     weightAverage[timeChose] = ((newData[timeChose][2][0] + newData[timeChose][2][1]) / 2).toFixed(1);
    //     if (weightAverage[timeChose] >= startValue[1] && weightAverage[timeChose] <= endValue[1])
    //         qualify = '合格'
    //     else
    //         qualify = '不合格'
    //     this.setState({
    //         weightAverage: weightAverage,
    //         Data: newData,
    //         qualify: qualify
    //     })
    // }
    // else
    //     this.setState({
    //         weightAverage: weightAverage,
    //         Data: newData,
    //         qualify: ''
    //     });
    //}

    /**
     *右边三格的输入监听
     */
    handleInputChange4(event, index) {
        const newData = this.state.Data;
        newData[this.state.timeChose][3][index] = event;
        this.setState({
            Data: newData
        });
    }

    /**
     *备注输入监听
     */
    handleInputChange5(event) {
        let newData = this.state.Data;
        newData[this.state.timeChose][4] = event.target.value;
        this.setState({
            Data: newData
        });
    }

    render() {
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
                    if (index === 3) {
                        obj.props.rowSpan = 3;
                        obj.props.colSpan = 2;
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
                title: '10',
                width: '15%',
                key: '10',
                dataIndex: '10',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 3) {
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
        const {bottomData, timeChose, date} = this.props;
        const Data = JSON.parse(JSON.stringify(bottomData))





        const {TextArea} = Input;
        const dataSource = [
            {//handleChangeInputNumber  handleChangeTextAreaTest
                1: '生料磨工',
                2: <TextArea rows={3}
                            // value={Data[timeChose * 3]['t_data'][0]?Data[timeChose * 3]['t_data'][0]:""}
                             defaultValue={Data[timeChose * 3]['t_data'][0]?Data[timeChose * 3]['t_data'][0]:""}
                             onBlur={event => this.handleChangeTextAreaTest(event.target.value, timeChose * 3, 0)}
                             style={{
                                 resize: "none"
                             }}
                />,
                4: '磨煤工',
                5: <TextArea rows={3}
                     //        defaultValue={""}
                             defaultValue={Data[timeChose * 3]['t_data'][1]}
                             onBlur={event => this.handleChangeTextAreaTest(event.target.value, timeChose * 3, 1)}
                    // onChange={event => this.handleChangeTextAreaTest(event.target.value, timeChose * 3, 1)}
                             style={{
                                 resize: "none"
                             }}
                />,
                6: '项目',
                7: '水分',
                8: '粒度',
                9: '水筛修正系数C',
                10: <InputNumber
                    defaultValue={Data[timeChose * 3]['t_data'][2]}
             //       defaultValue={""}
                    step={0.1}
                    min={0}
                    max={100}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, timeChose * 3, 2)}/>
            }, {
                6: '石灰石',
                7: <InputNumber
               //     defaultValue={""}
                    defaultValue={Data[timeChose * 3]['t_data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, timeChose * 3, 3)}/>,
                8: <InputNumber
                //    defaultValue={""}
                    defaultValue={Data[timeChose * 3]['t_data'][4]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, timeChose * 3, 4)}/>,
                9: '煤筛',
                10: <InputNumber
                //    defaultValue={""}
                    defaultValue={Data[timeChose * 3]['t_data'][5]}
                    step={0.1}
                    min={0}
                    max={100}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, timeChose * 3, 5)}/>
            }, {
                1: '生料班长',
                2: <TextArea rows={3}
                  //           defaultValue={""}
                             defaultValue={Data[1 + timeChose * 3]['t_data'][0]}
                             onBlur={event => this.handleChangeTextAreaTest(event.target.value, 1 + timeChose * 3, 0)}
                             style={{
                                 resize: "none"
                             }}
                />,
                4: '磨煤班长',
                5: <TextArea rows={3}
                    //         defaultValue={""}
                             defaultValue={Data[1 + timeChose * 3]['t_data'][1]}
                             onBlur={event => this.handleChangeTextAreaTest(event.target.value, 1 + timeChose * 3, 1)}
                             style={{
                                 resize: "none"
                             }}
                />,
                6: '硅石',
                7: <InputNumber
             //       defaultValue={""}
                    defaultValue={Data[1 + timeChose * 3]['t_data'][2]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 1 + timeChose * 3, 2)}/>,
                8: <InputNumber
                 //   defaultValue={""}
                    defaultValue={Data[1 + timeChose * 3]['t_data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 1 + timeChose * 3, 3)}/>,
                9: '外卖',
                10: <InputNumber
                 //   defaultValue={""}
                    defaultValue={Data[1 + timeChose * 3]['t_data'][4]}
                    style={{width: 'auto'}}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    step={0.1}
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 1 + timeChose * 3, 4)}/>
            }, {
                6: '铁粉',
                7: <InputNumber
                  //  defaultValue={""}
                    defaultValue={Data[1 + timeChose * 3]['t_data'][5]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 1 + timeChose * 3, 5)}/>,
                8: <InputNumber
                   // defaultValue={""}
                    defaultValue={Data[1 + timeChose * 3]['t_data'][6]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 1 + timeChose * 3, 6)}/>,
                9: <span>
                    备注：
                    <TextArea
                       defaultValue={Data[1 + timeChose * 3]['t_data'][7]} rows={5}
                  //      defaultValue={'备注：'}
                        onBlur={event => this.handleChangeTextAreaTest(event.target.value, 1 + timeChose * 3, 7)}
                        style={{
                            resize: "none"
                        }}
                    />
                    </span>
            }, {
                1: '时间',
                2: timeChose * 8,
                3: timeChose * 8 + 7,
                4: '平均',
                5: '合格',
                6: '粉煤灰',
                7: <InputNumber
                  //  defaultValue={""}
                    defaultValue={Data[2 + timeChose * 3]['t_data'][0]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 2 + timeChose * 3, 0)}/>,
                8: <InputNumber
                 //   defaultValue={""}
                    defaultValue={Data[2 + timeChose * 3]['t_data'][1]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 2 + timeChose * 3, 1)}/>
            }, {
                1: '立升重g/l',
                2: <InputNumber
                  //  defaultValue={""}
                    value={Data[2 + timeChose * 3]['t_data'][2]?Data[2 + timeChose * 3]['t_data'][2]:"a"}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 2 + timeChose * 3, 2)}/>,
                3: <InputNumber
                   // defaultValue={""}
                    value={Data[2 + timeChose * 3]['t_data'][3]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onChange={event => this.handleChangeInputNumber(event, 2 + timeChose * 3, 3)}/>,
                4: Data[2 + timeChose * 3]['t_data'][4]? Data[2 + timeChose * 3]['t_data'][4]:"-",
                5: Data[2 + timeChose * 3]['t_data'][5]? Data[2 + timeChose * 3]['t_data'][5]:'-    ',
                6: '烟煤',
                7: <InputNumber
                  //  defaultValue={""}
                    defaultValue={Data[2 + timeChose * 3]['t_data'][6]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 2 + timeChose * 3, 6)}/>,
                8: <InputNumber
                    //defaultValue={""}
                    defaultValue={Data[2 + timeChose * 3]['t_data'][7]}
                    formatter={limitDecimals2}//限制输入数值位数
                    parser={limitDecimals2}//限制输入数值位数
                    onBlur={event => this.handleChangeInputNumber(event.target.value, 2 + timeChose * 3, 7)}/>
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
        bottomData: state.getIn(['ControlRoomOriginalRe', 'bottomData']),
        person: state.getIn(['ControlRoomOriginalRe', 'person']),
        startValue: state.getIn(['ControlRoomOriginalRe', 'startValue']),
        endValue: state.getIn(['ControlRoomOriginalRe', 'endValue']),
        t_name: state.getIn(['ControlRoomOriginalRe', 't_name']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        updateChange(NewData) {
            dispatch(actionCreators.updateBottomData(NewData))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(BottomForm);
