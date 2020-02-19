import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
    timeChose: 0,
    upperData: [//表的前半段

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //上表的数据
    bottomData: [//备注的信息
        {t_data: []}
    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_OAD"//在线自动检测

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_OAD:
            return state.merge({
                'upperData': action.upperData,
                'bottomData': action.bottomData,
                'requestFlag':false,
            });
        case constants.CHANGE_TIME_CHOSE_OAD:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_OAD://更新上表的数据
            return state.set('upperData', action.upperData);

        case constants.UPDATE_BOTTOM_DATA_OAD:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}