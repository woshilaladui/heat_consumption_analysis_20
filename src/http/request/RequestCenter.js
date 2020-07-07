import {Mark,URL,RequestMethod} from "../../../src/http/constant/Constant";
import {deepCopy} from "../../Helper/Copy";

/**
 *
 * @author zm
 *
 * @function 所有请求方法的中心
 *
 */

/**
 * 基于Promise封装
 *
 * 所有请求经过的请求中心
 *
 * 该方法不对外暴露
 *
 * @param Url
 * @param JsonData
 * @returns {Promise<any>}
 * @constructor
 */
/**
 *
 * @param url
 * @param jsonData
 * @param formData  flag = 0 时候开启参数式请求
 * @param flag 用于标注是附带json请求还是参数请求
 * @param method 默认为post
 * @constructor
 */
export function RequestCenter(
    {
        url,
        jsonData,
        formData,
        flag = RequestMethod.formData,//默认为参数请求
        method = "POST"//默认为post
    }) {

    if(flag === RequestMethod.formData){//formData 请求 参数请求

        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: method,
                body: formData, // data can be `string` or {object}!
                headers: {
                    //"Content-Type": "application/json",
                    'authorization': window.localStorage.authorization,//携带token
                }
            })
                .then(res =>{
                    return  res.json()})

                .then(data => {
                    console.log('datesss')
                    console.log(data)
                    console.log('datesss')
                    if (data['code'] === Mark.SUCCESS ) {//判定是否成功


                        resolve(deepCopy(data));

                    }else if(data['code'] === Mark.SUCCESS_NO_DATA){
                        resolve(deepCopy(data));
                        // resolve(Mark.SUCCESS_NO_DATA)//标记为无数据

                    }
                    else if(data['code'] === Mark.ERROR){
                        console.log('dateerrosss')
                        console.log(data)
                        console.log('dateroorsss')
                        resolve(deepCopy(data));
                    }
                })
                .catch(function(error) {
// 处理 getJSON 和 前一个回调函数运行时发生的错误
                    console.log('发生错误！', error);
                })
        });//JSON.stringify(jsonData),

    }else {//附带json式请求
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: method,
                body: JSON.stringify(jsonData), // data can be `string` or {object}!
                headers: {
                    "Content-Type": "application/json",
                    'authorization': window.localStorage.authorization,//携带token
                }
            })
                .then(res =>{
                    return  res.json()})

                .then(data => {
                    if (data['code'] === Mark.SUCCESS) {//判定是否成功
                        resolve(deepCopy(data));
                    } else {
                        //TODO 错误
                    }
                })
                .catch(error => console.error('Error:', error))
        });//JSON.stringify(jsonData),
    }

}//end RequestCenter







