import { combineReducers } from 'redux-immutable';

import {reducer as homeAppReducer} from "../body/home_app/store"

/*******************************************中控室*******************************************************/
import { reducer as burnSysOpReReducer } from '../table/centerControlRoom/burnSysOpRe/store';
import { reducer as RawFAnaRaReReducer } from '../table/centerControlRoom/RawFAnaRaRe/store';
import { reducer as coalSysOpReReducer } from '../table/centerControlRoom/coalSysOpRe/store';
import { reducer as rawSysOpReReducer } from '../table/centerControlRoom/rawSysOpRe/store';
import { reducer as TXSysAcReReducer } from '../table/centerControlRoom/TXSysAcRe/store';
import { reducer as ruYSLYGFXJLReducer } from '../table/centerControlRoom/ruYSLYGFXJL/store';
import { reducer as onlineAutoDetOpReReducer } from '../table/centerControlRoom/onlineAutoDetOpRe/store';
import { reducer as ControlRoomOriginalReReducer } from '../table/fluorescenceAnaTabel/ControlRoomOriginalRe/store';
import { reducer as TableJCYCLReducer } from '../table/huayanshiTable/huayanshiRibao/TableJCYCL/store';
import { reducer as fluoAnaAndDetReReducer } from '../table/centerControlRoom/fluoAnaAndDetRe/store';


