import React, {Component} from "react";
import './MainComponent.css';
import {Layout} from 'antd';
import * as actionCreators from "../../table/fluorescenceAnaTabel/ControlRoomOriginalRe/store/actionCreators";
import {connect} from "react-redux";
import * as actionCreators_HYS_RB from "../../table/huayanshiTable/huayanshiRibao/TableJCYCL/store/actionCreators";

// 查看表单
import SearchTable from '../../table/searchTable/searchTable';
// 中控室表格
import BurnSysOpRe from '../../table/centerControlRoom/burnSysOpRe/BurnSysOpRe';
import CoalSysOpRe from '../../table/centerControlRoom/coalSysOpRe/CoalSysOpRe';
import RuYSLYGFXJL from '../../table/centerControlRoom/ruYSLYGFXJL/RuYSLYGFXJL';
import RawSysOpRe from '../../table/centerControlRoom/rawSysOpRe/RawSysOpRe';
import TXSysAcRe from '../../table/centerControlRoom/TXSysAcRe/TXSysAcRe';
import RawFAnaRaRe from '../../table/centerControlRoom/RawFAnaRaRe/RawFAnaRaRe';
import FluoAnaAndDetRe from '../../table/centerControlRoom/fluoAnaAndDetRe/FluoAnaAndDetRe';
import OnlineAutoDetOpRe from '../../table/centerControlRoom/onlineAutoDetOpRe/OnlineAutoDetOpRe';
import CentralControlDaRe from '../../table/centerControlRoom/centralControlDaRe/CentralControlDaRe';
// 荧光分析表格
import RawMatCheAnaRe from '../../table/fluorescenceAnaTabel/RawMatCheAnaRe/RawMatCheAnaRe';
import RawMatCheAnaReSY from '../../table/fluorescenceAnaTabel/RawMatCheAnaReSY/RawMatCheAnaReSY';//进厂砂岩原材料分析化学报告单
import RawMatCheAnaReTF from '../../table/fluorescenceAnaTabel/RawMatCheAnaReTF/RawMatCheAnaReTF';//进厂铁粉原材料分析化学报告单
import RawMatCheAnaReFMHg from '../../table/fluorescenceAnaTabel/RawMatCheAnaReFMHg/RawMatCheAnaReFMHg';//进厂粉煤灰（干）原材料分析化学报告单
import RawMatCheAnaReFMHs from '../../table/fluorescenceAnaTabel/RawMatCheAnaReFMHs/RawMatCheAnaReFMHs';//进厂粉煤灰（湿）原材料分析化学报告单
import WareHouseRawMatCARe from '../../table/fluorescenceAnaTabel/wareHouseRawMatCARe/WareHouseRawMatCARe';
// import WareHouseFenmeihuiS from '../../table/fluorescenceAnaTabel/wareHouseFenmeihuiS/WareHouseFenmeihuiS';
// import WareHouseShayan from '../../table/fluorescenceAnaTabel/wareHouseShayan/WareHouseShayan';
// import WareHouseTiefen from '../../table/fluorescenceAnaTabel/wareHouseTiefen/WareHouseTiefen';
import CMRawCheAnaRe from '../../table/fluorescenceAnaTabel/CMRawMatCheAnaRe/CMRawMatCheAnaRe';
import RYRawMatCheAnaRe from '../../table/fluorescenceAnaTabel/RYRawMatCheAnaRe/RYRawMatCheAnaRe';
import KilnCAnaSumTable from '../../table/fluorescenceAnaTabel/KilnCAnaSumTable/KilnCAnaSumTable';
import FactoryCliAnaSumTable from '../../table/fluorescenceAnaTabel/FactoryCliAnaSumTable/FactoryCliAnaSumTable';
import ControlRoomOriginalRe from '../../table/fluorescenceAnaTabel/ControlRoomOriginalRe/ControlRoomOriginalRe';
// 设置合格标准
import SetStandard from '../../table/setStandard/SetStandard';
// 员工管理
import StaffManagement from '../../table/staffManagement/StaffManagement';
// 分析表格
import RawMatAnaOriRe from '../../table/analysisTable/rawMatAnaOriRe/RawMatAnaOriRe'; //原材料分析原始记录 石灰石
import RawMatAnaOriReSY from '../../table/analysisTable/rawMatAnaOriReSY/RawMatAnaOriReSY'; //原材料分析原始记录 砂岩
import RawMatAnaOriReTF from '../../table/analysisTable/rawMatAnaOriReTF/RawMatAnaOriReTF'; //原材料分析原始记录 砂岩
import RawMatAnaOriReFMHg from '../../table/analysisTable/rawMatAnaOriReFMHg/RawMatAnaOriReFMHg'; //原材料分析原始记录 砂岩
import RawMatAnaOriReFMHs from '../../table/analysisTable/rawMatAnaOriReFMHs/RawMatAnaOriReFMHs'; //原材料分析原始记录 砂岩
import CMRawMatAnaOriRe from '../../table/analysisTable/CMRawMatAnaOriRe/CMRawMatAnaOriRe';
import RYRawMatAnaOriRe from '../../table/analysisTable/RYRawMatAnaOriRe/RYRawMatAnaOriRe';
import CYCheAnaSheet from '../../table/analysisTable/CYCheAnaSheet/CYCheAnaSheet';
import CCCheAnaSheet from '../../table/analysisTable/CCCheAnaSheet/CCCheAnaSheet';
import CYPhyPerTest from '../../table/analysisTable/CYPhyPerTest/CYPhyPerTest';
import CCPhyPerTest from '../../table/analysisTable/CCPhyPerTest/CCPhyPerTest';
import JCMoCoCoMa from '../../table/analysisTable/JCMoCoCoMa/JCMoCoCoMa';
import SMIndusAnaOriRe from '../../table/analysisTable/SMIndusAnaOriRe/SMIndusAnaOriRe';
import MFIndusAnaOriRe from '../../table/analysisTable/MFIndusAnaOriRe/MFIndusAnaOriRe';
//import HuayanshiRibaoCeshi from "../../table/huayanshiTable/huayanshiRibao/HuayanshiRibaoCeshi";
import HuayanshiRibao from "../../table/huayanshiTable/huayanshiRibao/HuayanshiRibao";
import {deepCopy} from "../../Helper/Copy";

