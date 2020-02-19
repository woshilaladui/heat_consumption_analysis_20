import {RequestCenter} from "../request/RequestCenter"
import {RequestMethod, URL} from "../constant/Constant";
import {getSaveHuaYanShiDataJson} from "../model/JsonHuaYanShiCenter"
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
){

    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('date', date);
        formData.append('tableName', tableName);//获取当前的用户id

        RequestCenter({
            url:URL.REQUEST_GET_HUAYANSHI_DATA_BY_TABLENAME_AND_DATE,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetHuaYanShiDataByTableNameAndDate
                resolve(response)
            })
            .catch()
    });

}

export function requestSaveHuaYanShiData(
    date,
    index,
    department,
    duty,
    tableName,
    authority,
    data,
    num
) {
    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_SAVE_HUAYANSHI_DATA,
            jsonData:getSaveHuaYanShiDataJson(//获取对应的json
                {
                    date:date,
                    index:index,
                    department:department,
                    duty:duty,
                    tableName:tableName,
                    authority:authority,
                    data:data,
                    num:num
                }
            ),
            flag:RequestMethod.jsonDta,
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestSaveHuaYanShiData
                resolve(response)
            })
            .catch()
    });

}



