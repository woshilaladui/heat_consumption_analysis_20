import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
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
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},
    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_BSO"//中控室烧成系统运行记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_BSO:
            return state.merge({
                'upperData': action.upperData,
                'bottomData': action.bottomData,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_BSO:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_BSO://更新上表的数据
            return state.set('upperData', action.upperData);

        case constants.UPDATE_BOTTOM_DATA_BSO:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}