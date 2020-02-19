import * as constants from './constants';
import {getZKSOldData, getOldData, ZKSSave} from "../../../../Request/RequsetCenter";

import {getZKSJsonData, getZKSJsonSaveData, getHuaYSJsonData} from "../../../../Request/JsonCenter";
import {message} from "antd";
import {updateOperator} from "../../../../Helper/AutoCalculate";
import {URL} from "../../../../Request/Constant";
import moment from 'moment';


/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTimeChose = (timeChose) => ({
    type: constants.CHANGE_TIME_CHOSE_OAD,
    timeChose: timeChose
})

//更新整个表
const updateData = ( {upperData,bottomData}) => ({
    type: constants.UPDATE_DATA_OAD,
    bottomData: bottomData,
    upperData:upperData
});
export const updateUpperData = (upperData) => ({//更新上表一的数据
    type: constants.UPDATE_UPPER_DATA_OAD,
    upperData: upperData,
});


export const updateBottomData = (bottomData) => ({//更新下表的数据
    type: constants.UPDATE_BOTTOM_DATA_OAD,
    bottomData: bottomData,
});











/**
 *
 * @param tableName
 * @param date
 * @param upperDataFront
 * @param upperDataLast
 * @param bottomData
 * @returns {Function}
 */
export const getData = (tableName, date, upperData, bottomData) => {
    return (dispatch) => {

        getZKSOldData(
            URL.ZKS_QUERT,
            getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            tableName,
            upperData,
            bottomData
        )
            .then((response) => {
                dispatch(updateData({//将获取到的数据进行转发
                    upperData: response[0],
                    bottomData: response[1]
                }))
            })
            .catch(
                //TODO 自动计算
            )
    }
}
export function saveData({index = 0, tableType = 1, tableName, date, data, num = 1}) {
    return (dispatch) => {
        ZKSSave(
            URL.ZKS_SAVE,
            getZKSJsonSaveData({//获取封装好的请求头
                tableType: tableType,//上表
                tableName: tableName,
                date: date,
                index: index,
                data: data,
                num: num
            }))
            .then((response) => {
                if (num === 1)
                    message.info('暂存成功');
                else//为整体提交
                    message.info('提交成功');

                if (tableType === 1) {//上表
                    if (num === 1)//存一行数据的时候只修改该行的操作者
                        updateOperator({Data: data, index: index})
                    else//为总体提交的时候则当该行数据不为空的时候提交数据
                        updateOperator({Data: data, num: 24})//该表上表有24行数据
                    dispatch(updateUpperData(data))//最后转发给updateUpperData来更新数据

                } else if (tableType === 2)//下表
                    dispatch(updateBottomData(data))
            })
            .catch(
                //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
            )
    }
}







/**
 * 该表为只读，除了下表的备注部分其他都从其他表来获取
 * @param index 默认值为0  传入非默认值的时候代表存某一行数据，否则表示存全部数据
 * @param tableType
 * @param tableName
 * @param date
 * @param data
 * @param num 在存全部数据时侯生效，num表示总共要提交的数据量
 * @returns {Function}
 */

