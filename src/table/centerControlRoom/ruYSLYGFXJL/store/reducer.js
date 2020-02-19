import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
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
    upperDataLast: [//上表 细度和水分
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
    t_name: "NS_RYS"//入窑生料荧光分析及检测记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_RYS://更新数据
            return state.merge({
                'upperDataMiddle': action.upperDataMiddle,
                'bottomData': action.bottomData
            });
        case constants.CHANGE_TIME_CHOSE_RYS://更新时间
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_FRONT_RYS://更新上表的前半段 SiO2~MgO
            return state.set('upperDataFront', action.upperDataFront);

        case constants.UPDATE_UPPER_DATA_LAST_RYS://
            return state.merge({
                'upperDataLast': action.upperDataLast,
                'requestFlag':false
            });

        case constants.UPDATE_BOTTOM_DATA_RYS:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}