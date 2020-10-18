import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant"

const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    timeChose: 0,//默认0点班
    data:[//定义该页面的数据模板
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
        {data: []}, {data: []}, {data: []}, {data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},//下表的数据 8-11行

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
        {data: []}, {data: []}, {data: []}, {data: [
                '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
            ]},//下表的数据 20-23行

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
        {data: []}, {data: []}, {data: []}, {data: [
                '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
            ]},//下表的数据 32-35行

    ],
    modelData:[//定义该页面的数据模板
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
        {data: []}, {data: []}, {data: []}, {data: ['', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()]},//下表的数据 8-11行

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
        {data: []}, {data: []}, {data: []}, {data: [
                '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
            ]},//下表的数据 20-23行

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
        {data: []}, {data: []}, {data: []}, {data: [
                '', '', moment().format("YYYY/MM/DD hh:mm:ss").toString()
            ]},//下表的数据 32-35行

    ],
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],
    person: window.localStorage.username, //传入的值班人员
    tableName:TableName.ZHONG_KONG_SHI_SCXT_YXJL//中控室烧成系统运行记录

});
export default (state = defaultState, action) => {

    switch (action.type) {

        case constants.CHANGE_TIME_CHOSE_BSO:
            return state.set('timeChose', action.timeChose);
        // case constants.CHANGE_REQUEST_FLAG:
        //     console.log("requestFlag true")
        //     return state.set('requestFlag',true);
        case constants.UPDATE_DATA_BSO:
            console.log("requestFlag false")
            return state.merge({
                'data': action.data,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
{/*<<<<<<< HEAD*/}
{/*=======*/}
        case constants.CHANGE_TIME_CHOSE_BSO:
            return state.set('timeChose', action.timeChose);

        default:
            return state;
    }


}