import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';

const defaultState = fromJS({
    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date:moment().format("YYYY-MM-DD"),
    searchFlag:true,   //搜索标志，默认true-显示 false-隐藏
});

export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_SEARCH_DATE:
            return state.set('date', action.date);
        case constants.UPDATE_SEARCH_FLAG:
            return state.set('searchFlag', action.searchFlag);
        default:
            return state;
    }


}