const { Content} = Layout;




export default class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // choose_num: this.props.choose,
            choose_arr: [
                <SearchTable />,
                <BurnSysOpRe />,
                <CoalSysOpRe />,
                <RawSysOpRe />,
                <TXSysAcRe />,
                <RawFAnaRaRe />,
                <RuYSLYGFXJL />,
                <FluoAnaAndDetRe />,
                <OnlineAutoDetOpRe />,
                <CentralControlDaRe />,
                <RawMatCheAnaRe />,//10
                <RawMatCheAnaReSY />,//11
                <RawMatCheAnaReTF />,//12
                <RawMatCheAnaReFMHg />,//13
                <RawMatCheAnaReFMHs />,//14
                <WareHouseRawMatCARe />,//15
                {/*<WareHouseShayan />,//16*/},
                {/*<WareHouseFenmeihuiS />,//17*/},
                {/*<WareHouseTiefen />,//18*/},
                <CMRawCheAnaRe />,//19
                <RYRawMatCheAnaRe />,//20
                <KilnCAnaSumTable />,//21
                <FactoryCliAnaSumTable />,//22
                <ControlRoomOriginalRe />,//23
                <RawMatAnaOriRe />,//24
                <RawMatAnaOriReSY />,//25
                <RawMatAnaOriReTF />,//26
                <RawMatAnaOriReFMHg />,//27
                <RawMatAnaOriReFMHs />,//28
                <CMRawMatAnaOriRe />,//29
                <RYRawMatAnaOriRe />,//30
                <CYCheAnaSheet />,//31
                <CCCheAnaSheet />,//32
                <CYPhyPerTest />,//33
                <CCPhyPerTest />,//34
                <JCMoCoCoMa />,//35
                <SMIndusAnaOriRe />,//36
                <MFIndusAnaOriRe />,//37
                <HuayanshiRibao />,"7","8","9",
                <SetStandard />,
                <StaffManagement />
            ],
        }

    }

    componentWillMount() {
        // const {
        //     _upperData, _bottomData, requestFlag, date, t_name,
        //     setOldData, setOldStandard, startValue, endValue,
        //     RAO_SHS, RMA_SHS, RAO_SY, RMA_SY, RMA_FMHg, RAO_FMHg,
        //     date_HYS_RB, t_name_HYS_RB, RMA_FMHs, RAO_FMHs, RMA_TF, RAO_TF,
        //     set_HYS_RB_Data, requestFlag_HYS_RB,
        //     CX_CaCO3,
        // } = this.props;
        // if (requestFlag) {
        //     const tempStartValue = deepCopy(startValue)//JSON.parse(JSON.stringify(startValue))
        //     const tempEndValue = deepCopy(endValue)//JSON.parse(JSON.stringify(endValue))
        //     const tempUpperData = deepCopy(_upperData);
        //     const tempBottomData = deepCopy(_bottomData)
        //     setOldStandard(tempStartValue, tempEndValue, t_name);
        //     setOldData(t_name, date, tempUpperData, tempBottomData);
        //
        // }
        // if (requestFlag_HYS_RB) {
        //
        //     const tempRMA_SHS = JSON.parse(JSON.stringify(RMA_SHS));
        //     const tempRAO_SHS = JSON.parse(JSON.stringify(RAO_SHS));
        //     const tempRMA_SY = JSON.parse(JSON.stringify(RMA_SY));
        //     const tempRAO_SY = JSON.parse(JSON.stringify(RAO_SY));
        //     const tempRMA_FMHg = JSON.parse(JSON.stringify(RMA_FMHg));
        //     const tempRAO_FMHg = JSON.parse(JSON.stringify(RAO_FMHg));
        //     const tempRMA_FMHs = JSON.parse(JSON.stringify(RMA_FMHs));
        //     const tempRAO_FMHs = JSON.parse(JSON.stringify(RAO_FMHs));
        //     const tempRMA_TF = JSON.parse(JSON.stringify(RMA_TF));
        //     const tempRAO_TF = JSON.parse(JSON.stringify(RAO_TF));
        //
        //     const tempCX_CaCO3 = JSON.parse(JSON.stringify(CX_CaCO3));
        //     set_HYS_RB_Data(t_name_HYS_RB, date_HYS_RB, tempRMA_SHS,
        //         tempRAO_SHS, tempRMA_SY, tempRAO_SY, tempRMA_FMHg, tempRAO_FMHg,
        //         tempRMA_FMHs, tempRAO_FMHs, tempRMA_TF, tempRAO_TF,tempCX_CaCO3);
        //
        // }
    }
    render() {
        return (

            <Layout>
                <Content style={{margin: '0 1% 0 1%', overflow: 'auto', backgroundColor: 'white'}}>
                    {this.state.choose_arr[this.props.choose]}
                </Content>
            </Layout>

        );
    }
}
//定义映射
// const mapStateToProps = (state) => {
//     return {
//         /**
//          * 荧光室原始记录
//          */
//         date:state.getIn(['ControlRoomOriginalRe', 'date']),
//         timeChose:state.getIn(['ControlRoomOriginalRe', 'timeChose']),
//         _upperData:state.getIn(['ControlRoomOriginalRe', 'upperData']),
//         _bottomData:state.getIn(['ControlRoomOriginalRe', 'bottomData']),
//         requestFlag:state.getIn(['ControlRoomOriginalRe', 'requestFlag']),
//         person:state.getIn(['ControlRoomOriginalRe', 'person']),
//         t_name:state.getIn(['ControlRoomOriginalRe', 't_name']),
//         startValue: state.getIn(['ControlRoomOriginalRe', 'startValue']),
//         endValue: state.getIn(['ControlRoomOriginalRe', 'endValue']),
//         /**化验室日报进厂**/
//         date_HYS_RB:state.getIn(['TableJCYCL', 'date_HYS_RB']),
//         RMA_SHS:state.getIn(['TableJCYCL', 'RMA_SHS']),
//         RAO_SHS:state.getIn(['TableJCYCL', 'RAO_SHS']),
//         RMA_SY:state.getIn(['TableJCYCL', 'RMA_SY']),
//         RAO_SY:state.getIn(['TableJCYCL', 'RAO_SY']),
//         RMA_FMHg:state.getIn(['TableJCYCL', 'RMA_FMHg']),
//         RAO_FMHg:state.getIn(['TableJCYCL', 'RAO_FMHg']),
//         RMA_FMHs:state.getIn(['TableJCYCL', 'RMA_FMHs']),
//         RAO_FMHs:state.getIn(['TableJCYCL', 'RAO_FMHs']),
//         RMA_TF:state.getIn(['TableJCYCL', 'RMA_TF']),
//         RAO_TF:state.getIn(['TableJCYCL', 'RAO_TF']),
//
//         /***************************仓下****************************************/
//         CX_CaCO3:state.getIn(['TableJCYCL', 'CX_CaCO3']),
//         /****************************end*****************/
//         t_name_HYS_RB:state.getIn(['TableJCYCL', 't_name_HYS_RB']),
//         requestFlag_HYS_RB:state.getIn(['TableJCYCL', 'requestFlag_HYS_RB']),
//     }
// }
//
// const mapDispathToProps = (dispatch) => {
//     return {
//         setOldData(tableName,date,upperData,bottomData){
//             dispatch(actionCreators.getData(tableName,date,upperData,bottomData))
//         },
//         setOldStandard(startValue, endValue,tableName) {
//             dispatch(actionCreators.getOldStandard(tableName, startValue, endValue))
//         },
//         set_HYS_RB_Data(tableName,date,RMA_SHS,RAO_SHS,RMA_SY,RAO_SY,RMA_FMHg,RAO_FMHg,RMA_FMHs,RAO_FMHs,RMA_TF,RAO_TF,CX_CaCO3){
//             dispatch(actionCreators_HYS_RB.getDataHYSRB(tableName,date,RMA_SHS,RAO_SHS,RMA_SY,RAO_SY,RMA_FMHg,RAO_FMHg,RMA_FMHs,RAO_FMHs,RMA_TF,RAO_TF,CX_CaCO3))
//
//         },
//     }//end return
// }

//export default BurnSysOpRe;
//export default connect(mapStateToProps, mapDispathToProps)(AppIndex);