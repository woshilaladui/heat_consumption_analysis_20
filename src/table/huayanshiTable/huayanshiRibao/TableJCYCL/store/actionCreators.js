import * as constants from './constants';
import {message} from "antd";
import moment from 'moment';
import {getRiBaoOldData} from '../../../../../Request/RequsetCenter';
import {URL} from "../../../../../Request/Constant";
import {getHuaYSJsonData, getZKSJsonData} from "../../../../../Request/JsonCenter";
import {HYSFormat} from '../../../../../package/Format';

export const getDataHYSRB = (tableName, date, RMA_SHS, RAO_SHS,RMA_SY,RAO_SY,RMA_FMHg,RAO_FMHg,
                             RMA_FMHs,RAO_FMHs,RMA_TF,RAO_TF,CX_CaCO3)=>{
    return (dispatch) => {
        getRiBaoOldData(//中半部分 请求数据库中的
            URL.HUAYSRB_QUERY,
            getHuaYSJsonData(tableName, moment().format("YYYY-MM-DD")),//时间格式YYYY-MM-DD
            tableName,
            RMA_SHS,
            null
        )
            .then((respone) => {
                // console.log("fmhs")
                // console.log(respone)
                // console.log("fmhs")
                /***第一行传值---石灰石**/
                let DataRMA_SHSold = JSON.parse(JSON.stringify(RMA_SHS))
                let DataRMA_SHSnew = JSON.parse(JSON.stringify(respone[0]))
                let DataRMA_SHSnew1=HYSFormat(DataRMA_SHSold,DataRMA_SHSnew,'RMA_SHS',1);
                 let newData_SHSjunzhi=averageNum(7,DataRMA_SHSnew1[0]);
                dispatch(updateRMA_SHSjunzhi(newData_SHSjunzhi));
                let RAO_SHSold = JSON.parse(JSON.stringify(RAO_SHS))
                let RAO_SHSnew = JSON.parse(JSON.stringify(respone[5]))
                let RAO_SHSnew1=HYSFormat(RAO_SHSold,RAO_SHSnew,'RAO_SHS',1);
                dispatch(updateRAO_SHS_YSJL(RAO_SHSnew1[0]));
                /**第5行传值---砂岩泥*/
                let DataRMA_SYold = JSON.parse(JSON.stringify(RMA_SY))
                let DataRMA_SYnew = JSON.parse(JSON.stringify(respone[1]))
                let DataRMA_SYnew1=HYSFormat(DataRMA_SYold,DataRMA_SYnew,'RMA_SY',1);
                let newData_SYjunzhi=averageNum(7,DataRMA_SYnew1[0]);
                dispatch(updateRMA_SYjunzhi(newData_SYjunzhi));
                let RAO_SYold = JSON.parse(JSON.stringify(RAO_SY))
                let RAO_SYnew = JSON.parse(JSON.stringify(respone[6]))
                let RAO_SYnew1=HYSFormat(RAO_SYold,RAO_SYnew,'RAO_SY',1);
                dispatch(updateRAO_SY_YSJL(RAO_SYnew1[0]));
                /**第2行传值---粉煤灰干*/
                let DataRMA_FMHgold = JSON.parse(JSON.stringify(RMA_FMHg))
                let DataRMA_FMHgnew = JSON.parse(JSON.stringify(respone[2]))
                let DataRMA_FMHgnew1=HYSFormat(DataRMA_FMHgold,DataRMA_FMHgnew,'RMA_FMHg',1);
                let newData_FMHgjunzhi=averageNum(7,DataRMA_FMHgnew1[0]);
                dispatch(updateRMA_FMHgjunzhi(newData_FMHgjunzhi));
                let RAO_FMHgold = JSON.parse(JSON.stringify(RAO_FMHg))
                let RAO_FMHgnew = JSON.parse(JSON.stringify(respone[7]))
                let RAO_FNHgnew1=HYSFormat(RAO_FMHgold,RAO_FMHgnew,'RAO_FMHg',1);
                dispatch(updateRAO_FMHg_YSJL(RAO_FNHgnew1[0]));
                /***第三行--粉煤灰湿****/
                let DataRMA_FMHsold = JSON.parse(JSON.stringify(RMA_FMHs))
                let DataRMA_FMHsnew = JSON.parse(JSON.stringify(respone[3]))
                let DataRMA_FMHsnew1=HYSFormat(DataRMA_FMHsold,DataRMA_FMHsnew,'RMA_FMHs',1);
                let newData_FMHsjunzhi=averageNum(7,DataRMA_FMHsnew1[0]);
                dispatch(updateRMA_FMHsjunzhi(newData_FMHsjunzhi));
                let RAO_FMHsold = JSON.parse(JSON.stringify(RAO_FMHs))
                let RAO_FMHsnew = JSON.parse(JSON.stringify(respone[8]))
                let RAO_FMHsnew1=HYSFormat(RAO_FMHsold,RAO_FMHsnew,'RAO_FMHs',1);
                dispatch(updateRAO_FMHs_YSJL(RAO_FMHsnew1[0]));
                /**第四行--铁粉*/
                let DataRMA_TFold = JSON.parse(JSON.stringify(RMA_TF))
                let DataRMA_TFnew = JSON.parse(JSON.stringify(respone[4]))
                let DataRMA_TFnew1=HYSFormat(DataRMA_TFold,DataRMA_TFnew,'RMA_TF',1);
                let newData_TFjunzhi=averageNum(7,DataRMA_TFnew1[0]);
                dispatch(updateRMA_TFjunzhi(newData_TFjunzhi));
                let RAO_TFold = JSON.parse(JSON.stringify(RAO_TF))
                let RAO_TFnew = JSON.parse(JSON.stringify(respone[9]))
                let RAO_TFnew1=HYSFormat(RAO_TFold,RAO_TFnew,'RAO_TF',1);
                dispatch(updateRAO_TF_YSJL(RAO_TFnew1[0]));

                /*********************************仓下******************************************/
                /*****仓下石灰石****/


                console.log("cxxxxxxxxxx")
                console.log(respone[10])
                console.log("cxxxxxxxxxxxxxxx")
            })
    }
}

