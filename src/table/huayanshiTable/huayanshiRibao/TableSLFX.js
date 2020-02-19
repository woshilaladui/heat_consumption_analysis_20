import React from 'react';
import {Table, Input, Button, message,Popconfirm} from 'antd';

//化验室--熟料分析
export default class TableSLFX extends React.Component {
    render() {
        const columnse = [
            {
                title: '熟料分析',
                key: 'timee',
                dataIndex: 'timee',
                width: "100px"
            },
            {
                title: 'IL',
                key: 'ILe',
                dataIndex: 'ILe',
                // width: "6%"
            },
            {
                title: 'SiO2',
                key: 'SiO2e',
                dataIndex: 'SiO2e',
                // width: "6%"
            },
            {
                title: 'Al2O3',
                key: 'Al2O3e',
                dataIndex: 'Al2O3e',
                // width: "6%"
            },
            {
                title: 'Fe2O3',
                key: 'Fe2O3e',
                dataIndex: 'Fe2O3e',
                // width: "6%"
            },
            {
                title: 'CaO',
                key: 'CaOe',
                dataIndex: 'CaOe',
                // width: "6%"
            },
            {
                title: 'MgO',
                key: 'MgOe',
                dataIndex: 'MgOe',
                // width: "6%"
            },
            {
                title: 'SO3',
                key: 'SO3e',
                dataIndex: 'SO3e',
                // width: "6%"
            },
            {
                title: 'K2O',
                key: 'K2Oe',
                dataIndex: 'K2Oe',
                // width: "6%"
            },
            {
                title: 'Na2O',
                key: 'Na2Oe',
                dataIndex: 'Na2Oe',
                // width: "6%"
            },
            {
                title: 'R2O',
                key: 'R2Oe',
                dataIndex: 'R2Oe',
                // width: "6%"
            },
            {
                title: 'Cl-',
                key: 'Cl_e',
                dataIndex: 'Cl_e',
                // width: "6%"
            },
            {
                title: 'fCaO',
                key: 'fCaOe',
                dataIndex: 'fCaOe',
                // width: "6%"
            },
            {
                title: 'KH',
                key: 'KHe',
                dataIndex: 'KHe',
                // width: "6%"
            },
            {
                title: 'KH-',
                key: 'KH_e',
                dataIndex: 'KH_e',
                // width: "6%"
            },
            {
                title: 'N',
                key: 'Ne',
                dataIndex: 'Ne',
                // width: "6%"
            },
            {
                title: 'p',
                key: 'pe',
                dataIndex: 'pe',
                // width: "6%"
            },
            {
                title: 'C3S',
                key: 'C3Se',
                dataIndex: 'C3Se',
                // width: "6%"
            },
            {
                title: 'C2S',
                key: 'C2Se',
                dataIndex: 'C2Se',
                // width: "6%"
            },
            {
                title: 'C3A',
                key: 'C3Ae',
                dataIndex: 'C3Ae',
                // width: "6%"
            },
            {
                title: 'C4AF',
                key: 'C4AFe',
                dataIndex: 'C4AFe',
                // width: "6%"
            },
            {
                title: '立升重',
                key: '立升重e',
                dataIndex: '立升重e',
                // width: "6%"
            },
            {
                title: '硫碱比',
                key: '硫碱比e',
                dataIndex: '硫碱比e',
                // width: "6%"
            },
        ];
        const timee = ['出窑熟料均值', '出厂熟料均值'];
        const datae = [];//熟料
        for (let i = 0; i < 2; i++) {
            datae.push({
                timee: timee[i],
            })
        }
        return(
            <div>
                <Table columns={columnse} bordered dataSource={datae} pagination={false}/>
            </div>
        );
    }
}
