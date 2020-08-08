import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag: true,//是否需要更新数据
    user: [],//存放用户信息的数组
    presentUser:{},
    dutyList:[],
    stateList:[],
    departmentList:[],
    typeList:[],
    userInformationVisible: false,
    userCreateVisible: false,
    person: window.localStorage.username, //传入的值班人员


});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_STAFF:
            return state.merge({
                'user': action.user,
                'requestFlag': false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });

        case constants.UPDATE_DATA_USER_INF_VISIBLE:
            return state.set('userInformationVisible', action.userInformationVisible);

        case constants.UPDATE_DATA_USER_CREATE_VISIBLE:
            return state.set('userCreateVisible', action.userCreateVisible);

        case constants.SET_USER_INFORMATION:
            return state.set('presentUser', action.presentUser);

        case constants.INIT_TABLE:
            return state.merge({
                'dutyList': action.dutyList,
                'stateList': action.stateList,
                'departmentList': action.departmentList,
                'typeList': action.typeList,
            });

        default:
            return state;
    }


}