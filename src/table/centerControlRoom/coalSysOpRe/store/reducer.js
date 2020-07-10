import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant";


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    timeChose: 0,//默认0点班
    data:[//定义该页面的数据模板 27
        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//0-7行代表 0-7小时
        {data: []},//下表

        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//9-16行代表 8-15小时
        {data: []},//下表

        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//18-25行代表 16-23小时
        {data: []},//下表
    ],
    KZSUpperData: [

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //控制室原始记录上表的数据
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_MFXT_YXJL,//中控室烧成系统运行记录
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],


});

//老总
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CSO://更新数据的部门
            return state.merge({
                data:action.data,
                requestFlag:false
            });
        case constants.UPDATE_TIME_CHOSE_CSO:
            return state.set('timeChose', action.timeChose);

        default:
            return state;
    }


}