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


	home_app:homeAppReducer,


});

export default reducer;
