import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
    startValue: [],
    endValue: [],
    timeChose: 0,
    tableWidth:9,//表格总长度
    data: [

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},//均值 比值 合格率
        {data: []}, {data: []}, {data: []}, {data: []},//下表数据

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
    ], //上表的数据
    modelData : [

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},//均值 比值 合格率
        {data: []}, {data: []}, {data: []}, {data: []},//下表数据

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},
    ],
     allTime : [
        ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
        ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],
    order:[0,1,2,3,4,5,6,7,8],//需要计算合格率的行
    person: window.localStorage.username, //传入的值班人员
    tableName: "CRO",

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CRO:
            return state.merge({
                'data': action.data,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_CRO:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_CRO://更新上表的数据
            return state.set('data', action.data);

        case constants.UPDATE_BOTTOM_DATA_CRO:
            return state.set('bottomData', action.bottomData);

        case constants.UPDATE_STANDARD_CRO://更新该表的标准
            return state.merge({
                'startValue': action.startValue,
                'endValue': action.endValue
            });

        default:
            return state;
    }


}