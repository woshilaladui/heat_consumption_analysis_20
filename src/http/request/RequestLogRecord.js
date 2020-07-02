import {RequestCenter} from "../request/RequestCenter"
import {URL} from "../constant/Constant";

/**
 * @author zm
 * @function 日志方法请求中心
 */


/**
 * 查询全部日志信息
 * @returns {Promise<any>}
 */
export function requestGetAllLogRecords(){
    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_GET_ALL_LOGS,
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetAllLogRecords
                resolve(response)
            })
            .catch()
    });
}

/**
 * 查询某人的全部日志信息
 *
 * @param username
 */
export function requestGetAllLogRecordsByUsername(
    username
){
    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('username', username);

        RequestCenter({
            url:URL.REQUEST_GET_ALL_LOGS_BY_USERNAME,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetAllLogRecordsByUsername
                resolve(response)
            })
            .catch()
    });
}

/**
 * 通过日期区间和用户名查询日志信息（两个参数非必填）
 * @param username
 * @param startDate
 * @param endDate
 * @returns {Promise<any>}
 */
export function requestGetAllLogsByUsernameOrDateBetween({
    username='',
    startDate='2001/01/01',
    endDate='2025/01/01'
                                                         }){

    return new Promise((resolve, reject) => {
        //拼接请求体
        const formData = new FormData();
        formData.append('username', username);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);

        RequestCenter({
            url:URL.REQUEST_GET_ALL_LOGS_BY_USERNAME_AND_DATE,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetAllLogsByUsernameOrDateBetween
                resolve(response)
            })
            .catch()
    });
}

export function requestDeleteLogRecordById(
    id
){
    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('id', id);


        RequestCenter({
            url:URL.REQUEST_DELETE_LOGS,
            formData:formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestDeleteLogRecordById
                resolve(response)
            })
            .catch()
    });
}