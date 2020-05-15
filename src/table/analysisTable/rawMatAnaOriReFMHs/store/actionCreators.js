import * as constants from './constants';

import {message} from "antd";
import {updateOperator} from "../../../../Helper/AutoCalculate";



import {HuaYanShiFormat} from "../../../../Helper/Format";

import {
    requestGetHuaYanShiDataByTableNameAndDate,
    requestSaveHuaYanShiData
} from "../../../../http/request/RequestHuaYanShi";

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
    type: constants.CHANGE_TIME_CHOSE_RAO_FMHS,
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
    type: constants.UPDATE_DATA_RAO_FMHS,
    data: data
});





//更新数据的员工
export function getData(
    date,
    tableName,
    data
) {

    return (dispatch) => {
        //工具
        requestGetHuaYanShiDataByTableNameAndDate(
            date,
            tableName,
            data
        ).then((response) => {

            if(response['code'] === 0){
                //解析处理数据
                //解析数据
                let newData = deepCopy(response['data']);
                let result = HuaYanShiFormat(
                    data,
                    newData,
                    tableName
                );

                dispatch(updateData({//将获取到的数据进行转发
                    data: result[0]
                }));

               // dispatch(updateStandard(result[1], result[2]));
            }



        });//end requestGetHuaYanShiDataByTableNameAndDate
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
                        num: 4
                    });//该表有4行数据

                dispatch(updateData({data:data}))//最后转发给updateData来更新数据

            }else {
                dispatch(updateData({data:data}))
            }

        });//end requestSaveHuaYanShiData


    }//end return
}//end saveData


