import {HuaYSOrder_JC,HuaYSOrder_CMRYSL} from "../Constant/TableOrder";
import {JCYCL,CMRYSL} from "../Constant/JCstadnard";
import {numCalculate_Initial, numCalculate, autoCalculate, divisionCalculate} from "../package/NumCalculate"

/**
 * 化验室的计算
 */
/***************************************进场原材料*****************************************/

export function autoCalculateRMA_IL(hour,NewData) {//自动计算进场原材料的IL
    NewData[hour]["t_data"][HuaYSOrder_JC.IL] = autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_JC.CaO], JCYCL.IL_firstArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.MgO], JCYCL.IL_secondArg]
        ]);
}

export function autoCalculateRMA_HJ(hour,NewData) {//自动计算进场原材料的IL
    NewData[hour]["t_data"][HuaYSOrder_JC.HJ] = autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_JC.IL], JCYCL.IL_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.SiO2], JCYCL.SiO2_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.Al2O3], JCYCL.Al2O3_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.Fe2O3], JCYCL.Fe2O3_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.CaO], JCYCL.CaO_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_JC.MgO], JCYCL.MgO_averageArg],
        ]
    );
}
/**************************************************************************************/

/*****************************************出磨入窑生料**********************************************/
export function autoCalculateRMC_HJ(hour,NewData) {//自动计算出磨入窑生料的合计
    NewData[hour]["t_data"][HuaYSOrder_CMRYSL.HJ] = autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.IL], CMRYSL.IL_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.SiO2], CMRYSL.SiO2_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Al2O3], CMRYSL.Al2O3_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Fe2O3], CMRYSL.Fe2O3_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.CaO], CMRYSL.CaO_averageArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.MgO], CMRYSL.MgO_averageArg],
        ]
    );
}
export function autoCalculateRMC_IL(hour,NewData) {//自动计算出磨入窑的IL
    NewData[hour]["t_data"][HuaYSOrder_CMRYSL.IL] = autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.CaO], CMRYSL.IL_firstArg],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.MgO], CMRYSL.IL_secondArg]
        ]);
}

export function autoCalculateRMC_KH(hour,NewData) {//自动计算出磨入窑的IL
     let temp= autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.CaO], CMRYSL.KH_CaO],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Fe2O3], CMRYSL.KH_Fe2O3],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Al2O3], CMRYSL.KH_Al2O3]
        ]);
    NewData[hour]["t_data"][HuaYSOrder_CMRYSL.KH]=divisionCalculate(temp,CMRYSL.KH_SiO2*NewData[hour]["t_data"][HuaYSOrder_CMRYSL.SiO2])
}
export function autoCalculateRMC_N(hour,NewData) {//自动计算出磨入窑的N
    let temp= autoCalculate(
        [
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Fe2O3], CMRYSL.KH_Fe2O3],
            [NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Al2O3], CMRYSL.KH_Al2O3]
        ]);
    NewData[hour]["t_data"][HuaYSOrder_CMRYSL.N]=divisionCalculate(NewData[hour]["t_data"][HuaYSOrder_CMRYSL.SiO2],temp)
}
export function autoCalculateRMC_P(hour,NewData) {//自动计算出磨入窑的P

    NewData[hour]["t_data"][HuaYSOrder_CMRYSL.P]=divisionCalculate(NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Al2O3],NewData[hour]["t_data"][HuaYSOrder_CMRYSL.Fe2O3])
}
/**************************************************************************************/
/**
 *
 * @param Data
 * @param index 默认为-1，代表提交整张表
 * @param num 默认我24 更新24行
 */
export function updateOperator({Data,index = -1,num = 24}){
    //依此判断24行数据，不为空的时候更新操作人员
    if(index ===-1){//提交整张表
        for(let i=0;i<num;i++){
            if(Data[i]['t_data'].join(',')!==''){
                Data[i]['user'] = window.localStorage.name;

                console.log("updateOperator")

            }
        }//end for
    }else{//暂存一行
        Data[index]['user'] = window.localStorage.username;

    }
}
