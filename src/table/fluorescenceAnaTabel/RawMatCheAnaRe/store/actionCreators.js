import * as constants from './constants';
import {message} from "antd";

//导入中控室的请求方法
import {
    requestGetHuaYanShiDataByTableNameAndDate,
    requestSaveHuaYanShiData,
} from "../../../../http/request/RequestHuaYanShi"
import {
    Mark,
    Table
} from "../../../../http/constant/Constant"
import {
    HuaYanShiFormat,
    updateOperator, ZhongKongShiFormat
} from "../../../../Helper/Format"


import {deepCopy} from "../../../../Helper/Copy";


/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const changeTimeChose = (timeChose) => ({
    type: constants.CHANGE_TIME_CHOSE_RMA_SHS,
    timeChose: timeChose
});

//时间更新员工
export function doChangeTimeChose(timeChose) {

    return (dispatch) => {
        dispatch(changeTimeChose(timeChose));
    }

}


export const updateData = ({data}) => ({
    type: constants.UPDATE_DATA_RMA_SHS,
    data: data
});

//更新标准
export const updateStandard = (startValue, endValue) => ({
    type: constants.UPDATE_STANDARD_RMA_SHS,
    startValue: startValue,
    endValue: endValue
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

                //更新标准
                dispatch(updateStandard(result[1], result[2]));
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


        requestSaveHuaYanShiData({
            date: date,
            index: index,
            departmentId: window.localStorage.department,
            tableName: tableName,
            id: window.localStorage.id,
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
                        num: 30
                    });//该表有30行数据

                dispatch(updateData({data:data}))//最后转发给updateData来更新数据

            }else {
                dispatch(updateData({data:data}))
            }

        });//end requestSaveHuaYanShiData
    }

}
