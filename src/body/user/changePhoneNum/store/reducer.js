// import * as constants from './constants';
// import {fromJS} from 'immutable';
// import {TableName} from "../../../../Constant/TableNameConstant"

// const defaultState = fromJS({
//     person: window.localStorage.username, //传入的值班人员
//     tableName:TableName.ZHONG_KONG_SHI_SCXT_YXJL//中控室烧成系统运行记录
// });

// export default (state = defaultState, action) => {

//     switch (action.type) {

//         case constants.CHANGE_TIME_CHOSE_BSO:
//             return state.set('timeChose', action.timeChose);
//         case constants.UPDATE_DATA_BSO:
//             return state.merge({
//                 'data': action.data,
//                 'requestFlag':false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
//             });
//         default:
//             return state;
//     }


// }