const updateRMA_SHSjunzhi = ( junzhi) => ({
    type: constants.UPDATE_DATA_RMA_SHS,
    CJSHSjunzhi: junzhi
});
const updateRMA_FMHgjunzhi = ( junzhi) => ({
    type: constants.UPDATE_DATA_RMA_FMHg,
    CJFMHgjunzhi: junzhi
});
const updateRMA_FMHsjunzhi = ( junzhi) => ({
    type: constants.UPDATE_DATA_RMA_FMHs,
    CJFMHsjunzhi: junzhi
});
const updateRMA_TFjunzhi = ( junzhi) => ({
    type: constants.UPDATE_DATA_RMA_TF,
    CJTFjunzhi: junzhi
});
const updateRMA_SYjunzhi = ( junzhi) => ({
    type: constants.UPDATE_DATA_RMA_SY,
    CJSYjunzhi: junzhi
});
const updateRAO_SHS_YSJL = (junzhi ) => ({
    type: constants.UPDATE_DATA_RAO_SHS_YSJL,
    RAO_SHS: junzhi
});
const updateRAO_FMHg_YSJL = (junzhi ) => ({
    type: constants.UPDATE_DATA_RAO_FMHg_YSJL,
    RAO_FMHg: junzhi
});
const updateRAO_FMHs_YSJL = (junzhi ) => ({
    type: constants.UPDATE_DATA_RAO_FMHs_YSJL,
    RAO_FMHs: junzhi
});
const updateRAO_TF_YSJL = (junzhi ) => ({
    type: constants.UPDATE_DATA_RAO_TF_YSJL,
    RAO_TF: junzhi
});

const updateRAO_SY_YSJL = (junzhi ) => ({
    type: constants.UPDATE_DATA_RAO_SY_YSJL,
    RAO_SY: junzhi
});
function  averageNum(width,Data) {
    // let Data = JSON.parse(JSON.stringify(Data1));
    //
    // console.log("让我看看这个Data")
    // console.log(Data[0]['t_data'])
    // console.log("让我看看这个Data")
          let inputCount = Array(width).fill(0);//输入的数组
         let passCount = Array(width).fill(0);//通过的数组
         let average = Array(width).fill(0);//通过的数组

         for (let i = 0; i < width; i++) {
             let temp = 0;//临时中间值
             for (let j = 0; j < 23; j++) {//j是行i是列hour
                 if (!isNaN(Data[j]['t_data'][i]) && Data[j]['t_data'][i]!= null ){
                     inputCount[i]++;
                 }
             }
             //计算均值的部分
             if (inputCount[i] === 0) {
                 temp = null;
             } else {
                 for (let j = 0; j < 23; j++) {
                     if (!isNaN(parseFloat(Data[j]['t_data'][i]))) {
                         temp += parseFloat(Data[j]['t_data'][i]);
                     }
                 }
                 if (isNaN(temp = temp / inputCount[i])) {
                     temp = 0;
                 }
                 temp = temp.toFixed(2);//四舍五入
             }
             average[i] = temp;
         }
         return average;
     }


