import {deepCopy} from "./Copy";

import {HuaYSOrder_CMRYSL, HuaYSOrder_RMC, AnalysisOrder_YS, AnalysisOrder_RawMaterial} from "../Constant/TableOrder";

import {TableName} from "../Constant/TableNameConstant";
import {HuaYSOrder_JC} from '../Constant/TableOrder'
/*******************************************荧光分析表格*****************************************************/

//计算进厂石灰石原材料分析化学报告单 的合计
export function autoCalculateHJ(data, width) {//data为数组

  let _data = deepCopy(data);

  let num = 0;
  for (let i = 0; i < width; i++) {//排除合计
    //遍历所有数值均不为空且不为NaN

    if (_data[i] != null&&!isNaN(_data[i])&&typeof(_data[i])=="number") {
      num += data[i];
    }

  }
  return num;

}

export function autoCalculate_IL(
  data,
  indexH,//CaO MgO 0.77*CaO+1.09*MgO
) {

  if (data[indexH]['data'][6] != null) {

    data[indexH]['data'][1] = parseFloat((0.77 * data[indexH]['data'][5] + 1.09 * data[indexH]['data'][6]).toFixed(3));

  } else {
    data[indexH]['data'][1] = parseFloat((0.77 * data[indexH]['data'][5]).toFixed(3));
  }

}

export function autoCalculate_KH(
  data,
  indexH,//CaO Fe2O3 Al2O3 SiO2 (CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
  tableName
) {

  //注意SiO2不能为0
  let CaO;
  let Fe2O3;
  let Al2O3;
  let SiO2;


  if (tableName === TableName.Limestone_KAS || tableName === TableName.Limestone_FAS) {
    CaO = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.CaO]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.CaO]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Al2O3]);
    SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.SiO2]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.SiO2]);

    if (SiO2 !== 0) {

      data[indexH]['data'][HuaYSOrder_RMC.KH] = parseFloat(
        ((CaO - 0.35 * Fe2O3 - 1.65 * Al2O3) / (2.8 * SiO2)).toString()
      ).toFixed(3);
    }
  } else if (tableName === TableName.Analysis_BS || tableName === TableName.Analysis_RY) {
    CaO = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.CaO]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.CaO]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]);
    SiO2 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.SiO2]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.SiO2]);

    if (SiO2 !== 0) {

      data[indexH]['data'][AnalysisOrder_RawMaterial.KH] = parseFloat(
        ((CaO - 0.35 * Fe2O3 - 1.65 * Al2O3) / (2.8 * SiO2)).toString()
      ).toFixed(3);
    }
  } else {
    CaO = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.CaO]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.CaO]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]);

    if (SiO2 !== 0) {

      data[indexH]['data'][HuaYSOrder_CMRYSL.KH] = parseFloat(
        ((CaO - 0.35 * Fe2O3 - 1.65 * Al2O3) / (2.8 * SiO2)).toString()
      ).toFixed(3);
    }

  }


}

//计算KH-
export function autoCalculate_KH_1(
  data,
  data_CRO,
  indexH,//CaO Fe2O3 Al2O3 SiO2 (CaO-0.35* Fe2O3-1.65* Al2O3)/2.8*SiO2
  tableName
) {

  //注意SiO2不能为0
  let CaO;
  let Fe2O3;
  let Al2O3;
  let SiO2;
  let fCaO;


  if (tableName === TableName.Limestone_FAS || tableName === TableName.Limestone_KAS) {
    CaO = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.CaO]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.CaO]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Al2O3]);
    SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.SiO2]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.SiO2]);
    fCaO = parseFloat(isNaN(data_CRO[indexH]['data'][0]) ? 0 : data_CRO[indexH]['data'][0]);//0表示在控制室原始记录种第一列为fCao

  }


  if (isNaN(fCaO)) {
    fCaO = 0;
  }

  if (SiO2 !== 0) {

    data[indexH]['data'][HuaYSOrder_RMC.KH_] = parseFloat(
      ((CaO - 0.35 * Fe2O3 - 1.65 * Al2O3 - fCaO) / (2.8 * SiO2)).toString()
    ).toFixed(3);
  }

}

