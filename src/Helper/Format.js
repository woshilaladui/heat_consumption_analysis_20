export function HuaYanShiFormat(resultData, responseData, tableName) {


    //校验tableName
    //  if (responseData.tableName === tableName) {


    //解析数据data
    for (let i = 0; i < responseData["huaYanShis"].length; i++) {

        let str = responseData["huaYanShis"][i]['data'].split(',');//取出data中的数据


        let arr = [];//临时的number数据数组

        for (let j = 0; j < str.length; j++) {

            arr[j] = parseFloat(str[j]);
        }

        //相当于替换了原来字符串数组，将其变成Number数组
        responseData["huaYanShis"][i]['data'] = arr;

        let data_index = responseData["huaYanShis"][i]['index'];//取出所在下标


        //将结果赋值到对应位置
        resultData[data_index] = responseData["huaYanShis"][i];


    }

    //解析标准standard
    let arr_startValue = [], arr_endValue = [];

    let str_startValue = responseData["standard"]["startValue"].split(',');
    let str_endValue = responseData["standard"]["endValue"].split(',');


    for (let i = 0; i < str_startValue.length; i++)
        arr_startValue[i] = parseFloat(str_startValue[i]);


    for (let i = 0; i < str_endValue.length; i++)
        arr_endValue[i] = parseFloat(str_endValue[i]);


    return [resultData, arr_startValue, arr_endValue]


    //}


}