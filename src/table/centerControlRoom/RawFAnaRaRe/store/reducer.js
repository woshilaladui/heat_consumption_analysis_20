import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant";


const defaultState = fromJS({

    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    startValue: [], //表头前端部分的标准 KH N P这3列有标准
    endValue: [],
    requestFlag:true,
    timeChose: 0,
    //从出磨生料化学分析报告单获取
    upperDataFront: [//表的前半段，SiO2~IM(P)

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []}
    ], //上表的数据
    data:[//定义该页面的数据模板 27
        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//0-7行代表 0-7小时
        {data: []},//下表

        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//9-16行代表 8-15小时
        {data: []},//下表

        {data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},{data: []},//18-25行代表 16-23小时
        {data: []},//下表
    ],

    //表的后半段从控制室原始记录获取
    upperDataLast: [
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},



        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},


        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
    ],
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_CMPB_YXJL,//出磨生料荧光分析及配比记录
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CMS://更新数据
            return state.merge({
                data:action.data,
                requestFlag:false
            });
        case constants.CHANGE_TIME_CHOSE_CMS://更新时间
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_STANDARD_CMS://更新该表的标准
            return state.merge({
                'startValue': action.startValue,
                'endValue': action.endValue
            });
        case constants.UPDATE_UPPER_DATA_FRONT_CMS://更新上表的前半段 SiO2~MgO
            return state.set('upperDataFront', action.upperDataFront);

        case constants.UPDATE_UPPER_DATA_LAST_CMS:
            return state.merge({
                'upperDataLast': action.upperDataLast,
                'requestFlag':false
            });


        default:
            return state;
    }


}