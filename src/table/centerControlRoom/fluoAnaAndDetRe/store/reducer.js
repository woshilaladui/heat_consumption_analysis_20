import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant";


const defaultState = fromJS({

    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    //date:moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag: true,
    timeChose: 0,
    //从出窑熟料全分析汇总表 获取
    upperDataFront: [//表的前半段，SiO2~IM(P)  从出窑熟料全分析汇总表

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []}
    ], //上表的数据

    //从控制室原始记录获取立升重 和 f-CaO
    upperDataLast: [//上表 fCao 从荧光的原始记录的上表中获取
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},//0点班


        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},//8点班

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},//16点班
    ],
    data: [//从T16 原始记录中的下表中获取 立升重g/l
        {data: []}, //0点班的备注
        {data: []}, //8点半的备注
        {data: []}, //16点班的备注

    ],
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_SL_JCJL,//出磨生料荧光分析及配比记录
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_FAD://更新数据
            return state.merge({
                data:action.data,
                requestFlag:false
            });
        case constants.CHANGE_TIME_CHOSE_FAD://更新时间
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_UPPER_DATA_FRONT_FAD://更新上表的前半段 SiO2~MgO
            return state.set('upperDataFront', action.upperDataFront);

        case constants.UPDATE_UPPER_DATA_LAST_FAD://
            return state.merge({
                'upperDataLast': action.upperDataLast,
                'requestFlag': false
            });

        default:
            return state;
    }


}