/*******************************************荧光分析表格*******************************************************/
import { reducer as RawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaRe/store';
import { reducer as RawMatCheAnaReSYReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReSY/store';
import { reducer as RawMatCheAnaReTFReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReTF/store';
import { reducer as RawMatCheAnaReFMHGReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReFMHg/store';
import { reducer as RawMatCheAnaReFMHSReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReFMHs/store';
import { reducer as CMRawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/CMRawMatCheAnaRe/store';
import { reducer as RYRawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/RYRawMatCheAnaRe/store';
import { reducer as KilnCAnaSumTableReducer } from '../table/fluorescenceAnaTabel/KilnCAnaSumTable/store';
import { reducer as FactoryCliAnaSumTableReducer } from '../table/fluorescenceAnaTabel/FactoryCliAnaSumTable/store';


/*******************************************分析表格*******************************************************/
import { reducer as RawMatAnaOriReReducer } from '../table/analysisTable/rawMatAnaOriRe/store';
import { reducer as RawMatAnaOriReSYReducer } from '../table/analysisTable/rawMatAnaOriReSY/store';
import { reducer as RawMatAnaOriReTFReducer } from '../table/analysisTable/rawMatAnaOriReTF/store';
import { reducer as RawMatAnaOriReFMHGReducer } from '../table/analysisTable/rawMatAnaOriReFMHg/store';
import { reducer as RawMatAnaOriReFMHSReducer } from '../table/analysisTable/rawMatAnaOriReFMHs/store';
import { reducer as CMRawMatAnaOriReReducer } from '../table/analysisTable/CMRawMatAnaOriRe/store';
import { reducer as RYRawMatAnaOriReReducer } from '../table/analysisTable/RYRawMatAnaOriRe/store';
import { reducer as CYCheAnaSheetReducer } from '../table/analysisTable/CYCheAnaSheet/store';
import { reducer as CCCheAnaSheetReducer } from '../table/analysisTable/CCCheAnaSheet/store';
import { reducer as CYPhyPerTestReducer } from '../table/analysisTable/CYPhyPerTest/store';
import { reducer as CCPhyPerTestReducer } from '../table/analysisTable/CCPhyPerTest/store';
import { reducer as JCMoCoCoMaReducer } from '../table/analysisTable/JCMoCoCoMa/store';

import { reducer as smIndusAnaOriReReducer } from '../table/analysisTable/SMIndusAnaOriRe/store';
import { reducer as mfIndusAnaOriReReducer } from '../table/analysisTable/MFIndusAnaOriRe/store';

import { reducer as setStandardReducer } from '../table/setStandard/store';

/*******************************************电量表格*******************************************************/
import { reducer as monthElectricityReducer } from '../table/electricityTable/monthElectricity/store';
import { reducer as threeFiveKwTableReducer } from '../table/electricityTable/threeFiveKwTable/store';


const reducer = combineReducers({

	/****************************中控室***************************************/
	burnSysOpRe: burnSysOpReReducer,//中控室烧成系统运行记录
	RawFAnaRaRe:RawFAnaRaReReducer,//出磨生料荧光分析及配比记录
	coalSysOpRe:coalSysOpReReducer,//中控室煤磨系统运行记录
	rawSysOpRe:rawSysOpReReducer,//中控室生料磨系统运行记录
	TXSysAcRe:TXSysAcReReducer,//脱硝系统行动记录
	ruYSLYGFXJL:ruYSLYGFXJLReducer,//入窑生料荧光分析及检测记录
	ControlRoomOriginalRe:ControlRoomOriginalReReducer,//荧光分析的原始记录
	fluoAnaAndDetRe:fluoAnaAndDetReReducer,
	onlineAutoDetOpRe:onlineAutoDetOpReReducer,//自动检测
	TableJCYCL:TableJCYCLReducer, //化验室日报的仓下进厂表格


	/****************************化验室***************************************/
	RawMatCheAnaRe:RawMatCheAnaReReducer,//进厂原材料分析化学报告单（石灰石）
	RawMatCheAnaReSY:RawMatCheAnaReSYReducer,//进厂砂岩原材料分析化学报告单
	RawMatCheAnaReTF:RawMatCheAnaReTFReducer,//进厂铁粉原材料分析化学报告单
	RawMatCheAnaReFMHG:RawMatCheAnaReFMHGReducer,//进厂粉煤灰(干)原材料分析化学报告单
	RawMatCheAnaReFMHS:RawMatCheAnaReFMHSReducer,//进厂粉煤灰(湿)原材料分析化学报告单
	CMRawMatCheAnaRe:CMRawMatCheAnaReReducer,//出磨生料化学分析报告单
	RYRawMatCheAnaRe:RYRawMatCheAnaReReducer,//入窑生料化学分析报告单

	KilnCAnaSumTable:KilnCAnaSumTableReducer,//出窑熟料全分析汇总表
	FactoryCliAnaSumTable:FactoryCliAnaSumTableReducer,//出厂熟料全分析汇总表

	//分析表格
	rawMatAnaOriRe:RawMatAnaOriReReducer,//石灰石原材料分析原始记录
	rawMatAnaOriReSY:RawMatAnaOriReSYReducer,//砂岩原材料分析原始记录
	rawMatAnaOriReTF:RawMatAnaOriReTFReducer,//铁粉原材料分析原始记录
	rawMatAnaOriReFMHg:RawMatAnaOriReFMHGReducer,//粉煤灰(干)原材料分析原始记录
	rawMatAnaOriReFMHs:RawMatAnaOriReFMHSReducer,//粉煤灰(湿)原材料分析原始记录
	CMRawMatAnaOriRe:CMRawMatAnaOriReReducer,//出磨生料分析原始记录
	RYRawMatAnaOriRe:RYRawMatAnaOriReReducer,//入窑生料分析原始记录
	CYCheAnaSheet:CYCheAnaSheetReducer,//出窑熟料化学分析单
	CCCheAnaSheet:CCCheAnaSheetReducer,//出厂熟料化学分析单
	CYPhyPerTest:CYPhyPerTestReducer,//出窑熟料物理性能检测
	CCPhyPerTest:CCPhyPerTestReducer,//出厂熟料物理性能检测
	JCMoCoCoMa:JCMoCoCoMaReducer,//进厂原燃材料水分

	smIndusAnaOriRe:smIndusAnaOriReReducer, //神木工业分析原始记录
	mfIndusAnaOriRe:mfIndusAnaOriReReducer,  //煤粉工业分析原始记录


	home_app:homeAppReducer,

	setStandard:setStandardReducer,//设置标准



	monthElectricity:monthElectricityReducer,  //每月电量表
	threeFiveKwTable:threeFiveKwTableReducer  //35KW表
});

export default reducer;