export function autoCalculate_N(
  data,
  indexH,// SiO2/(Al2O3+Fe2O3)
  tableName
) {


  //注意Al2O3+Fe2O3 不能为0
  let SiO2;
  let Al2O3;
  let Fe2O3;

  if (tableName === TableName.Limestone_KAS || tableName === TableName.Limestone_FAS) {
    SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.SiO2]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.SiO2]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]);

    if ((Al2O3 + Fe2O3) !== 0) {
      data[indexH]['data'][HuaYSOrder_RMC.N] = parseFloat(
        (SiO2 / (Al2O3 + Fe2O3)).toString()
      ).toFixed(3);
    }
  } else if (tableName === TableName.Analysis_BS || tableName === TableName.Analysis_RY) {
    SiO2 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.SiO2]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.SiO2]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]);

    if ((Al2O3 + Fe2O3) !== 0) {
      data[indexH]['data'][AnalysisOrder_RawMaterial.N] = parseFloat(
        (SiO2 / (Al2O3 + Fe2O3)).toString()
      ).toFixed(3);
    }
  } else {
    SiO2 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.SiO2]);
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);

    if ((Al2O3 + Fe2O3) !== 0) {
      data[indexH]['data'][HuaYSOrder_CMRYSL.N] = parseFloat(
        (SiO2 / (Al2O3 + Fe2O3)).toString()
      ).toFixed(3);
    }
  }


}

export function autoCalculate_P(
  data,
  indexH,//Al2O3 Fe2O3 Al2O3/ Fe2O3
  tableName
) {
  //注意Fe2O3 不能为0
  let Al2O3;
  let Fe2O3;


  if (tableName === TableName.Limestone_KAS || tableName === TableName.Limestone_FAS) {
    //HuaYSOrder_RMC指的是出窑熟料全分析汇总表
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_RMC.Fe2O3]);

    if (Fe2O3 !== 0) {
      data[indexH]['data'][HuaYSOrder_RMC.P] = parseFloat(
        (Al2O3 / Fe2O3).toString()
      ).toFixed(3);
    }
  } else if (tableName === TableName.Analysis_BS || tableName === TableName.Analysis_RY) {
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]) ? 0 : data[indexH]['data'][AnalysisOrder_RawMaterial.Fe2O3]);

    if (Fe2O3 !== 0) {
      data[indexH]['data'][AnalysisOrder_RawMaterial.P] = parseFloat(
        (Al2O3 / Fe2O3).toString()
      ).toFixed(3);
    }
  } else {
    Al2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Al2O3]);
    Fe2O3 = parseFloat(isNaN(data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]) ? 0 : data[indexH]['data'][HuaYSOrder_CMRYSL.Fe2O3]);

    if (Fe2O3 !== 0) {
      data[indexH]['data'][HuaYSOrder_CMRYSL.P] = parseFloat(
        (Al2O3 / Fe2O3).toString()
      ).toFixed(3);
    }
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
    let passCount = Array(3);
  for (let i = 0; i < width; i++) {
    inputCount[i] = Array(width).fill(0);
  }


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
  data[9 + timeChose * 10]['data'][indexL] = Number(temp * 100).toFixed(1);
}

/**
 *计算出磨生料合格率
 */
export function calculate_pass_rate_cmsl(
  data,
  startValue,
  endValue,
  order,//需要计算合格率的下标
  width,
  timeChose,
  indexL
) {

    let inputCount = Array(3);//3个班次
    let passCount = Array(3);
    let SumAverageCount = Array(3).fill(0);
  for (let i = 0; i < 3; i++) {
    inputCount[i] = Array(3).fill(0);
  }

  for (let i = 0; i < 3; i++) {
    passCount[i] = Array(3).fill(0);
  }

    const KH = 9;const KH_HG = 0;
    const N = 10;const N_HG = 1;
    const P = 11;const P_HG = 2;
    const HJ = 7;
  //计算合格率
    let sum_KH = 0;
    let sum_N = 0;
    let sum_P= 0;
    let sum_HJ = 0;
    console.log("data")
  console.log(parseFloat(data[4]['data'][KH]))
  console.log((data[4]['data'][KH]))
    console.log("data")
  for (let i = 0; i < 8; i++) {

    let index = i + timeChose * 10;
      /**
       * 计算合计的平均值
       */
      if (!isNaN(parseFloat(data[index]['data'][HJ])) && (parseFloat(data[index]['data'][HJ]) != null)) {

          SumAverageCount[timeChose]++;
          console.log("heji"+parseFloat(data[index]['data'][HJ]))
          sum_HJ+=parseFloat(data[index]['data'][HJ]);

      }//end if


    if (!isNaN(parseFloat(data[index]['data'][KH])) && (parseFloat(data[index]['data'][KH]) != null)) {

      inputCount[timeChose][KH_HG]++;

      sum_KH+=parseFloat(data[index]['data'][KH]);
      console.log("sum_KH")
      console.log(data[index]['data'][KH])
      console.log(sum_KH)
      console.log("sum_KH")

      if (parseFloat(data[index]['data'][KH]) >= startValue[KH_HG] && parseFloat(data[index]['data'][KH]) <= endValue[KH_HG]) {
        passCount[timeChose][KH_HG]++;
      }

    }//end if
    if (!isNaN(parseFloat(data[index]['data'][N])) && (parseFloat(data[index]['data'][N]) != null)) {

      inputCount[timeChose][N_HG]++;
        sum_N+=parseFloat(data[index]['data'][N]);

      if (parseFloat(data[index]['data'][N]) >= startValue[N_HG] && parseFloat(data[index]['data'][N]) <= endValue[N_HG]) {
        passCount[timeChose][N_HG]++;
      }

    }//end if
    if (!isNaN(parseFloat(data[index]['data'][P])) && (parseFloat(data[index]['data'][P]) != null)) {

      inputCount[timeChose][P_HG]++;
        sum_P+=parseFloat(data[index]['data'][P]);

      if (parseFloat(data[index]['data'][P]) >= startValue[P_HG] && parseFloat(data[index]['data'][P]) <= endValue[P_HG]){
        passCount[timeChose][P_HG]++;
      }

    }//end if
  }

  //更新合格率
    let temp,temp_ave;
  for(let i = 0; i < 3; i++) {
      temp = (passCount[timeChose][i] * 1.0) / inputCount[timeChose][i];
      data[9 + timeChose * 10]['data'][i+KH] = Number(temp * 100).toFixed(1);
  }
    data[8 + timeChose * 10]['data'][HJ] = (sum_HJ/SumAverageCount[timeChose]).toFixed(2)
    data[8 + timeChose * 10]['data'][KH] = (sum_KH/inputCount[timeChose][0]).toFixed()
    data[8 + timeChose * 10]['data'][N] = (sum_N/inputCount[timeChose][1]).toFixed(2)
    data[8 + timeChose * 10]['data'][P] = (sum_P/inputCount[timeChose][2]).toFixed(2)
}


