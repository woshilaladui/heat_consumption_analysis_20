import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
    startValue: [], //表头前端部分的标准 KH N P这3列有标准
    endValue: [],
    timeChose: 0,
    upperData: [

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //上表的数据
    bottomData: [
        {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []},
    ], //下表的数据
    order:[0,1,2],//0,1,2行需要计算合格率
    person: window.localStorage.name, //传入的值班人员
    t_name: "CRO"//临城中联福石控制室原始记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CRO:
            return state.merge({
                'upperData': action.upperData,
                'bottomData': action.bottomData,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_CRO:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_CRO://更新上表的数据
            return state.set('upperData', action.upperData);

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