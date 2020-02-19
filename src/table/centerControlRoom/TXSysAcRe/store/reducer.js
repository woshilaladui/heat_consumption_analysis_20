import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
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
        {t_data: []}, {t_data: []}, {t_data: []}//共3班，每班一行数据

    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_TXA"//中控室脱硝系统行动记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_TXA:
            return state.merge({
                'upperData': action.upperData,
                'bottomData': action.bottomData,
                'requestFlag':false,
            });
        case constants.CHANGE_TIME_CHOSE_TXA:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_TXA://更新上表的数据
            return state.set('upperData', action.upperData);

        case constants.UPDATE_BOTTOM_DATA_TXA:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}