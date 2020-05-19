import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../Constant/TableNameConstant";


const defaultState = fromJS({

    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag: true,
    tableChose: 0,
    oldStartValue: [], //从数据库获取的标准
    oldEndValue: [],
    oldReason: [],
    oldUsername:'',//填写人的名字

    newStartValue:[],
    newEndValue:[],
    newReason:[],
    newUsername:'',

    tableNameList: [
        TableName.Limestone_SHS,
        TableName.Limestone_SY,
        TableName.Limestone_TF,
        TableName.Limestone_FMHg,
        TableName.Limestone_FMHs,
        TableName.Limestone_CRM,
        TableName.Limestone_RMC,
        TableName.Limestone_KAS,
        TableName.Limestone_FAS,
        TableName.Limestone_CRO,

    ],
    allItem: [
        ['SiO2', 'CaO', 'MgO', 'R2O'],//进厂石灰石原材料分析化学报告单
        ['水分', 'SiO2', 'R2O'],//进厂砂岩原材料分析化学报告单
        ['水分', 'Fe2O3', 'R2O'],//进厂铁粉原材料分析化学报告单
        ['水分', 'IL', 'Al2O3', 'R2O'],//进厂粉煤灰(干)原材料分析化学报告单
        ['水分', 'IL', 'Al2O3', 'R2O'],//进厂粉煤灰(湿)原材料分析化学报告单
        ['KH', 'N', 'P'],//出磨生料化学分析报告单
        ['KH', 'N', 'P'],//入窑生料化学分析报告单
        ['KH', 'N', 'P'],//出窑熟料全分析汇总表
        ['KH', 'N', 'P'],//出厂熟料全分析汇总表
        ['FCaO', '立升重'],//临城中联福石控制室原始记录
    ],
    person: window.localStorage.username, //传入的值班人员

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_OLD_STANDARD://更新数据
            return state.merge({
                oldStartValue: action.oldStartValue,
                oldEndValue: action.oldEndValue,
                oldReason: action.oldReason,
                oldUsername:action.oldUsername,
                requestFlag: false
            });
        case constants.UPDATE_DATA_NEW_STANDARD:
            return state.merge({
                newStartValue: action.newStartValue,
                newEndValue: action.newEndValue,
                newReason: action.newReason,
                newUsername:action.newUsername,
                requestFlag: false
            });

        case constants.UPDATE_DATA_NEW_STANDARD_NEW_START_VALUE:
            return state.set('newStartValue', action.newStartValue);

        case constants.UPDATE_DATA_NEW_STANDARD_NEW_END_VALUE:
            return state.set('newEndValue', action.newEndValue);

        case constants.UPDATE_DATA_NEW_STANDARD_NEW_REASON:
            return state.set('newReason', action.newReason);

        case constants.CHANGE_TABLE_CHOSE_STANDARD://更新时间
            return state.merge({
                tableChose: action.tableChose,
                requestFlag: true
            });



        default:
            return state;
    }


}