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

import { reducer as centralControlDaReReducer } from '../table/centerControlRoom/centralControlDaRe/store';

/*******************************************化验室*******************************************************/
import { reducer as RawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaRe/store';
import { reducer as RawMatCheAnaReSYReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReSY/store';
import { reducer as RawMatCheAnaReTFReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReTF/store';
import { reducer as RawMatCheAnaReFMHGReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReFMHg/store';
import { reducer as RawMatCheAnaReFMHSReducer } from '../table/fluorescenceAnaTabel/RawMatCheAnaReFMHs/store';
import { reducer as CMRawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/CMRawMatCheAnaRe/store';
import { reducer as RYRawMatCheAnaReReducer } from '../table/fluorescenceAnaTabel/RYRawMatCheAnaRe/store';
import { reducer as KilnCAnaSumTableReducer } from '../table/fluorescenceAnaTabel/KilnCAnaSumTable/store';
import { reducer as FactoryCliAnaSumTableReducer } from '../table/fluorescenceAnaTabel/FactoryCliAnaSumTable/store';

//FactoryCliAnaSumTable

import { reducer as smIndusAnaOriReReducer } from '../table/analysisTable/SMIndusAnaOriRe/store';
import { reducer as mfIndusAnaOriReReducer } from '../table/analysisTable/MFIndusAnaOriRe/store';

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

	centralControlDaRe:centralControlDaReReducer,//中控日报

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
	home_app:homeAppReducer,
	
	smIndusAnaOriRe:smIndusAnaOriReReducer, //神木工业分析原始记录
	mfIndusAnaOriRe:mfIndusAnaOriReReducer,  //煤粉工业分析原始记录

	monthElectricity:monthElectricityReducer,  //每月电量表
	threeFiveKwTable:threeFiveKwTableReducer  //35KW表
});

export default reducer;
