import {RequestCenter} from "../request/RequestCenter"
import {RequestMethod, URL} from "../constant/Constant";
import {getSaveStandardJson} from "../model/JsonStandardCenter";

/**
 * @author zm
 * @function 标准类方法请求中心
 */

/**
 * 获取全部标准
 *
 * @returns {Promise<any>}
 */
export function requestGetAllStandards(){
    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_GET_ALL_STANDARDS,
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据
                resolve(response)
            })
            .catch()
    });
}

/**
 * 通过表名获取当前表下所有的标准
 *
 * @param tableName
 * @returns {Promise<any>}
 */
export function requestGetStandardsDataByTableName(
    tableName,
){
    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('tableName', tableName);


        RequestCenter({
            url:URL.REQUEST_GET_STANDARDS_DATA_BY_TABLENAME,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetStandardsDataByTableName
                resolve(response)
            })
            .catch()
    });
}


/**
 *通过表名获取当前表下最新的标准
 * @param tableName
 * @returns {Promise<any>}
 */
export function requestGetStandardDataByTableName(
    tableName,
){
    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('tableName', tableName);


        RequestCenter({
            url:URL.REQUEST_GET_STANDARD_DATA_BY_TABLENAME,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetStandardDataByTableName
                resolve(response)
            })
            .catch()
    });
}


/**
 *  设置标准
 * @param tableName
 * @param startValue
 * @param endValue
 * @param reason
 * @param createdAt
 * @returns {Promise<any>}
 */
export function requestSetStandard(
    tableName,
    startValue,
    endValue,
    reason,
    createdAt
){


    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_SET_STANDARD,
            jsonData:getSaveStandardJson(//获取对应的json
                tableName,
                startValue,
                endValue,
                reason,
                createdAt
            ),
            flag:RequestMethod.jsonDta,
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestSetStandard
                resolve(response)
            })
            .catch()
    });

}