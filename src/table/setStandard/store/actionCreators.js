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
export const changeTimeChose = (tableChose) => ({
    type: constants.CHANGE_TABLE_CHOSE_STANDARD,
    tableChose: tableChose
});

//时间更新员工
export function doChangeTimeChose(tableChose) {

    return (dispatch) => {
        dispatch(changeTimeChose(tableChose));
    }

}


//更新数据的老总
export const updateData = (startValue,endValue,reason) => ({
    type: constants.UPDATE_DATA_STANDARD,
    startValue: startValue,
    endValue:endValue,
    reason:reason
});





//更新数据的员工
export function getData(
    tableName,
) {

    return (dispatch) => {
        //工具

        requestGetStandardDataByTableName(tableName).then((response)=>{

            if(response === Mark.SUCCESS){

                let newData = deepCopy(response['data']);

                let result = StandardFormat(
                    newData,
                );

                dispatch(updateData(//将获取到的数据进行转发
                    result[0],
                    result[1],
                    result[2]
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
    createdAt
) {

    return (dispatch) => {

        requestSetStandard(
            tableName,
            startValue,
            endValue,
            reason,
            createdAt
        ).then((response)=>{

            if(response === Mark.SUCCESS){
                message.info('提交成功');
            }

        })

    }//end return
}//end saveData


