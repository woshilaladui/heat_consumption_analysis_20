import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
// import {TableName} from "../../../Constant/TableNameConstant"

const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    timeChose: 0,//默认0点班
    startTime:"2001/01/01",
    endTime:"2025/01/01",
    data:[//定义该页面的数据模板
        {data: []}

    ],
    person: window.localStorage.username, //传入的值班人员
    loadFlag:true

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_TFKT:
            return state.merge({
                'data': action.data,
                'requestFlag':false,//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
                'loadFlag': false
            });
        case constants.UPDATE_START_END_TIME:
            return state.merge({
                'startTime':action.startTime,
                'endTime':action.endTime,
            })

        default:
            return state;
    }


}