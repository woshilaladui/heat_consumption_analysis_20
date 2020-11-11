import {RequestCenter} from "../request/RequestCenter"
import {Mark, RequestMethod, URL} from "../constant/Constant";
import {getSaveZhongKongShiDataJson} from "../model/JsonZhongKongShiCenter";
import {HuaYanShiFormat, ZhongKongShiFormat} from "../../Helper/Format"
import {Department} from "../../http/constant/Constant"
import {deepCopy} from "../../Helper/Copy";

/**
 * @author zm
 * @function 中控室方法请求中心
 */

/**
 *
 * @param date
 * @param tableName
 * @param data 为页面中该表（24行数据）
 * @returns {Promise<any>}
 */
export function requestGetZhongKongShiDataByTableNameAndDate(
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
            url: URL.REQUEST_GET_ZHONGKONGSHI_DATA_BY_TABLENAME_AND_DATE,
            formData: formData
        })
            .then((response) => {
                //直接回传
                //TODO 进一步处理数据 requestGetHuaYanShiDataByTableNameAndDate


                //统一交给调用者处理
                resolve(response);

                // //无数据的时候不处理
                // if (response === Mark.SUCCESS_NO_DATA) {
                //
                //     //直接回传以前的数据
                //     resolve(data)
                //
                // } else {
                //     //深拷贝
                //     //let newData = JSON.parse(JSON.stringify(response))
                //
                //
                //
                //     let newData = deepCopy(response['data'])
                //
                //     let result = ZhongKongShiFormat(
                //         data,
                //         newData,
                //         tableName
                //     );
                //
                //
                //
                //     resolve(result)
                // }

            })
            .catch()
    });

}

export function requestSaveZhongKongShiData(
    {
        date,
        index,
        departmentId,
        tableName,
        id,
        data,
        num,
    }) {
    return new Promise((resolve, reject) => {



        RequestCenter({
            url: URL.REQUEST_SAVE_ZHONGKONG_DATA,
            jsonData: getSaveZhongKongShiDataJson(//获取对应的json
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
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestSaveHuaYanShiData


                resolve(response['code'])//取出code用于标识成功还是失败
            })
            .catch(
            )
    });

}

export function requestSaveFeedBackData(
        username,
        classification,
        title,
        content,
    ) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('classification', classification);
        formData.append('title', title);
        formData.append('content', content);
        RequestCenter({
            url: URL.REQUEST_SAVE_FEEDBACK_DATA,
            formData:formData,
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestSaveHuaYanShiData


                resolve(response['code'])//取出code用于标识成功还是失败
            })
            .catch(
            )
    });

}