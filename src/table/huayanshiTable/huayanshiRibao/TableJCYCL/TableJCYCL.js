import React from 'react';
import {Table} from 'antd';
import {Standard, URL} from "../../../../Request/Constant";
import {getHuaYSJsonData} from "../../../../Request/JsonCenter";
import moment from "moment";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";
import * as actionCreators from "./store/actionCreators"


//化验室日报---进厂原材料以及仓下
class TableJCYCL extends React.Component {

    render() {
        const timea = ['石灰石', '干粉煤灰', '湿粉煤灰', '铁粉', '沙岩泥', '仓下原材料', '石灰石', '粉煤灰', '铁粉', '沙岩', '/'];//进场原材料数据
        const dataa = [];
        const columnsa = [
            // 进厂原材料表
            {
                title: '进场原材料',
                key: 'timea',
                dataIndex: 'timea',
                // width: "10%"
            },
            {
                title: '水分',
                key: 'water_lista',
                dataIndex: 'water_lista',
                // width: "8%"
            },
            {
                title: 'IL',
                dataIndex: 'IL_lista',
                key: 'IL_lista',
                // width: "8%"
            },
            {
                title: 'SiO2',
                key: 'SiO2_lista',
                dataIndex: 'SiO2_lista',
                //width: "8%"
            },
            {
                title: 'Al2O3',
                key: 'Al2O3_lista',
                dataIndex: 'Al2O3_lista',
                //  width: "6%"
            },
            {
                title: 'Fe2O3',
                key: 'Fe2O_lista',
                dataIndex: 'Fe2O_lista',
                //  width: "6%"
            },
            {
                title: 'CaO',
                key: 'CaO_lista',
                dataIndex: 'CaO_lista',
                //  width: "6%"
            },
            {
                title: 'MgO',
                key: 'MgO_lista',
                dataIndex: 'MgO_lista',
                // width: "6%"
            },
            {
                title: 'S3O',
                key: 'S3O_lista',
                dataIndex: 'S3O_lista',
                // width: "6%"
            },
            {
                title: 'Na2O',
                key: 'Na2O_lista',
                dataIndex: 'Na2O_lista',
                //width: "10%"
            },
            {
                title: 'K2O',
                key: 'K2O_lista',
                dataIndex: 'K2O_lista',
                //width: "10%"
            },
            {
                title: 'R2O',
                key: 'R2O_lista',
                dataIndex: 'R2O_lista',
                //width: "10%"
            },
            {
                title: 'Cl-',
                key: 'Cl_lista',
                dataIndex: 'Cl_lista',
                //  width: "6%"
            },

        ];

        const CJSHSjunzhi_DATA = deepCopy(this.props.CJSHSjunzhi);
        const CJSYjunzhi_DATA = deepCopy(this.props.CJSYjunzhi);
        const CJFMHgjunzhi_DATA = deepCopy(this.props.CJFMHgjunzhi);
        const CJFMHsjunzhi_DATA = deepCopy(this.props.CJFMHsjunzhi);
        const CJTFjunzhi_DATA = deepCopy(this.props.CJTFjunzhi);

        const RAO_SHS_DATA = deepCopy(this.props.RAO_SHS);
        const RAO_SY_DATA = deepCopy(this.props.RAO_SY);
        const RAO_FMHg_DATA = deepCopy(this.props.RAO_FMHg);
        const RAO_FMHs_DATA = deepCopy(this.props.RAO_FMHs);
        const RAO_TF_DATA = deepCopy(this.props.RAO_TF);


        /*进厂石灰石数据填充*/

        dataa.push({
            timea: timea[0],
            water_lista: isNaN(CJSHSjunzhi_DATA[0])?null:CJSHSjunzhi_DATA[0],
            IL_lista: isNaN(CJSHSjunzhi_DATA[1])?null:CJSHSjunzhi_DATA[1],
            SiO2_lista: isNaN(CJSHSjunzhi_DATA[2])?null:CJSHSjunzhi_DATA[2],
            Al2O3_lista: isNaN(CJSHSjunzhi_DATA[3])?null:CJSHSjunzhi_DATA[3],
            Fe2O_lista: isNaN(CJSHSjunzhi_DATA[4])?null:CJSHSjunzhi_DATA[4],
            CaO_lista: isNaN(CJSHSjunzhi_DATA[5])?null:CJSHSjunzhi_DATA[5],
            MgO_lista: isNaN(CJSHSjunzhi_DATA[6])?null:CJSHSjunzhi_DATA[6],
            S3O_lista: isNaN(RAO_SHS_DATA[3]['data'][6]) ? null : RAO_SHS_DATA[3]['data'][6],
            //S3O_lista:RAO_SHS_DATA[3]['data'][6]?RAO_SHS_DATA[3]['data'][6]:'',
            Na2O_lista: isNaN(RAO_SHS_DATA[3]['data'][7]) ? null : RAO_SHS_DATA[3]['data'][7],
            K2O_lista: isNaN(RAO_SHS_DATA[3]['data'][8]) ? null : RAO_SHS_DATA[3]['data'][8],
            Cl_lista: isNaN(RAO_SHS_DATA[3]['data'][9]) ? null : RAO_SHS_DATA[3]['data'][9],
            R2O_lista: null
        })

        /*进厂干煤粉灰数据*/
        dataa.push({
            timea: timea[1],
            water_lista: isNaN(CJFMHgjunzhi_DATA[0])?null:CJFMHgjunzhi_DATA[0],
            IL_lista: isNaN(RAO_FMHg_DATA[3]['data'][0]) ? null : RAO_FMHg_DATA[3]['data'][0],
            SiO2_lista: isNaN(RAO_FMHg_DATA[3]['data'][1]) ? null : RAO_FMHg_DATA[3]['data'][1],
            Al2O3_lista: isNaN(RAO_FMHg_DATA[3]['data'][2]) ? null : RAO_FMHg_DATA[3]['data'][2],
            Fe2O_lista: isNaN(RAO_FMHg_DATA[3]['data'][3]) ? null : RAO_FMHg_DATA[3]['data'][3],
            CaO_lista: isNaN(RAO_FMHg_DATA[3]['data'][4]) ? null : RAO_FMHg_DATA[3]['data'][4],
            MgO_lista: isNaN(RAO_FMHg_DATA[3]['data'][5]) ? null : RAO_FMHg_DATA[3]['data'][5],
            S3O_lista: isNaN(RAO_FMHg_DATA[3]['data'][6]) ? null : RAO_FMHg_DATA[3]['data'][6],
            Na2O_lista: isNaN(RAO_FMHg_DATA[3]['data'][7]) ? null : RAO_FMHg_DATA[3]['data'][7],
            K2O_lista: isNaN(RAO_FMHg_DATA[3]['data'][8]) ? null : RAO_FMHg_DATA[3]['data'][8],
            Cl_lista: isNaN(RAO_FMHg_DATA[3]['data'][9]) ? null : RAO_FMHg_DATA[3]['data'][9],
            R2O_lista: null

        })

/****************进厂粉煤灰湿***************/
        dataa.push({
            timea: timea[2],
            water_lista: isNaN(CJFMHsjunzhi_DATA[0])?null:CJFMHsjunzhi_DATA[0],
            IL_lista: isNaN(RAO_FMHs_DATA[3]['data'][0]) ? null : RAO_FMHs_DATA[3]['data'][0],
            SiO2_lista: isNaN(RAO_FMHs_DATA[3]['data'][1]) ? null : RAO_FMHs_DATA[3]['data'][1],
            Al2O3_lista: isNaN(RAO_FMHs_DATA[3]['data'][2]) ? null : RAO_FMHs_DATA[3]['data'][2],
            Fe2O_lista: isNaN(RAO_FMHs_DATA[3]['data'][3]) ? null : RAO_FMHs_DATA[3]['data'][3],
            CaO_lista: isNaN(RAO_FMHs_DATA[3]['data'][4]) ? null : RAO_FMHs_DATA[3]['data'][4],
            MgO_lista: isNaN(RAO_FMHs_DATA[3]['data'][5]) ? null : RAO_FMHs_DATA[3]['data'][5],
            S3O_lista: isNaN(RAO_FMHs_DATA[3]['data'][6]) ? null : RAO_FMHs_DATA[3]['data'][6],
            Na2O_lista: isNaN(RAO_FMHs_DATA[3]['data'][7]) ? null : RAO_FMHs_DATA[3]['data'][7],
            K2O_lista: isNaN(RAO_FMHs_DATA[3]['data'][8]) ? null : RAO_FMHs_DATA[3]['data'][8],
            Cl_lista: isNaN(RAO_FMHs_DATA[3]['data'][9]) ? null : RAO_FMHs_DATA[3]['data'][9],
            R2O_lista: null
        })

        dataa.push({
            timea: timea[3],
            water_lista: isNaN(CJTFjunzhi_DATA[0])?null:CJTFjunzhi_DATA[0],
            IL_lista: isNaN(RAO_TF_DATA[3]['data'][0]) ? null : RAO_TF_DATA[3]['data'][0],
            SiO2_lista: isNaN(RAO_TF_DATA[3]['data'][1]) ? null : RAO_TF_DATA[3]['data'][1],
            Al2O3_lista: isNaN(RAO_TF_DATA[3]['data'][2]) ? null : RAO_TF_DATA[3]['data'][2],
            Fe2O_lista: isNaN(RAO_TF_DATA[3]['data'][3]) ? null : RAO_TF_DATA[3]['data'][3],
            CaO_lista: isNaN(RAO_TF_DATA[3]['data'][4]) ? null : RAO_TF_DATA[3]['data'][4],
            MgO_lista: isNaN(RAO_TF_DATA[3]['data'][5]) ? null : RAO_TF_DATA[3]['data'][5],
            S3O_lista: isNaN(RAO_TF_DATA[3]['data'][6]) ? null : RAO_TF_DATA[3]['data'][6],
            Na2O_lista: isNaN(RAO_TF_DATA[3]['data'][7]) ? null : RAO_TF_DATA[3]['data'][7],
            K2O_lista: isNaN(RAO_TF_DATA[3]['data'][8]) ? null : RAO_TF_DATA[3]['data'][8],
            Cl_lista: isNaN(RAO_TF_DATA[3]['data'][9]) ? null : RAO_TF_DATA[3]['data'][9],
            R2O_lista: null
        })

        /*进厂砂岩泥数据填充*/
        dataa.push({
            timea: timea[4],
            water_lista: isNaN(CJSYjunzhi_DATA[0])?null:CJSYjunzhi_DATA[0],
            IL_lista:    isNaN(CJSYjunzhi_DATA[1])?null:CJSYjunzhi_DATA[1],
            SiO2_lista:  isNaN(CJSYjunzhi_DATA[2])?null:CJSYjunzhi_DATA[2],
            Al2O3_lista: isNaN(CJSYjunzhi_DATA[3])?null:CJSYjunzhi_DATA[3],
            Fe2O_lista:  isNaN(CJSYjunzhi_DATA[4])?null:CJSYjunzhi_DATA[4],
            CaO_lista:   isNaN(CJSYjunzhi_DATA[5])?null:CJSYjunzhi_DATA[5],
            MgO_lista:   isNaN(CJSYjunzhi_DATA[6])?null:CJSYjunzhi_DATA[6],
            S3O_lista: isNaN(RAO_SY_DATA[3]['data'][6]) ? null : RAO_SY_DATA[3]['data'][6],
            //S3O_lista:RAO_SY_DATA[3]['data'][6]?RAO_SY_DATA[3]['data'][6]:'',
            Na2O_lista: isNaN(RAO_SY_DATA[3]['data'][7]) ? null : RAO_SY_DATA[3]['data'][7],
            K2O_lista: isNaN(RAO_SY_DATA[3]['data'][8]) ? null : RAO_SY_DATA[3]['data'][8],
            Cl_lista: isNaN(RAO_SY_DATA[3]['data'][9]) ? null : RAO_SY_DATA[3]['data'][9],
            R2O_lista: null


        })

        /*仓下表的表头*/
        dataa.push({
            timea: timea[5],
            water_lista: "水分",
            IL_lista: "IL",
            SiO2_lista: "SiO2",
            Al2O3_lista: "Al2O3",
            Fe2O_lista: "Fe2O3",
            CaO_lista: "CaO",
            MgO_lista: "MgO",
            S3O_lista: "S3O",
            Na2O_lista: "Na2O",
            K2O_lista: "K2O",
            R2O_lista: "R2O",
            Cl_lista: "Cl-"

        })


        for (let i = 6; i < 11; i++) {


            dataa.push({
                timea: timea[i],
            })

        }

        return (
            <div>
                <Table columns={columnsa} bordered dataSource={dataa} pagination={false}/>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        date: state.getIn(['TableJCYCL', 'date']),
        RAO_SHS: state.getIn(['TableJCYCL', 'RAO_SHS']),
        RAO_SY: state.getIn(['TableJCYCL', 'RAO_SY']),
        RAO_FMHg: state.getIn(['TableJCYCL', 'RAO_FMHg']),
        RAO_FMHs: state.getIn(['TableJCYCL', 'RAO_FMHs']),
        RAO_TF: state.getIn(['TableJCYCL', 'RAO_TF']),
        t_name: state.getIn(['TableJCYCL', 't_name']),
        CJSHSjunzhi: state.getIn(['TableJCYCL', 'CJSHSjunzhi']),
        CJSYjunzhi: state.getIn(['TableJCYCL', 'CJSYjunzhi']),
        CJFMHgjunzhi: state.getIn(['TableJCYCL', 'CJFMHgjunzhi']),
        CJFMHsjunzhi: state.getIn(['TableJCYCL', 'CJFMHsjunzhi']),
        CJTFjunzhi: state.getIn(['TableJCYCL', 'CJTFjunzhi']),


    }
}

const mapDispathToProps = (dispatch) => {
    return {}//end return
}

export default connect(mapStateToProps, mapDispathToProps)(TableJCYCL);