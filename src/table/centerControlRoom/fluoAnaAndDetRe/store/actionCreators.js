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
    data,
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
                        tableName,
                    );
                  if(result[0] != 0 ) {
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
    data,
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
                        tableName,
                    );
                  if(result[0] != 0 ) {
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
    data,
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
                        tableName,
                      );
                      if (result != 0 ) {
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