/**
 *  计算平均值
 * @param data
 * @param timeChoose
 * @param indexL
 * @param tableWidth
 */
export function autoCalculate_average(data, timeChoose, indexL, tableWidth) {


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
//计算IL的平均值
  for (let i = 0; i < 8; i++) {
    let index = i + timeChoose * 10;
    if (!isNaN(parseFloat(data[index]['data'][HuaYSOrder_JC.IL]))
      &&
      (parseFloat(data[index]['data'][HuaYSOrder_JC.IL]) != null)
      &&
      data[index]['data'][HuaYSOrder_JC.IL] != ''
    ) {
      inputCount[timeChoose][HuaYSOrder_JC.IL]++;

      sum[timeChoose][HuaYSOrder_JC.IL] += data[index]['data'][HuaYSOrder_JC.IL];
    }


  }//end for
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
  data[8 + timeChoose * 10]['data'][HuaYSOrder_JC.IL] = ((sum[timeChoose][HuaYSOrder_JC.IL] * 1.0) / inputCount[timeChoose][HuaYSOrder_JC.IL]).toFixed(3);


}

/******************************CRO***************start************************************/
/**
 *  计算平均值
 * @param data
 * @param timeChoose
 * @param indexL
 * @param tableWidth
 * @param HangNum 表格行总数
 */
export function autoCalculate_average_CRO(data, timeChoose, indexL, tableWidth, HangNum = 15) {

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

    let index = i + timeChoose * HangNum;

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
  data[8 + timeChoose * HangNum]['data'][indexL] = ((sum[timeChoose][indexL] * 1.0) / inputCount[timeChoose][indexL]).toFixed(3);


}

export function calculate_pass_rate_CRO(
  data,
  startValue,
  endValue,
  order,//需要计算合格率的下标
  width,
  timeChose,
  indexL,
  hangSum = 15
) {

  let inputCount = Array(3);//3个班次

  for (let i = 0; i < 3; i++) {
    inputCount[i] = Array(width).fill(0);
  }

  let passCount = Array(3);
  for (let i = 0; i < 3; i++) {
    passCount[i] = Array(width).fill(0);
  }


  //计算合格率
  for (let i = 0; i < 8; i++) {

    let index = i + timeChose * hangSum;

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
  let str0 = passCount[timeChose][indexL] + '\/' + inputCount[timeChose][indexL];

  data[9 + timeChose * hangSum]['data'][indexL] = str0;
  data[10 + timeChose * hangSum]['data'][indexL] = Number(temp * 100).toFixed(1);
}


/*******************************************分析表格*****************************************************/
export function autoCalculate_content(
  data,
  indexL
) {

  let titration_1 = parseFloat(isNaN(data[0]['data'][indexL]) ? 0 : data[0]['data'][indexL]);
  if (titration_1 === null) {
    titration_1 = 0;
  }
  let titration_2 = parseFloat(isNaN(data[1]['data'][indexL]) ? 0 : data[1]['data'][indexL]);
  if (titration_2 === null) {
    titration_2 = 0;
  }
  let consume = parseFloat(isNaN(data[2]['data'][indexL]) ? 0 : data[2]['data'][indexL]);
  if (consume === null) {
    consume = 0;
  }

  data[3]['data'][indexL] = ((((titration_1 + titration_2) / 2) * consume) / 0.5).toFixed(3);


}