import {RequestCenter} from "../request/RequestCenter"
import {RequestMethod, URL} from "../constant/Constant";
import {getSaveHuaYanShiDataJson} from "../model/JsonHuaYanShiCenter"
import {HuaYanShiFormat} from "../../../src/Helper/Format"
import {Mark} from "../constant/Constant"
import {deepCopy} from "../../Helper/Copy"

import moment from 'moment';

/**
 * @author zm
 * @function 化验室方法请求中心
 */

/**
 *
 *
 * @param date
 * @param tableName
 * @param data 为页面中该表（24行数据）
 * @returns {Promise<any>}
 */
export function requestGetHuaYanShiDataByTableNameAndDate(
    date,
    tableName,
    data
) {

    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('date', date);
        formData.append('tableName', tableName);//获取当前的用户id

        RequestCenter({
            url: URL.REQUEST_GET_HUAYANSHI_DATA_BY_TABLENAME_AND_DATE,
            formData: formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetHuaYanShiDataByTableNameAndDate

                //无数据的时候不处理
                // if(response === Mark.SUCCESS_NO_DATA){
                //
                //     //直接回传以前的数据
                //     resolve(data)
                //
                // }else {
                //     //深拷贝
                //     //let newData = JSON.parse(JSON.stringify(response))
                //     let resultResponse = deepCopy(response);
                //     let newData = deepCopy(response['data']);
                //
                //
                //     let result = HuaYanShiFormat(
                //         data,
                //         newData,
                //         tableName
                //     );
                //
                //     resultResponse.data = result;
                //
                //     resolve(resultResponse)
                // }


                //统一交给调用者处理
                resolve(response)
            })
            .catch()
    });

}

export function getHuaYanShiDataDifferenceValueBytableNameAndDate(
    date,
    tableName,
    data
) {

    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('today', date);
        formData.append('yesterday', moment(date).subtract(1,"days").format("YYYY/MM/DD"));
        formData.append('tableName', tableName);

        RequestCenter({
            url: URL.REQUEST_GET_HUAYANSHI_ELEC_DATA,
            formData: formData
        })
            .then((response) => {
                resolve(response)
            })
            .catch()
    });

}


export function requestSaveHuaYanShiData(
    {
        date,
        index,
        departmentId,
        tableName,
        id,
        data,
        num,
    }
) {

    return new Promise((resolve, reject) => {
        RequestCenter({
            url: URL.REQUEST_SAVE_HUAYANSHI_DATA,
            jsonData: getSaveHuaYanShiDataJson(//获取对应的json
                {
                    date: date,
                    index: index,
                    departmentId: departmentId,
                    tableName: tableName,
                    userId: id,
                    data: data,
                    num: num
                }
            ),
            flag: RequestMethod.jsonDta,
        })
            .then((response) => {
                console.log('response')
                console.log(response)
                console.log('response')
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestSaveHuaYanShiData
                resolve(response)
            })
            .catch(function(error) {
// 处理 getJSON 和 前一个回调函数运行时发生的错误
                console.log('发生错误！', error);
            })
    });

}



