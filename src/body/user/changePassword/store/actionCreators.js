import * as constants from './constants';
import {message} from "antd";

//导入中控室的请求方法
import {
    requestSaveFeedBackData,
} from "../../../http/request/RequestZhongKongShi"
import {
    Mark,
} from "../../../http/constant/Constant"

export const savefb = (values) => {
    return (dispatch) => {
            console.log("actioncreator:"+values.title);
        requestSaveFeedBackData(
            window.localStorage.username,
            values.residence[0],
            values.title,
            values.content,
        ).then((response) => {
            if(response === Mark.SUCCESS){
                message.info('提交成功');
            }else{
                message.info('存放失败');
            }
        });
    }
};

// import * as constants from './constants';
// import {message} from "antd";

// //导入中控室的请求方法
// import {
//     requestGetZhongKongShiDataByTableNameAndDate,
//     requestSaveZhongKongShiData,
// } from "../../../../http/request/RequestZhongKongShi"
// import {
//     Mark,
//     Table
// } from "../../../../http/constant/Constant"
// import {
//     updateOperator, ZhongKongShiFormat
// } from "../../../../Helper/Format"

// import {deepCopy} from "../../../../Helper/Copy";

// export const changeTimeChose = (timeChose) => ({
//     type: constants.CHANGE_TIME_CHOSE_BSO,
//     timeChose: timeChose
// });

// export const getData = (date, tableName, data,flag) => {
//     return (dispatch) => {
//         requestGetZhongKongShiDataByTableNameAndDate(
//             date,
//             tableName,
//             data
//         ).then((response) => {
//             if(response['code'] === 0){
//                 //解析处理数据
//                 let newData = deepCopy(response['data']);
//                 let result = ZhongKongShiFormat(
//                     data,
//                     newData,
//                     tableName
//                 );
//                 dispatch(updateData({//将获取到的数据进行转发
//                     data: result
//                 }));
//             }
//         });//end requestGetHuaYanShiDataByTableNameAndDate
//     }
// };//end getData
