import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),





});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.CHANGE_FLOAT_WINDOW_FLAG:
            return state.merge({
                'floatWindowFlag': action.data,
            });
        default:
            return state;
    }


}