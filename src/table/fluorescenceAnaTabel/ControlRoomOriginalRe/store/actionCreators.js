import * as constants from './constants';
import {getHuaYSOldData, getStandard, HuaYSSave} from "../../../../Request/RequsetCenter";

import {getHuaYSJsonData, getHuaYSJsonSaveData} from "../../../../Request/JsonCenter";
import {message} from "antd";
import {updateOperator} from "../../../../Helper/AutoCalculate";
import {URL} from "../../../../Request/Constant";
import moment from 'moment';
import {requestGetZhongKongShiDataByTableNameAndDate} from "../../../../http/request/RequestZhongKongShi";
import {deepCopy} from "../../../../Helper/Copy";
import {HuaYanShiFormat, ZhongKongShiFormat} from "../../../../Helper/Format";
import {
    requestGetHuaYanShiDataByTableNameAndDate,
    requestSaveHuaYanShiData
} from "../../../../http/request/RequestHuaYanShi";
import {Mark, Table} from "../../../../http/constant/Constant";


/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTimeChose = (timeChose) => ({
    type: constants.CHANGE_TIME_CHOSE_CRO,
    timeChose: timeChose
})

/**
 * 内部方法不对外公开，用于将获取的数据进行存储更新
 * @param upperData
 * @param data
 * @returns {{upperData: *[], bottomData: *[], type: string}}
 */
export const updateData = ({data}) => ({
    type: constants.UPDATE_DATA_CRO,
    data: data
});

export const updateUpperData = (data) => ({//更新上表的数据
    type: constants.UPDATE_UPPER_DATA_CRO,
    data: data,
});

export const updateBottomData = (bottomData) => ({//更新下表的数据
    type: constants.UPDATE_BOTTOM_DATA_CRO,
    bottomData: bottomData,
});

//更新标准
export const updateStandard = (startValue,endValue)=>({
    type:constants.UPDATE_STANDARD_CRO,
    startValue:startValue,
    endValue:endValue
})

/**
 *
 * @param tableName
 * @param date
 * @param data 参数为提供数据模型
 * @returns {Function}
 */
export const getData = (date, tableName, data) => {
    return (dispatch) => {
        console.log('date,table,data')
        console.log(date)
        console.log(tableName)
        console.log(data)
        console.log('date,table,data')

        requestGetHuaYanShiDataByTableNameAndDate(
            date,
            tableName,
            data
        ).then((response) => {
            console.log('date,table,data-------response')

            console.log(response)

            console.log('date,table,data-------response')

            if(response['code'] === 0){

                //解析处理数据
                let newData = deepCopy(response['data'])

                let result = HuaYanShiFormat(
                    data,
                    newData,
                    tableName
                );

                dispatch(updateData({//将获取到的数据进行转发
                    data: result[0]
                }));
            }



        });//end requestGetHuaYanShiDataByTableNameAndDate
    }
};//end getData

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
            .then((response) => {
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


        requestSaveHuaYanShiData({
            date: date,
            index: index,
            duty: window.localStorage.duty,
            tableName: tableName,
            authority: window.localStorage.authority,
            data: data,
            num: num
        }).then((response) => {

            if(response['code'] === Mark.SUCCESS){
                message.info('提交成功');
            }else {
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
                        num: num
                    });//该表有30行数据

                dispatch(updateData({data:data}))//最后转发给updateData来更新数据

            }else {
                dispatch(updateData({data:data}))
            }

        });//end requestSaveHuaYanShiData
    }

}