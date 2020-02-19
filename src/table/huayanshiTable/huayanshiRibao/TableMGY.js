import React from 'react';
import {Table, Input, Button, message,Popconfirm} from 'antd';

//化验室日报--煤工业
export default class TableMGY extends React.Component {
render() {
    const timec = ['Wy', 'Wf', 'Vf', 'Af', 'C', '分析基', '收到基', 'S', '产品合格率'];//煤工业
    const columnsc = [
        {
            title: '煤工业数据',
            key: 'timec',
            dataIndex: 'timec',

            children: [
                {
                    title: '厂家',
                    dataIndex:
                        'changjia',
                    key: 'changjia',
                    // width: 120,
                    // sorter: (a, b)=> a.age - b.age,
                },
            ],

        },
        {
            title: '神木',
            //colSpan:2,
            dataIndex: 'shenmu',
            // render: (value,row, index) => {
            //     const obj = {
            //       children:value,
            //       props: {},
            //     };
            //     if (index === 0) {
            //obj.props.colSpan = 2;
            //     }
            //     return obj;
            // },
            children: [
                {
                    title: '厂家1',
                    dataIndex:
                        'changjia1',
                    key: 'changjia1',
                    // //width: 100,
                    children: [
                        {
                            title: '平均值',
                            dataIndex:
                                'pingjunzhi1',
                            key:
                                'pingjunzhi1',
                            // width: 100,
                        },
                        {
                            title: '合格率',
                            dataIndex:
                                'hegelv1',
                            key:
                                'hegelv1',
                            // width: 100,
                        },
                    ],
                },
            ],
        },
        {
            title: '煤粉',
            //colSpan:2,
            dataIndex: 'meifen',
            // render: (value,row, index) => {
            //     const obj = {
            //       children:value,
            //       props: {},
            //     };
            //     if (index === 0) {
            //obj.props.colSpan = 2;
            //     }
            //     return obj;
            // },
            children: [
                {
                    title: '厂家2',
                    dataIndex:
                        'changjia2',
                    key: 'changjia2',
                    // //width: 100,
                    children: [
                        {
                            title: '平均值',
                            dataIndex:
                                'pingjunzhi2',
                            key:
                                'pingjunzhi2',
                            // width: 100,
                        },
                        {
                            title: '合格率',
                            dataIndex:
                                'hegelv2',
                            key:
                                'hegelv2',
                            // width: 100,
                        },
                    ],
                },
            ],
        },
// {
//     title:'',
//     colSpan:0,
//dataIndex:'hegelv1',
//     //     width:"6%"
        // },
        //
        //     title:'煤粉',
        //     colSpan:2,
        //     dataIndex:'煤粉',
        //     render: (value,row, index) => {
        //         const obj = {
        //             children:value,
        //             props: {},
        //         };
        //         if (index === 0) {
        //obj.props.colSpan = 2;
        //         }
        //
        //
        //
        //         return obj;
        //     },
        // },
        {
            title: '煤矸石',
            //colSpan:2,
            dataIndex:
                'meiganshi',
            // render: (value,row, index) => {
            //     const obj = {
            //       children:value,
            //       props: {},
            //     };
            //     if (index === 0) {
            //obj.props.colSpan = 2;
            //     }
            //     return obj;
            // },
            children: [
                {
                    title: '厂家3',
                    dataIndex:
                        'changjia3',
                    key: 'changjia3',
                    // //width: 100,
                    children: [
                        {
                            title: '平均值',
                            dataIndex:
                                'pingjunzhi3',
                            key:
                                'pingjunzhi3',
                            // width: 100,
                        },
                        {
                            title: '合格率',
                            dataIndex:
                                'hegelv3',
                            key:
                                'hegelv3',
                            // width: 100,
                        },
                    ],
                },
            ],
        },
// {
//     title:'',
//     colSpan:0,
//dataIndex:'hegelv2',
//     //     width:"6%"
        // }, {
        //     title:'煤矸石',
        //     colSpan:2,
        //dataIndex:'meiganshi',
        //     render: (value,row, index) => {
        //         const obj = {
        //             children:value,
        //             props: {},
        //         };
        //         if (index === 0) {
        //obj.props.colSpan = 2;
        //         }
        //
        //
        //
        //         return obj;
        //     },
        // },
        // {
        //     title:'',
        //     colSpan:0,
        //dataIndex:'hegelv3',
        // //     width:"6%"
        // },

    ];
    const datac=[];

    for (let i = 0; i < 9; i++) {
        datac.push({
            changjia: timec[i],


        })
    }
    return(
        <div>
            <Table  columns={columnsc} bordered dataSource={datac} pagination={false}/>
        </div>
    );
}
}