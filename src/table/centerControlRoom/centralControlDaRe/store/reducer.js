import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant"

const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    timeChose: 0,//默认0点班
    data:[//定义该页面的数据模板
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []},{data: []},

        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []},{data: []},
        {data: []},{data: []},
        
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []},{data: []},
    ],
    LX: ['立磨','','','煤磨','','','旋窑','',''] ,//表头类型,
    allTime :[
        ['0点班','','','0点班','','','0点班','',''],
        ['8点班','','','8点班','','','8点班','',''],
        ['4点班','','','4点班','','','4点班','','']
    ],
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_CDR//中控室日报

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CCD:
            return state.merge({
                'data': action.data,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_CCD:
            return state.set('timeChose', action.timeChose);

        default:
            return state;
    }


}