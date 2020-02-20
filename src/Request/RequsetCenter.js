import {HYSFormat, ZBFormat, ZKSFormat, ZKSFormat_NEW} from "../package/Format";

import {Table} from "./Constant";

/**
 * 请求中心
 * @param url
 * @param jsondata
 * @returns {Promise<any>}
 * @constructor
 */
function RequestCenter(url, jsondata) {

    //用户传入的接口配置参数

    // let {
    //     method = 'GET',
    //     params = {},
    //     data = {},
    //     timeout = 5000
    // } = configObj;


    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res =>{
                return  res.json()})

            .then(data => {
                if (data['code'] === 0) {//判定是否成功
                    resolve(data['data']);
                } else {
                    //TODO
                }
            })
            .catch(error => console.error('Error:', error))
    });

}

function RequestSaveCenter(url, jsondata) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data['code'] === 0) {//判定是否成功
                    resolve(data);
                } else {
                    //TODO
                }
            })
            .catch(error => console.error('Error:', error))
    });
}

/**
 * 请求标准的中心
 * @param url
 * @param jsondata
 * @returns {Promise<any>}
 * @constructor
 */
function RequestStandardCenter(url, jsondata) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(jsondata), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['code'] === 0) {//判定是否成功
                    resolve(data['standard']);
                } else {
                    //TODO
                }
            })
            .catch(error => console.error('Error:', error))
    });
}


/**
 * 获取页面旧数据 化验室表专用 （旧版，不使用）
 * @param url
 * @param jsondata
 * @param t_name
 * @param standrdFlag 判断是否有标准
 * @param oldData
 * @returns {Promise<any>}
 */
export function getOldData(url, jsondata, t_name, Flag, oldData) {
    return new Promise((resolve, reject) => {
        RequestCenter(url, jsondata)
            .then((response) => {



                let temp = oldData, result;


                let NewData = JSON.parse(JSON.stringify(response))

                if (Flag) {
                    //是否有标准设置
                    result = HYSFormat(temp, NewData, t_name, Table.UPPER_TABLE);




                    resolve(result[0]);
                } else {
                    //
                    result = ZKSFormat(temp, NewData, t_name, Table.UPPER_TABLE);

                    resolve(result);
                }
            })
            .catch()
    });
}


/**
 * 返回荧光的旧数据
 * @param url
 * @param jsondata
 * @param tableName
 * @param upperData
 * @param bottomData
 * @returns {Promise<any>}
 */
export function getHuaYSOldData(url, jsondata, tableName, upperData, bottomData) {
    return new Promise((resolve, reject) => {
        RequestCenter(url, jsondata)
            .then((response) => {

                const tempUpperData = JSON.parse(JSON.stringify(upperData));//注意要拷贝一份出来
                const tempBottomData = JSON.parse(JSON.stringify(bottomData));
                const NewData = JSON.parse(JSON.stringify(response));

                const result = ZKSFormat_NEW({//中控和荧光是一样的数据处理
                    upperData: tempUpperData,
                    bottomData: tempBottomData,
                    data: NewData,
                    tableName: tableName
                });
                /**
                 * result =>[upperData,bottomData,middleData]
                 * result[0]
                 */

                resolve(result)

            })
            .catch()
    });
}

//化验室日报
export function getRiBaoOldData(url, jsondata, tableName, upperData, bottomData) {
    return new Promise((resolve, reject) => {
        RequestCenter(url, jsondata)
            .then((response) => {


                const result = [
                    //化验室表格日报
                    response['RMA_SHS'],//0
                    response['RMA_SY'],//1
                    response['RMA_FMHg'],//2
                    response['RMA_FMHs'],//3
                    response['RMA_TF'],//4
                    response['RAO_SHS'],//5
                    response['RAO_SY'],//6
                    response['RAO_FMHg'],//7
                    response['RAO_FMHs'],//8
                    response['RAO_TF'],//9

                    response['CX_CaCO3'],//10
                    response['Raw_BS'],//11

                    response['RMC'],//12
                    response['CRM'],//13
                    response['Raw_RY'],//14

                    response['KAS'],//15
                    response['FAS'],//16
                    response['NS_CCA'],//17
                    response['NS_CYA'],//18

                    response['NS_CCT'],//19
                    response['NS_CYT'],//20

                    response['CRO'],//21
                ]

                resolve(result)

            })
            .catch()
    });
}


/**
 * 返回中控室的旧数据
 * @param url
 * @param jsondata
 * @param tableName
 * @param upperData
 * @param bottomData
 * @returns {Promise<any>}
 */
export function getZKSOldData(url, jsondata, tableName, upperData, bottomData) {
    return new Promise((resolve, reject) => {
        RequestCenter(url, jsondata)
            .then((response) => {

                const tempUpperData = JSON.parse(JSON.stringify(upperData));//注意要拷贝一份出来
                const tempBottomData = JSON.parse(JSON.stringify(bottomData));
                const NewData = JSON.parse(JSON.stringify(response));

                const result = ZKSFormat_NEW({
                    upperData: tempUpperData,
                    bottomData: tempBottomData,
                    data: NewData,
                    tableName: tableName
                });
                /**
                 * result =>[upperData,bottomData,middleData]
                 * result[0]
                 */
                resolve(result)

            })
            .catch()
    });
}


/**
 *检测权限
 * @param url
 * @param Pros
 */
export function checkAuthority(url) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            credentials: 'include',//为了让浏览器发送包含凭据的请求
            headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.authorization,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data['code'] !== 0) {//失败
                    //resolve(1)//失败
                    resolve(0)//失败 临时屏蔽
                }
            })
            .catch(error => console.error('Error:', error))
    })

}

export function getDataAndStandard(url, jsondata, t_name, Flag, oldData, startValue, endValue) {
    let dataPromise = getOldData(url, jsondata, t_name, Flag, oldData);
    let standardPromise = getStandard(url, jsondata, t_name, startValue, endValue);
    return Promise.all([dataPromise, standardPromise])
        .then((response) => {

        })
        .catch()
}

/**
 * 获取标准
 * @param url
 * @param jsondata
 * @param t_name
 * @param startValue
 * @param endValue
 * @returns {Promise<any>}
 */
export function getStandard(url, jsondata, t_name, startValue, endValue) {
    return new Promise((resolve, reject) => {
        RequestStandardCenter(url, jsondata)
            .then((response) => {

                if (response['t_name'] === t_name) {
                    const a = ZBFormat(startValue, endValue, response)
                    //构造对象返回
                    let temp = {
                        startValue: a[0],
                        endValue: a[1]
                    }
                    resolve(temp);
                }
            })
            .catch()
    });
}

export function HuaYSSave(url, jsonData) {
    return new Promise((resolve, reject) => {
        RequestSaveCenter(url, jsonData)
            .then((response) => {
                if (response['code'] === 0) {
                    resolve(response)
                }
            })
            .catch()
    });
}

export function ZKSSave(url, jsonData) {
    return new Promise((resolve, reject) => {
        RequestSaveCenter(url, jsonData)
            .then((response) => {
                if (response['code'] === 0) {
                    resolve(response)
                }
            })
            .catch()
    });
}

