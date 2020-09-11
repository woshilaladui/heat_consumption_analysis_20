import * as constants from './constants';
import {message} from "antd";
import {updateOperator} from "../../../../Helper/AutoCalculate";

import {deepCopy} from "../../../../Helper/Copy";

import {HuaYanShiFormat} from "../../../../Helper/Format";
import {
    requestGetZhongKongShiDataByTableNameAndDate, requestSaveZhongKongShiData
} from "../../../../http/request/RequestZhongKongShi";

import {ZhongKongShiFormat} from "../../../../Helper/Format";

import {
    requestGetHuaYanShiDataByTableNameAndDate, requestSaveHuaYanShiData
} from "../../../../http/request/RequestHuaYanShi";

import {
    Mark,
    Table
} from "../../../../http/constant/Constant"

/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTimeChose = (timeChose) => ({
    type: constants.CHANGE_TIME_CHOSE_CMS,
    timeChose: timeChose
});

//时间更新员工
export function doChangeTimeChose(timeChose) {

    return (dispatch) => {
        dispatch(changeTimeChose(timeChose));
    }

}


//更新数据的老总
export const updateData = ({data}) => ({
    type: constants.UPDATE_DATA_CMS,
    data: data
});


// export const updateUpperData = (upperData) => ({//更新上表的数据
//     type: constants.UPDATE_UPPER_DATA_CMS,
//     upperData: upperData,
// });

//更新表的前半段
const updateUpperDataFront = ({upperDataFront}) => ({
    type: constants.UPDATE_UPPER_DATA_FRONT_CMS,
    upperDataFront: upperDataFront
});


//更新表的后半段
export const updateUpperDataLast = ({upperDataLast}) => ({
    type: constants.UPDATE_UPPER_DATA_LAST_CMS,
    upperDataLast: upperDataLast
});


//更新标准
export const updateStandard = (startValue, endValue) => ({
    type: constants.UPDATE_STANDARD_CMS,
    startValue: startValue,
    endValue: endValue
});

//得到出模生料化学分析单的SiO2~MgO的数据
export const getFrontData = (
    date,
    tableName,
    data
) => {
    return (dispatch) => {

        requestGetHuaYanShiDataByTableNameAndDate(
            date,
            tableName,
            data
        ).then(
            (response) => {


                if (response['code'] === 0) {

                    //解析数据
                  console.log("出磨生料")
                  console.log(response)
                  console.log("出磨生料")
                    let newData = deepCopy(response['data']);
                    let result = HuaYanShiFormat(
                        data,
                        newData,
                        tableName
                    );

                    //更新数据
                    dispatch(updateUpperDataFront({//将获取到的数据进行转发
                        upperDataFront: result[0]
                    }));

                    //更新标准
                    dispatch(updateStandard(result[1], result[2]));
                }

            }
        )

        // getOldData(
        //     URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
        //     getHuaYSJsonData('CRM', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
        //     'CRM',
        //     1,//有标准
        //     upperDataFront
        // )
        //     .then((response) => {
        //         dispatch(updateUpperDataFront(response))//转发更新上表前半段数据
        //     })
        //     .catch(
        //         //TODO
        //     )
    }
}


export const getLastData = (
    date,
    tableName,
    data
) => {
    return (dispatch) => {//中间件请求

        requestGetHuaYanShiDataByTableNameAndDate(
            date,
            tableName,
            data
        ).then(
            (response) => {


                if (response['code'] === 0) {

                    //解析数据
                    let newData = deepCopy(response['data']);
                    let result = HuaYanShiFormat(
                        data,
                        newData,
                        tableName
                    );

                    //更新数据
                    dispatch(updateUpperDataLast({//将获取到的数据进行转发
                        upperDataLast: result[0]
                    }));

                }

            }
        )


        // getOldData(
        //     URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
        //     getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
        //     'CRO',
        //     1,//有标准
        //     upperDataLast
        // )
        //     .then((response) => {
        //         dispatch(updateUpperDataLast(response))//转发更新上表后半段数据
        //     })
        //     .catch(
        //         //TODO
        //     )
    }
}

//更新数据的员工
export function getData(
    date,
    tableName,
    data
) {

    return (dispatch) => {
        //工具
        requestGetZhongKongShiDataByTableNameAndDate(
            date,
            tableName,
            data
        )
            .then(
                (response) => {

                    if(response['code'] === 0){
                        //解析处理数据
                        let newData = deepCopy(response['data'])

                        let result = ZhongKongShiFormat(
                            data,
                            newData,
                            tableName
                        );

                        dispatch(updateData({//将获取到的数据进行转发
                            data: result
                        }));
                    }//end if

                }
            )
    }//end return
}//end getData

