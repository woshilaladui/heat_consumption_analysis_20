import React from 'react';
import {Table, Input, Button, message,Popconfirm} from 'antd';

//化验室日报---生料化学分析
export default class TableRaw extends React.Component {
    render() {
        const columnsd = [
            {
                title: '生料化学分析',
                key: 'timed',
                dataIndex: 'timed',
                // width: "10%"
            },
            {
                title: 'IL',
                key: 'ILd',
                dataIndex: 'ILd',
                // width: "5%"
            },
            {
                title: 'SiO2',
                key: 'SiO2d',
                dataIndex: 'SiO2d',
                // width: "6%"
            },
            {
                title: 'Al2O3',
                key: 'Al2O3d',
                dataIndex: 'Al2O3d',
                // width: "6%"
            },
            {
                title: 'Fe2O3',
                key: 'Fe2O3d',
                dataIndex: 'Fe2O3d',
                // width: "6%"
            },
            {
                title: 'CaO',
                key: 'CaOd',
                dataIndex: 'CaOd',
                // width: "5%"
            },
            {
                title: 'MgO',
                key: 'MgOd',
                dataIndex: 'MgOd',
                // width: "5%"
            },
            {
                title: 'SO3',
                key: 'SO3d',
                dataIndex: 'SO3d',
                // width: "5%"
            },
            {
                title: 'K2O',
                key: 'K2Od',
                dataIndex: 'K2Od',
                // width: "5%"
            },
            {
                title: 'Na2O',
                key: 'Na2Od',
                dataIndex: 'Na2Od',
                // width: "6%"
            },
            {
                title: 'R2O',
                key: 'R2Od',
                dataIndex: 'R2Od',
                // width: "5%"
            },
            {
                title: 'Cl-',
                key: 'Cl_d',
                dataIndex: 'Cl_d',
                // width: "5%"
            },
            {
                title: 'KH',
                key: 'KHd',
                dataIndex: 'KHd',
                // width: "3%"
            },
            {
                title: 'N',
                key: 'Nd',
                dataIndex: 'Nd',
                // width: "3%"
            },
            {
                title: 'P',
                key: 'Pd',
                dataIndex: 'Pd',
                // width: "3%"
            },
        ];
        const timed = ['出磨生料均值','合格率' ,'入窑生料均值', '合格率'];
        const datad = [];//生料
        for (let i = 0; i < 4; i++) {
            datad.push({
                    timed: timed[i],

            })
        }
        return(
            <div>
                <Table columns={columnsd} bordered dataSource={datad} pagination={false}/>
            </div>
        );
    }
}
