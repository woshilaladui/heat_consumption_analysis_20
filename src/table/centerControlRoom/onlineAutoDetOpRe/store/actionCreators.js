import * as constants from './constants';

import {message} from "antd";


import {
    requestGetZhongKongShiDataByTableNameAndDate,
    requestSaveZhongKongShiData,
} from "../../../../http/request/RequestZhongKongShi"
import {
    Mark,
    Table
} from "../../../../http/constant/Constant"
import {
    updateOperator, ZhongKongShiFormat
} from "../../../../Helper/Format"


import {deepCopy} from "../../../../Helper/Copy";


/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTimeChose = (timeChose) => ({
    type: constants.CHANGE_TIME_CHOSE_OAD,
    timeChose: timeChose
});

//时间更新员工
export function doChangeTimeChose(timeChose) {

    return (dispatch) => {
        dispatch(changeTimeChose(timeChose));
    }

}

export const updateData = ({data}) => ({
    type: constants.UPDATE_DATA_OAD,
    data: data
});


/**
 *
 * @param date
 * @param tableName
 * @param data 传过来的是这个界面的模板
 * @returns {Function}
 */
export const getData = (date, tableName, data) => {
    return (dispatch) => {

        requestGetZhongKongShiDataByTableNameAndDate(
            date,
            tableName,
            data
        ).then((response) => {


            if(response['code'] === 0) {

                //解析处理数据
                let newData = deepCopy(response['data'])

                let result = ZhongKongShiFormat(
                  data,
                  newData,
                  tableName
                );
                if (result != 0) {
                    dispatch(updateData({//将获取到的数据进行转发
                        data: result
                    }));
                }
            }



        });//end requestGetHuaYanShiDataByTableNameAndDate
    }
};//end getData


export function saveData(
    {
        tableType = 1,//上表
        date,
        index,
        tableName,
        data,
        num = 1//默认为1即为存放单行数据
    }
) {

    return(dispatch) =>{
        requestSaveZhongKongShiData({
            date: date,
            index: index,
            duty: window.localStorage.duty,
            tableName: tableName,
            authority: window.localStorage.authority,
            data: data,
            num: num
        }).then((response) => {

            //处理是否提交成功
            if (response == Mark.SUCCESS && num == 1) {
                message.info('暂存成功');
            } else if (response == Mark.SUCCESS && num > 1) {
                message.info('提交成功');
            } else {
                message.info('存放失败');
            }

            //更新数据
            if (tableType === Table.UPPER_TABLE) {//上表
                if (num === 1)//存一行数据的时候只修改该行的操作者
                    updateOperator({
                        data: data,
                        index: index,
                        num:num
                    });
                else//为总体提交的时候则当该行数据不为空的时候提交数据
                    updateOperator({
                        data: data,
                        num: 21
                    })//该表有21行数据

                dispatch(updateData({data:data}))//最后转发给updateData来更新数据

            }else {
                dispatch(updateData({data:data}))
            }

        });//end requestSaveHuaYanShiData
    }

}


// export const updateUpperData = (upperData) => ({//更新上表一的数据
//     type: constants.UPDATE_UPPER_DATA_OAD,
//     upperData: upperData,
// });


// export const updateBottomData = (bottomData) => ({//更新下表的数据
//     type: constants.UPDATE_BOTTOM_DATA_OAD,
//     bottomData: bottomData,
// });











// /**
//  *
//  * @param tableName
//  * @param date
//  * @param upperDataFront
//  * @param upperDataLast
//  * @param bottomData
//  * @returns {Function}
//  */
// export const getData = (tableName, date, upperData, bottomData) => {
//     return (dispatch) => {
//
//         getZKSOldData(
//             URL.ZKS_QUERT,
//             getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             tableName,
//             upperData,
//             bottomData
//         )
//             .then((response) => {
//                 dispatch(updateData({//将获取到的数据进行转发
//                     upperData: response[0],
//                     bottomData: response[1]
//                 }))
//             })
//             .catch(
//                 //TODO 自动计算
//             )
//     }
// }
// export function saveData({index = 0, tableType = 1, tableName, date, data, num = 1}) {
//
//
//     return (dispatch) => {
//         ZKSSave(
//             URL.ZKS_SAVE,
//             getZKSJsonSaveData({//获取封装好的请求头
//                 tableType: tableType,//上表
//                 tableName: tableName,
//                 date: date,
//                 index: index,
//                 data: data,
//                 num: num
//             }))
//             .then((response) => {
//                 if (num === 1)
//                     message.info('暂存成功');
//                 else//为整体提交
//                     message.info('提交成功');
//
//                 if (tableType === 1) {//上表
//                     if (num === 1)//存一行数据的时候只修改该行的操作者
//                         updateOperator({Data: data, index: index})
//                     else//为总体提交的时候则当该行数据不为空的时候提交数据
//                         updateOperator({Data: data, num: 24})//该表上表有24行数据
//                     dispatch(updateUpperData(data))//最后转发给updateUpperData来更新数据
//
//                 } else if (tableType === 2)//下表
//                     dispatch(updateBottomData(data))
//             })
//             .catch(
//                 //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
//             )
//     }
// }
//
//
//
//
//
//
//
// /**
//  * 该表为只读，除了下表的备注部分其他都从其他表来获取
//  * @param index 默认值为0  传入非默认值的时候代表存某一行数据，否则表示存全部数据
//  * @param tableType
//  * @param tableName
//  * @param date
//  * @param data
//  * @param num 在存全部数据时侯生效，num表示总共要提交的数据量
//  * @returns {Function}
//  */
//
