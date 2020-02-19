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
    type: constants.CHANGE_TIME_CHOSE_RYS,
    timeChose: timeChose
})

//该表只有下表是可编辑的，其他都是只读
const updateData = ( bottomData) => ({
    type: constants.UPDATE_DATA_RYS,
    bottomData: bottomData
});

export const updateUpperData = (upperData) => ({//更新上表的数据
    type: constants.UPDATE_UPPER_DATA_RYS,
    upperData: upperData,
});

const updateUpperDataFront = (upperDataFront) => ({
    type: constants.UPDATE_UPPER_DATA_FRONT_RYS,
    upperDataFront: upperDataFront
});


export const updateUpperDataLast = (upperDataLast) => ({
    type: constants.UPDATE_UPPER_DATA_LAST_RYS,
    upperDataLast: upperDataLast
});

export const updateBottomData = (bottomData) => ({//更新下表的数据
    type: constants.UPDATE_BOTTOM_DATA_RYS,
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
export const getData = (tableName, date, upperDataFront, upperDataLast, bottomData) => {
    return (dispatch) => {
        //TODO 需求不明确 中半段

        getZKSOldData(
            URL.ZKS_QUERT,
            getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            tableName,
            null,
            bottomData
        )
            .then((response) => {
                dispatch(updateData(
                    response[1]//下表
                ));
                dispatch(getFrontData(upperDataFront))//请求转发
                dispatch(getLastData(upperDataLast))//请求转发
            })
            .catch(
                //TODO
            )
    }
}

//得到入窑生料化学分析单的SiO2~MgO的数据
export const getFrontData = (upperDataFront) => {
    return (dispatch) => {
        getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('RMC', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'RMC',//从入窑生料化学分析报告单获取
            1,//有标准
            upperDataFront
        )
            .then((response) => {
                dispatch(updateUpperDataFront(response))//转发更新上表前半段数据
            })
            .catch(
                //TODO
            )
    }
}

export const getLastData = (upperDataLast) => {
    return (dispatch) => {//中间件请求
        getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'CRO',//从入窑生料化学分析报告单获取
            1,//有标准
            upperDataLast
        )
            .then((response) => {
                dispatch(updateUpperDataLast(response))//转发更新上表后半段数据
            })
            .catch(
                //TODO
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
                    //dispatch(updateUpperDataMiddle(data))//最后转发给updateUpperData来更新数据

                } else if (tableType === 2)//下表
                    dispatch(updateBottomData(data))
            })
            .catch(
                //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
            )
    }
}