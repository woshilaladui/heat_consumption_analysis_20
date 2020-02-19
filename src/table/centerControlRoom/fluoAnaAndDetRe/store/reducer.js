import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    date: moment().format("YYYY-MM-DD hh:mm:ss"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
    timeChose: 0,
    upperDataFront: [//表的前半段，SiO2~IM(P) 还加上fCaO 从出窑熟料全分析汇总表

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //上表的数据
    upperDataLast: [//上表 fCao 从荧光的原始记录的上表中获取
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    upperDataLSZ:[//从T16 原始记录中的下表中获取 立升重g/l
        {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []},
    ],
    bottomData: [//备注的信息
        {t_data: []}, {t_data: []}, {t_data: []}//3班都需要备注
    ], //下表的数据
    person: window.localStorage.name, //传入的值班人员
    t_name: "NS_FAD"//熟料荧光分析及检测记录

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_FAD://更新数据
            return state.merge({
                'upperDataMiddle': action.upperDataMiddle,
                'bottomData': action.bottomData
            });
        case constants.CHANGE_TIME_CHOSE_FAD://更新时间
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_FRONT_FAD://更新上表的前半段 SiO2~MgO
            return state.set('upperDataFront', action.upperDataFront);

        case constants.UPDATE_BOTTOM_DATA_FCAO_FAD:
            return state.set("upperDataLSZ",action.upperDataLSZ);

        case constants.UPDATE_UPPER_DATA_LAST_FAD://
            return state.merge({
                'upperDataLast': action.upperDataLast,
                'requestFlag':false
            });

        case constants.UPDATE_BOTTOM_DATA_FAD:
            return state.set('bottomData', action.bottomData);

        default:
            return state;
    }


}