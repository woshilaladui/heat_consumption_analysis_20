import * as constants from './constants';

import {message} from "antd";

import {
    requestGetStandardDataByTableName,
    requestSetStandard
} from "../../../http/request/RequestStandards";

import {deepCopy} from "../../../Helper/Copy";

import {
    Mark,
} from "../../../http/constant/Constant"
import {StandardFormat} from "../../../Helper/Format";

/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTabChose = (tableChose) => ({
    type: constants.CHANGE_TABLE_CHOSE_STANDARD,
    tableChose: tableChose
});

//时间更新员工
export function doChangeTabChose(tableChose,tableName) {

    return (dispatch) => {
        dispatch(changeTabChose(tableChose));

        dispatch(getData(tableName));
    }

}


//更新数据的老总
export const updateOldData = (oldStartValue,oldEndValue,oldReason,oldUsername) => ({
    type: constants.UPDATE_DATA_OLD_STANDARD,
    oldStartValue: oldStartValue,
    oldEndValue:oldEndValue,
    oldReason:oldReason,
    oldUsername:oldUsername
});

export const updateNewStartValue = (newStartValue) => ({
    type: constants.UPDATE_DATA_NEW_STANDARD_NEW_START_VALUE,
    newStartValue: newStartValue,
});

export const updateNewEndValue = (newEndValue) => ({
    type: constants.UPDATE_DATA_NEW_STANDARD_NEW_END_VALUE,
    newEndValue: newEndValue,
});

export const updateNewReason = (newReason) => ({
    type: constants.UPDATE_DATA_NEW_STANDARD_NEW_REASON,
    newReason: newReason,
});

//更新数据的老总
export const updateNewdData = (newStartValue,newEndValue,newReason,newUsername) => ({
    type: constants.UPDATE_DATA_NEW_STANDARD,
    newStartValue: newStartValue,
    newEndValue:newEndValue,
    newReason:newReason,
    newUsername:newUsername
});





//更新数据的员工
export function getData(
    tableName,
) {

    return (dispatch) => {
        //工具

        requestGetStandardDataByTableName(tableName).then((response)=>{


            if(response['code'] === Mark.SUCCESS){


                let newData = deepCopy(response['data']);

                let result = StandardFormat(
                    newData,
                );

                dispatch(updateOldData(//将获取到的数据进行转发
                    result[0],
                    result[1],
                    result[2],
                    result[3]
                ));
            }

        });


    }//end return
}//end getData

export function saveData(
    tableName,
    startValue,
    endValue,
    reason,
    createdAt,
    person
) {

    let request_startValue = startValue.toString();
    let request_endValue = endValue.toString();
    let request_reason = reason.toString();

    return (dispatch) => {

        requestSetStandard(
            tableName,
            request_startValue,
            request_endValue,
            request_reason,
            createdAt
        ).then((response)=>{

            if(response['code'] === Mark.SUCCESS){
                message.info('提交成功');

                //新更新的数据就变成久数据
                dispatch(updateOldData(//将获取到的数据进行转发
                    startValue,
                    endValue,
                    reason,
                    person
                ));

                //新数据输入栏清空
                dispatch(updateNewdData(//将获取到的数据进行转发
                    [],
                    [],
                    [],
                    ''
                ));
            }

        })

    }//end return
}//end saveData