export function saveData(
    {
        tableType = Table.UPPER_TABLE,//上表
        date,
        index,
        tableName,
        data,
        num = 1//默认为1即为存放单行数据
    }
) {

    return (dispatch) => {

        requestSaveZhongKongShiData({
            date: date,
            index: index,
            duty: window.localStorage.duty,
            tableName: tableName,
            id: window.localStorage.id,
            data: data,
            num: num
        })
            .then(
                (response) => {


                console.log("服务器")
                console.log(response)
                console.log("服务器")
                    if (response == Mark.SUCCESS && num == 1) {
                        message.info('暂存成功');
                    } else if (response == Mark.SUCCESS && num > 1) {
                        message.info('提交成功');
                    } else {
                        message.info('存放失败');
                    }

                    if (tableType == Table.UPPER_TABLE) {

                        if (num === 1)//存一行数据的时候只修改该行的操作者
                            updateOperator({
                                data: data,
                                index: index,
                                num: num
                            })
                        else//为总体提交的时候则当该行数据不为空的时候提交数据
                            updateOperator({
                                data: data,
                                num: 27
                            })//该表有27行数据

                    } else {

                    }

                    //更新我们的仓库
                    dispatch(updateData({data: data}))

                }
            )//end then


    }//end return
}//end saveData


// export const getData = (tableName, date, upperDataFront, upperDataMiddle, upperDataLast, bottomData) => {
//     return (dispatch) => {
//         //TODO 需求不明确 中半段
//
//         getZKSOldData(//中半部分 请求数据库中的
//             URL.ZKS_QUERT,
//             getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             tableName,
//             upperDataMiddle,
//             bottomData
//         )
//             .then((response) => {
//                 dispatch(updateData(
//                     response[0],//上表的中表部分
//                     response[1]//下表
//                 ));
//                 dispatch(getFrontData(upperDataFront))//请求转发
//                 dispatch(getLastData(upperDataLast))//请求转发
//             })
//             .catch(
//                 //TODO
//             )
//
//     }
// }

// export const getAllData = (
//     tableName,
//     date,
//     upperDataFront,
//     upperDataMiddle,
//     upperDataLast,
//     bottomData,
//     startValue,
//     endValue
// ) => {
//     return (dispatch) => {
//         const upperDataFrontPromise = getOldData(
//             URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
//             getHuaYSJsonData('CRM', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             'CRM',
//             1,//有标准
//             upperDataFront
//         );
//
//         const upperDataMiddlePromise = getZKSOldData(//中半部分 请求数据库中的
//             URL.ZKS_QUERT,
//             getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             tableName,
//             upperDataMiddle,
//             bottomData
//         );
//
//         const upperDataLastPromise = getOldData(
//             URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
//             getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             'CRO',
//             1,//有标准
//             upperDataLast
//         );
//
//         const standardPromise = getStandard(
//             URL.HUAYS_STANDARD,
//             {t_name: 'CRM'},
//             'CRM',
//             startValue,
//             endValue
//         );
//
//         Promise.all([
//             standardPromise,
//             upperDataFrontPromise,
//             upperDataMiddlePromise,
//             upperDataLastPromise
//         ])
//             .then((result) => {
//                 dispatch(updateStandard(
//                     result[0].startValue,
//                     result[0].endValue
//                 ))
//
//
//                 dispatch(updateUpperDataFront(result[1]))
//                 dispatch(updateData(
//                     result[2][0],//上表的中表部分
//                     result[2][1]//下表
//                 ));
//                 dispatch(updateUpperDataLast(result[3]))//转发更新上表后半段数据
//             })
//             .catch()
//     }
// }


// export const getOldStandard = (t_name, startValue, endValue) => {
//     return (dispatch) => {
//         getStandard(
//             URL.HUAYS_STANDARD,
//             {t_name: t_name},
//             t_name,
//             startValue,
//             endValue
//         )
//             .then((response) => {
//                 dispatch(updateStandard(
//                     response.startValue,
//                     response.endValue
//                 ))
//             })
//             .catch()
//     }
// }


// export function saveData({index = 0, tableType = 1, tableName, date, data, num = 1}) {
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
//                     dispatch(updateUpperDataMiddle(data))//最后转发给updateUpperData来更新数据
//
//                 } else if (tableType === 2)//下表
//                     dispatch(updateBottomData(data))
//             })
//             .catch(
//                 //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
//             )
//     }
// }