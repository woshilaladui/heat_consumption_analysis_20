import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag:true,//是否需要更新数据
    data:[],//用户数据
    roleData:[],//所有的角色数据
    userRoleData:[],//请求该用户的当前角色信息
    visible: false,
});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_USER:
            return state.merge({
                'data': action.data,
                'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.UPDATE_DATA_ROLES:
            return state.merge({
                'roleData': action.data,
            });
        case constants.UPDATE_DATA_CURRENT_USER_ROLE:
            return state.merge({
                'userRoleData': action.data,
            });
        default:
            return state;
    }


}