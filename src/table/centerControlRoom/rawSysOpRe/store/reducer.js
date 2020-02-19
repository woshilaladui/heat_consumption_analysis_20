import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    requestFlag: true,//是否要重新请求数据
    timeChose: 0,
    upperData: [//上表

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    bottomData: [
        {t_data: []}, {t_data: []},//夜班
        {t_data: []}, {t_data: []},//白班
        {t_data: []}, {t_data: []},//中班

    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_RSO"//中控室生料磨系统运行记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_RSO:
            return state.merge({
                'upperData': action.upperData,
                'bottomData': action.bottomData,
                'requestFlag': false,
            });
        case constants.CHANGE_TIME_CHOSE_RSO:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_RSO://更新上表的数据
            return state.set('upperData', action.upperData);

        case constants.UPDATE_BOTTOM_DATA_RSO:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}