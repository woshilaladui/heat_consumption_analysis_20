import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    startValue: [], //表头前端部分的标准 KH N P这3列有标准
    endValue: [],
    requestFlag:true,
    timeChose: 0,
    upperDataFront: [//表的前半段，SiO2~IM(P)

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //上表的数据
    upperDataMiddle: [//表的中半段 石灰石~粉煤灰
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    upperDataLast: [
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    bottomData: [//备注的信息
        {t_data: []}
    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_CMS"//出磨生料荧光分析及配比记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_CMS://更新数据
            return state.merge({
                'upperDataMiddle': action.upperDataMiddle,
                'bottomData': action.bottomData
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

        case constants.UPDATE_UPPER_DATA_MIDDLE_CMS://更新石灰石~粉煤灰
            return state.set('upperDataMiddle', action.upperDataMiddle);

        case constants.UPDATE_UPPER_DATA_LAST_CMS://
            return state.merge({
                'upperDataLast': action.upperDataLast,
                'requestFlag':false
            });

        case constants.UPDATE_BOTTOM_DATA_CMS:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}