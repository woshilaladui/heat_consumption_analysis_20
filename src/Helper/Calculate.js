import {deepCopy} from "./Copy";

import {HuaYSOrder_CMRYSL} from "../Constant/TableOrder";

//计算进厂石灰石原材料分析化学报告单 的合计
export function autoCalculateHJ(data,width) {//data为数组

    let _data = deepCopy(data);

    let num = 0;
    for (let i = 0; i < width; i++) {//排除合计
        //遍历所有数值均不为空且不为NaN

        if(_data[i] != null){
            num += data[i];
        }

    }
    return num;

}

export function autoCalculate_IL(
    data,
    indexH,//CaO MgO 0.77*CaO+1.09*MgO
){

    if(data[indexH]['data'][5] != null && data[indexH]['data'][6] != null){

        data[indexH]['data'][1] = parseFloat((0.77*data[indexH]['data'][5] +1.09*data[indexH]['data'][6]).toFixed(3));

    }

}

export function autoCalculate_KH(
    data,
    indexH,//CaO Fe2O3 Al2O3 SiO2 (CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
) {

    //注意SiO2不能为0
    let CaO = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.CaO])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.CaO]);
    let Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);
    let Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    let SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]) ?0:data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]);

    if(SiO2 !== 0){

        data[indexH]['data'][HuaYSOrder_CMRYSL.KH] = parseFloat(
            ((CaO - 0.35 * Fe2O3 - 1.65*Al2O3)/(2.8*SiO2)).toString()
        ).toFixed(3);
    }
    
}

export function autoCalculate_N(
    data,
    indexH,// SiO2/(Al2O3+Fe2O3)
) {


    if(data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2] === null){
        console.log("null")
    }else {
        console.log("aaaa")
    }


    //注意Al2O3+Fe2O3 不能为0
    let SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]);
    let Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    let Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);


    if((Al2O3+Fe2O3) !== 0){
        data[indexH]['data'][HuaYSOrder_CMRYSL.N] = parseFloat(
            (SiO2/(Al2O3 + Fe2O3)).toString()
        ).toFixed(3);
    }

}

export function autoCalculate_P(
    data,
    indexH,//Al2O3 Fe2O3 Al2O3/ Fe2O3
) {
    //注意Fe2O3 不能为0
    let Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3])?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    let Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3] )?0:data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);

    if(Fe2O3 !== 0){
        data[indexH]['data'][HuaYSOrder_CMRYSL.P] = parseFloat(
            (Al2O3/Fe2O3).toString()
        ).toFixed(3);
    }

}

//计算合格率
export function calculate_pass_rate(
    data,
    startValue,
    endValue,
    order,//需要计算合格率的下标
    width,
    timeChose,
    indexL
) {

    let inputCount = Array(3);//3个班次

    for (let i = 0; i < width; i++) {
        inputCount[i] = Array(width).fill(0);
    }

    let passCount = Array(3);
    for (let i = 0; i < width; i++) {
        passCount[i] = Array(width).fill(0);
    }


    //计算合格率
    for (let i = 0; i < 8; i++) {

        let index = i + timeChose * 10;

        //计算需要计算合格率这一列 也就是indexL
        const position = order.indexOf(indexL);//判断此列是否需要计算合格率
        if (!isNaN(parseFloat(data[index]['data'][indexL])) && (parseFloat(data[index]['data'][indexL]) != null)) {

            inputCount[timeChose][indexL]++;

            if (position >= 0) {

                if (parseFloat(data[index]['data'][indexL]) >= startValue[position] && parseFloat(data[index]['data'][indexL]) <= endValue[position]) {
                    passCount[timeChose][indexL]++;
                }
            }
        }//end if
    }

    //更新合格率
    let temp = (passCount[timeChose][indexL] * 1.0) / inputCount[timeChose][indexL];
    data[9 + timeChose * 10]['data'][indexL] = Number(temp * 100).toFixed(1) ;
}


/**
 *  计算平均值
 * @param data
 * @param timeChoose
 *  @param indexL
 */
export function autoCalculate_average(data, timeChoose, indexL,tableWidth) {

    //i = 8 18 28
    let sum = Array(3);

    //累加
    for (let i = 0; i < 3; i++)
        sum[i] = Array(tableWidth).fill(0);

    //存放平均值
    let average = Array(3);//输入的数组

    for (let i = 0; i < 3; i++)
        average[i] = Array(tableWidth).fill(0);

    //表中非空的个数
    let inputCount = Array(3);//3个班次

    for (let i = 0; i < tableWidth; i++) {
        inputCount[i] = Array(tableWidth).fill(0);
    }

    for (let i = 0; i < 8; i++) {

        let index = i + timeChoose * 10;

        if (!isNaN(parseFloat(data[index]['data'][indexL]))
            &&
            (parseFloat(data[index]['data'][indexL]) != null)
            &&
            data[index]['data'][indexL] != ''
        ) {
            inputCount[timeChoose][indexL]++;

            sum[timeChoose][indexL] += data[index]['data'][indexL];
        }


    }//end for

    //计算平均值
    data[8 + timeChoose * 10]['data'][indexL] = ((sum[timeChoose][indexL] * 1.0) / inputCount[timeChoose][indexL]).toFixed(3);


}