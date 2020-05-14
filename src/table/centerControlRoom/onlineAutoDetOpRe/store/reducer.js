import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant";


const defaultState = fromJS({

    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,
    timeChose: 0,
    data: [//表的前半段 21

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []},

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}
    ], //上表的数据
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_ZD_JCJL,//中控室烧成系统运行记录
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_OAD:
            return state.merge({
                data:action.data,
                requestFlag:false
            });
        case constants.CHANGE_TIME_CHOSE_OAD:
            return state.set('timeChose', action.timeChose);

        default:
            return state;
    }


}