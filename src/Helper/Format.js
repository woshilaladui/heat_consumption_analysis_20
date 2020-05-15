import {TableName} from "../Constant/TableNameConstant";

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

    if(isHaveStandard(tableName)){
        //解析标准standard
        let arr_startValue = [], arr_endValue = [];

        let str_startValue = responseData["standard"]["startValue"].split(',');
        let str_endValue = responseData["standard"]["endValue"].split(',');


        for (let i = 0; i < str_startValue.length; i++)
            arr_startValue[i] = parseFloat(str_startValue[i]);


        for (let i = 0; i < str_endValue.length; i++)
            arr_endValue[i] = parseFloat(str_endValue[i]);


        return [resultData, arr_startValue, arr_endValue]
    }else {
        return [resultData];
    }




    //}


}

export function ZhongKongShiFormat(resultData, responseData, tableName) {

    //解析数据data
    for (let i = 0; i < responseData["zhongKongShis"].length; i++) {

        let str_arr = responseData["zhongKongShis"][i]['data'].split(',');//取出data中的数据




        //相当于替换了原来字符串数组，将其变成Number数组
        responseData["zhongKongShis"][i]['data'] = str_arr;

        let data_index = responseData["zhongKongShis"][i]['index'];//取出所在下标


        //将结果赋值到对应位置
        resultData[data_index] = responseData["zhongKongShis"][i];


    }

    return resultData

}

export function updateOperator(
    {
        data,
        index = -1, //默认全部更新
        num
    }) {
    //依此判断24行数据，不为空的时候更新操作人员
    if(index ===-1){//提交整张表
        for(let i = 0;i < num;i++){
            if(data[i]['data'].join(',')!==''){

                data[i]['user'] = window.localStorage.username;

            }
        }//end for
    }else{//暂存一行
        data[index]['user'] = window.localStorage.username;
    }
}


//判断该表是否有标准
function isHaveStandard(tableName) {

    switch (tableName) {
        //分析表格
        case TableName.Analysis_SHS:
        case TableName.Analysis_SY:
        case TableName.Analysis_TF:
        case TableName.Analysis_FMHg:
        case TableName.Analysis_FMHs:
        case TableName.Analysis_BS:
        case TableName.Analysis_RY:
        case TableName.Analysis_CYA:
        case TableName.Analysis_CCA:
        case TableName.Analysis_CYT:
        case TableName.Analysis_CCT:
        case TableName.Analysis_JCM:
        case TableName.Analysis_SMA:
        case TableName.Analysis_MFA:
        case TableName.Limestone_CaCO3://荧光分析表格
        case TableName.Limestone_CRO:
        case TableName.Eletri_ME://电量表格
        case TableName.Eletri_TFKT:

            return false;


        //荧光分析表格
        case TableName.Limestone_SHS:
        case TableName.Limestone_SY:
        case TableName.Limestone_TF:
        case TableName.Limestone_FMHg:
        case TableName.Limestone_FMHs:
        case TableName.Limestone_CRM:
        case TableName.Limestone_RMC:
        case TableName.Limestone_KAS:
        case TableName.Limestone_FAS:
            return true;
        default:
            return false;
    }

}