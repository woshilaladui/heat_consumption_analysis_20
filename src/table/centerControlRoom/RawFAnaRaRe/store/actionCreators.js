import * as constants from './constants';
import {getZKSOldData, getOldData, ZKSSave, getStandard} from "../../../../Request/RequsetCenter";

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
    type: constants.CHANGE_TIME_CHOSE_CMS,
    timeChose: timeChose
})


const updateData = (upperDataMiddle, bottomData) => ({
    type: constants.UPDATE_DATA_CMS,
    upperDataMiddle: upperDataMiddle,
    bottomData: bottomData
});

export const updateUpperData = (upperData) => ({//更新上表的数据
    type: constants.UPDATE_UPPER_DATA_CMS,
    upperData: upperData,
});

const updateUpperDataFront = (upperDataFront) => ({
    type: constants.UPDATE_UPPER_DATA_FRONT_CMS,
    upperDataFront: upperDataFront
});

export const updateUpperDataMiddle = (upperDataMiddle) => ({
    type: constants.UPDATE_UPPER_DATA_MIDDLE_CMS,
    upperDataMiddle: upperDataMiddle
});

export const updateUpperDataLast = (upperDataLast) => ({
    type: constants.UPDATE_UPPER_DATA_LAST_CMS,
    upperDataLast: upperDataLast
});

export const updateBottomData = (bottomData) => ({//更新下表的数据
    type: constants.UPDATE_BOTTOM_DATA_CMS,
    bottomData: bottomData,
});

//更新标准
export const updateStandard = (startValue,endValue)=>({
    type:constants.UPDATE_STANDARD_CMS,
    startValue:startValue,
    endValue:endValue
})

//得到出模生料化学分析单的SiO2~MgO的数据
export const getFrontData = (upperDataFront) => {
    return (dispatch) => {
        getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('CRM', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'CRM',
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


/**
 * 表的中部需求不明确
 * @param tableName
 * @param date
 * @param upperDataFront
 * @param upperDataMiddle
 * @param upperDataLast
 * @param bottomData
 * @returns {Function}
 */
export const getData = (tableName, date, upperDataFront, upperDataMiddle, upperDataLast, bottomData) => {
    return (dispatch) => {
        //TODO 需求不明确 中半段

        getZKSOldData(//中半部分 请求数据库中的
            URL.ZKS_QUERT,
            getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            tableName,
            upperDataMiddle,
            bottomData
        )
            .then((response) => {
                dispatch(updateData(
                    response[0],//上表的中表部分
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

export const getAllData = (
    tableName,
    date,
    upperDataFront,
    upperDataMiddle,
    upperDataLast,
    bottomData,
    startValue,
    endValue
)=>{
    return(dispatch)=>{
        const upperDataFrontPromise =  getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('CRM', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'CRM',
            1,//有标准
            upperDataFront
        );

        const upperDataMiddlePromise =   getZKSOldData(//中半部分 请求数据库中的
            URL.ZKS_QUERT,
            getZKSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            tableName,
            upperDataMiddle,
            bottomData
        );

        const upperDataLastPromise = getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'CRO',
            1,//有标准
            upperDataLast
        );

        const standardPromise =   getStandard(
            URL.HUAYS_STANDARD,
            {t_name: 'CRM'},
            'CRM',
            startValue,
            endValue
        );

        Promise.all([
            standardPromise,
            upperDataFrontPromise,
            upperDataMiddlePromise,
            upperDataLastPromise
        ])
            .then((result)=>{
                dispatch(updateStandard(
                    result[0].startValue,
                    result[0].endValue
                ))


                dispatch(updateUpperDataFront(result[1]))
                dispatch(updateData(
                    result[2][0],//上表的中表部分
                    result[2][1]//下表
                ));
                dispatch(updateUpperDataLast(result[3]))//转发更新上表后半段数据
            })
            .catch()
    }
}

export const getLastData = (upperDataLast) => {
    return (dispatch) => {//中间件请求
        getOldData(
            URL.HUAYS_QUERY,//请求化验室的出模生料化学分析单
            getHuaYSJsonData('CRO', moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            'CRO',
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
 * 获取该表的标准 从出模生料表中获取
 * @param t_name
 * @param startValue
 * @param endValue
 * @returns {Function}
 */
export const getOldStandard = (t_name, startValue, endValue) => {
    return (dispatch) => {
        getStandard(
            URL.HUAYS_STANDARD,
            {t_name: t_name},
            t_name,
            startValue,
            endValue
        )
            .then((response)=>{
                dispatch(updateStandard(
                    response.startValue,
                    response.endValue
                ))
            })
            .catch()
    }
}


/**
 *
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
                    dispatch(updateUpperDataMiddle(data))//最后转发给updateUpperData来更新数据

                } else if (tableType === 2)//下表
                    dispatch(updateBottomData(data))
            })
            .catch(
                //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
            )
    }
}