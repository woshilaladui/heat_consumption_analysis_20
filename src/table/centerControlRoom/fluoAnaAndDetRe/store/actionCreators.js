import * as constants from './constants';

import {message} from "antd";
import {updateOperator} from "../../../../Helper/AutoCalculate";

import {requestGetZhongKongShiDataByTableNameAndDate,requestSaveZhongKongShiData} from "../../../../http/request/RequestZhongKongShi";

import {HuaYanShiFormat,ZhongKongShiFormat} from "../../../../Helper/Format";

import {requestGetHuaYanShiDataByTableNameAndDate} from "../../../../http/request/RequestHuaYanShi";

import {deepCopy} from "../../../../Helper/Copy";

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
    type: constants.CHANGE_TIME_CHOSE_FAD,
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
    type: constants.UPDATE_DATA_FAD,
    data: data
});


const updateUpperDataFront = ({upperDataFront}) => ({
    type: constants.UPDATE_UPPER_DATA_FRONT_FAD,
    upperDataFront: upperDataFront
});

//更新表的后半段
export const updateUpperDataLast = ({upperDataLast}) => ({
    type: constants.UPDATE_UPPER_DATA_LAST_FAD,
    upperDataLast: upperDataLast
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
                    let newData = deepCopy(response['data']);
                    let result = HuaYanShiFormat(
                        data,
                        newData,
                        tableName
                    );
                  if(result[0] != 0) {
                    //更新数据
                    dispatch(updateUpperDataFront({//将获取到的数据进行转发
                      upperDataFront: result[0]
                    }));
                  }
                }

            }
        )
    }
};


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
                  if(result[0] != 0) {
                    //更新数据
                    dispatch(updateUpperDataLast({//将获取到的数据进行转发
                      upperDataLast: result[0]
                    }));
                  }
                }

            }
        )


    }
};

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
                      }//end if
                    }
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
            authority: window.localStorage.authority,
            data: data,
            num: num
        })
            .then(
                (response) => {

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
                                num: 3
                            })//该表有3行数据

                    } else {

                    }

                    //更新我们的仓库
                    dispatch(updateData({data: data}))

                }
            )//end then


    }//end return
}//end saveData




// //该表只有下表是可编辑的，其他都是只读
// const updateData = (bottomData) => ({
//     type: constants.UPDATE_DATA_FAD,
//     bottomData: bottomData
// });

// export const updateUpperData = (upperData) => ({//更新上表的数据
//     type: constants.UPDATE_UPPER_DATA_FAD,
//     upperData: upperData,
// });



// export const updateUpperDataLSZ = (upperDataLSZ) =>({
//     type: constants.UPDATE_BOTTOM_DATA_FCAO_FAD,
//     upperDataLSZ: upperDataLSZ
// });
//
// export const updateBottomData = (bottomData) => ({//更新下表的数据
//     type: constants.UPDATE_BOTTOM_DATA_FAD,
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
// export const getData = (tableName, date, upperDataFront, upperDataLast, bottomData,upperDataLSZ) => {
//     return (dispatch) => {
//         //TODO 需求不明确 中半段
//
//         getZKSOldData(
//             URL.ZKS_QUERT,
//             getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             tableName,
//             null,
//             bottomData
//         )
//             .then((response) => {
//                 dispatch(updateData(
//                     response[1]//下表 就是备注信息
//                 ));
//                 dispatch(getFrontData(upperDataFront))//请求转发
//                 dispatch(getLastData(upperDataLast,upperDataLSZ))//请求转发
//             })
//             .catch(
//                 //TODO
//             )
//     }
// }
//
// //得到出窑熟料全分析汇总表的SiO2~MgO 和fCaO的数据
// export const getFrontData = (upperDataFront) => {
//     return (dispatch) => {
//         getOldData(
//             URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
//             getHuaYSJsonData('KAS', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//             'KAS',//从入窑生料化学分析报告单获取
//             1,//有标准
//             upperDataFront
//         )
//             .then((response) => {
//                 dispatch(updateUpperDataFront(response))//转发更新上表前半段数据
//             })
//             .catch(
//                 //TODO
//             )
//     }
// }
//
// export const getLastData = (upperDataLast,upperDataLSZ) => {//获取荧光分析的原始记录获取fCao
//     return (dispatch) => {//中间件请求
//         getHuaYSOldData(//注 upperDataLSZ是从原始记录表中的下表获取
//             URL.HUAYS_QUERY,
//             getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),
//             'CRO',
//             upperDataLast,
//             upperDataLSZ
//         )
//             .then((response)=>{
//                 dispatch(updateUpperDataLast(response[0]))//转发更新上表后半段数据
//                 dispatch(updateUpperDataLSZ(response[1]))
//             })
//             .catch()
//         // getOldData(
//         //     URL.HUAYS_QUERY,//获取荧光分析的原始记录获取fCao
//         //     getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
//         //     'CRO',//从入窑生料化学分析报告单获取
//         //     1,//有标准
//         //     upperDataLast
//         // )
//         //     .then((response) => {
//         //         dispatch(updateUpperDataLast(response))//转发更新上表后半段数据
//         //     })
//         //     .catch(
//         //         //TODO
//         //     )
//     }
// }
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
//                     //dispatch(updateUpperDataMiddle(data))//最后转发给updateUpperData来更新数据
//
//                 } else if (tableType === 2)//下表
//                     dispatch(updateBottomData(data))
//             })
//             .catch(
//                 //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
//             )
//     }
// }