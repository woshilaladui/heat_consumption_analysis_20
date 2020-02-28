import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    permission:[//定义该页面的数据模板
        {permission: []},
    ],
    pageDisplay: ['', '', '', '', '', '', '']//定义页面展现效果

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_PERMISSION:
            return state.merge({
                'permission': action.permission,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.UPDATE_DISPLAY:
            return state.merge({
                'pageDisplay': action.pageDisplay,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        default:
            return state;
    }


}