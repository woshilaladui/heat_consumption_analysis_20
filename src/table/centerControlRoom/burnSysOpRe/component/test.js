import React, {Component} from 'react';
import {Input, Table, Button, InputNumber, DatePicker} from 'antd';
import moment from "./BottomForm";
const {TextArea} = Input;//文本输入框

export default class Test extends Component {
    render() {
        // const renderContent = (value, row, index) => {
        //     const obj = {
        //         children: value,
        //         props: {},
        //     };
        //     if (index === 4) {
        //         obj.props.colSpan = 0;
        //     }
        //     return obj;
        // };
        //
        // const columns = [
        //     {
        //         title: 'Name',
        //         dataIndex: 'name',
        //         render: (text, row, index) => {
        //             if (index < 4) {
        //                 return <a>{text}</a>;
        //             }
        //             return {
        //                 children: <a>{text}</a>,
        //                 props: {
        //                     colSpan: 5,
        //                 },
        //             };
        //         },
        //     },
        //     {
        //         title: 'Age',
        //         dataIndex: 'age',
        //         render: renderContent,
        //     },
        //     {
        //         title: 'Home phone',
        //         colSpan: 2,
        //         dataIndex: 'tel',
        //         render: (value, row, index) => {
        //             const obj = {
        //                 children: value,
        //                 props: {},
        //             };
        //             if (index === 2) {
        //                 obj.props.rowSpan = 2;
        //             }
        //             // These two are merged into above cell
        //             if (index === 3) {
        //                 obj.props.rowSpan = 0;
        //             }
        //             if (index === 4) {
        //                 obj.props.colSpan = 0;
        //             }
        //             return obj;
        //         },
        //     },
        //     {
        //         title: 'Phone',
        //         colSpan: 0,
        //         dataIndex: 'phone',
        //         render: renderContent,
        //     },
        //     {
        //         title: 'Address',
        //         dataIndex: 'address',
        //         render: renderContent,
        //     },
        // ];
        //
        // const data = [
        //     {
        //         key: '1',
        //         name: 'John Brown',
        //         age: 32,
        //         tel: '0571-22098909',
        //         phone: 18889898989,
        //         address: 'New York No. 1 Lake Park',
        //     },
        //     {
        //         key: '2',
        //         name: 'Jim Green',
        //         tel: '0571-22098333',
        //         phone: 18889898888,
        //         age: 42,
        //         address: 'London No. 1 Lake Park',
        //     },
        //     {
        //         key: '3',
        //         name: 'Joe Black',
        //         age: 32,
        //         tel: '0575-22098909',
        //         phone: 18900010002,
        //         address: 'Sidney No. 1 Lake Park',
        //     },
        //     {
        //         key: '4',
        //         name: 'Jim Red',
        //         age: 18,
        //         tel: '0575-22098909',
        //         phone: 18900010002,
        //         address: 'London No. 2 Lake Park',
        //     },
        //     {
        //         key: '5',
        //         name: 'Jake White',
        //         age: 18,
        //         tel: '0575-22098909',
        //         phone: 18900010002,
        //         address: 'Dublin No. 2 Lake Park',
        //     },
        // ];

        const columns = [
            {
                title: '1',
                dataIndex: '1',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.rowSpan = 2;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 2;
                    }
                    if (index === 3) {//空白
                        // obj.props.rowSpan = 0;
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 10;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '2',
                dataIndex: '2',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 9;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan =  3;
                    }
                    if (index === 2) {//接班
                        //obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                      //  obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    return obj;
                },
            },
            {
                title: '3',
                dataIndex: '3',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        //obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 2;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '4',
                dataIndex: '4',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '5',
                dataIndex: '5',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 3;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 3;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '6',
                dataIndex: '6',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '7',
                dataIndex: '7',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '8',
                dataIndex: '8',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 3;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //
                    // }
                    return obj;
                },
            },
            {
                title: '9',
                dataIndex: '9',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 2;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //     obj.props.rowSpan = 1;
                    //     obj.props.colSpan = 1;
                    // }
                    return obj;
                },
            },
            {
                title: '10',
                dataIndex: '10',
                width: '10%',
                render(value, row, index) {
                    const obj = {
                        children: value,
                        props: {}
                    };
                    if (index === 0) {//备注
                        obj.props.colSpan = 0;
                    }
                    if (index === 1) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 2) {//接班
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 0;
                    }
                    if (index === 3) {//空白
                        obj.props.rowSpan = 6;
                        obj.props.colSpan = 0;
                    }
                    if (index === 4) {
                        obj.props.rowSpan = 1;
                        obj.props.colSpan = 1;
                    }
                    // if (index === 5) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 6) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 7) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 8) {
                    //     obj.props.rowSpan = 0;
                    // }
                    // if (index === 9) {//班长
                    //     obj.props.rowSpan = 1;
                    //     obj.props.colSpan = 1;
                    // }
                    return obj;
                },
            },
        ];
        const  data =[{},{},{},{},{}];
        const dataSource = [
                {
                    1: '备注',
                    2: <TextArea
                       // value={Data[8 + timeChose * 12]['data'][0]}
                        // onBlur={event => this.handleChangeTextAreaTest(event.target.value, 8+ timeChose * 12, 0,-999)}
                       // onChange={event => this.handleChangeTextAreaTest(event.target.value, 8+ timeChose * 12, 0)}
                        style={{
                            resize: "none"
                        }}/>,
                },
                {
                    2: <span>均化XX:&emsp;<InputNumber
                       // value={parseFloat(Data[8 + timeChose * 12]['data'][1])}
                     //   formatter={limitDecimals}//限制输入数值位数
                     //   parser={limitDecimals}//限制输入数值位数
                       // onChange={event => this.handleChangeInputNumber(event, 8 + timeChose * 12, 1)}
                        style={{
                            resize: "none"
                        }}/>&emsp;风机</span>,
                    5: <span>移重XX:&emsp;<InputNumber

                      //  value={parseFloat(Data[8 + timeChose * 12]['data'][2])}
                    //    formatter={limitDecimals}//限制输入数值位数

                    //    parser={limitDecimals}//限制输入数值位数
                    //    onChange={event => this.handleChangeInputNumber(event, 8 + timeChose * 12, 2)}
                        style={{
                            resize: "none"
                        }}/>&emsp;风机</span>,
                    8: 'XXXXXX（0点班  8点班  16点班）',
                    9: '点班',

                },
                {
                    1: '接班:中心风  内风  外风',//长度2
                    3: <Input
                     //   value={Data[9 + timeChose * 12]['data'][3]}
                        //onChange={event => this.handleChangeInput(event.target.value, 9 + timeChose * 12, 3)}
                    />,//长度2

                    5: <span>燃烧器:&emsp;<InputNumber
                      //  value={parseFloat(Data[9 + timeChose * 12]['data'][4])}
                      //  formatter={limitDecimals}//限制输入数值位数
                     //   parser={limitDecimals}//限制输入数值位数
                    //    onChange={event => this.handleChangeInputNumber(event, 9 + timeChose * 12, 4)}
                        style={{
                            resize: "none"
                        }}/>&emsp;位</span>,//长度3
                    8: <span>孰料仓位:&emsp;<InputNumber
                      //  value={parseFloat(Data[9 + timeChose * 12]['data'][5])}
                      //  formatter={limitDecimals}//限制输入数值位数
                     //   parser={limitDecimals}//限制输入数值位数
                     //   onChange={event => this.handleChangeInputNumber(event, 9 + timeChose * 12, 5)}
                        style={{
                            resize: "none"
                        }}/>&emsp;米</span>,//长度3
                },
                {
                    1: <TextArea
                    //    value={Data[10 + timeChose * 12]['data'][0]}
                  //      placeholder='备注'
                   //     onChange={event => this.handleChangeTextAreaTest(event.target.value, 10 + timeChose * 12, 0)}
                        style={{
                            resize: "none"
                        }}/>,
                }, {}, {}, {}, {}, {},
                {
                    1: '班长：',//长度4
                    2: <Input
                  //      value={Data[11 + timeChose * 12]['data'][0]}
                       // onChange={event => this.handleChangeInput(event.target.value, 11 + timeChose * 12, 0)}
                    />,
                    3: '操作员：',//长度4
                    4: <Input
                       // value={Data[11 + timeChose * 12]['data'][1]}
                      //  onChange={event => this.handleChangeInput(event.target.value, 11 + timeChose * 12, 1)}
                    />,
                    5: '投料时间',//长度3
                    6: <DatePicker
                      //  format='YYYY/MM/DD hh:mm:ss'
                      //  onChange={date => this.handleTimeChange(date)}
                      //  value={Data[11 + timeChose * 12]['data'][2] ? moment(Data[11 + timeChose * 12]['data'][2], 'YYYY/MM/DD hh:mm:ss') : moment(date, 'YYYY/MM/DD hh:mm:ss')}

                      //  defaultValue={moment(date, 'YYYY/MM/DD hh:mm:ss')}
                        style={{width: 200}}/>,
                    7:
                        '投料量',
                    8:
                        <span><InputNumber
                        //    value={Data[11 + timeChose * 12]['data'][3]}
                        //    formatter={limitDecimals}//限制输入数值位数
                          //  parser={limitDecimals}//限制输入数值位数
                          //  onChange={event => this.handleChangeInputNumber(event, 11 + timeChose * 12, 3)}
                            style={{
                                resize: "none"
                            }}/>/
                        <InputNumber
                       //     value={Data[11 + timeChose * 12]['data'][4]}
                        //    formatter={limitDecimals}//限制输入数值位数
                         //   parser={limitDecimals}//限制输入数值位数
                       //     onChange={event => this.handleChangeInputNumber(event, 11 + timeChose * 12, 4)}
                            style={{
                                resize: "none"
                            }}/></span>,//长度3
                    9:
                        '孰料产量',//长度4
                    10:
                        <span><InputNumber
                        //    value={Data[11 + timeChose * 12]['data'][5]}
                       //     formatter={limitDecimals}//限制输入数值位数
                        //    parser={limitDecimals}//限制输入数值位数
                     //       onChange={event => this.handleChangeInputNumber(event, 11 + timeChose * 12, 5)}
                            style={{
                                resize: "none"
                            }}/>/
                    <InputNumber
                  //      value={Data[11 + timeChose * 12]['data'][6]}
                   //     formatter={limitDecimals}//限制输入数值位数
                  //      parser={limitDecimals}//限制输入数值位数
                 //       onChange={event => this.handleChangeInputNumber(event, 11 + timeChose * 12, 6)}
                        style={{
                            resize: "none"
                        }}/></span>,

                },
            ]
        ;

        return (
            <div className="upper">
                {/*表格填写*/}
                <Table
                    className="pper_table" columns={columns} bordered
                    dataSource={data} showHeader={true} pagination={false}
                />

            </div>
        );
    }
}