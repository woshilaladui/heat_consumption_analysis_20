/**化验室表格数据格式整理
 * 参数顺序     旧数据，新数据，表格简写名，表格上下表类型
 **/

export function HYSFormat(OldData, NewData, FormName, FormType) {
    //上表需要多返回指标数据
    if (FormType === 1) {
        let startValue = [], endValue = []
        for (let i = 0; i < NewData.length; i++) {
            //确定数据是同一表格的
            if (NewData[i]['t_name'] === FormName) {
                //确定数据是想要的类型
                if (NewData[i]['t_type'] === FormType) {
                    /**t_type=1是上表数据*/
                    let str = NewData[i]['t_data'].split(',');//取出data中的数据
                    let a = [];//临时的number数据数组
                    for (let i = 0; i < str.length; i++) {

                        a[i] = parseFloat(str[i]);
                    }//将string转换成number{

                    NewData[i]['t_data'] = a;//数据数组归还给NewData
                    const hour = NewData[i]['hour'];//按小时排序把数据传给OldData
                    OldData[hour] = NewData[i];

                    // startValue[hour] = NewData[i]['standard'];
                    // endValue[hour] = NewData[i]['deviation'];
                }
            }
        }
        return [OldData, startValue, endValue]
    } else if (FormType === 2) {
        for (let i = 0; i < NewData.length; i++) {
            //确定数据是同一表格的
            if (NewData[i]['t_name'] === FormName) {
                //确定数据是想要的类型
                if (NewData[i]['t_type'] === FormType) {
                    /**t_type=2是下表数据*/
                        // let str = NewData[i]['t_data'].split(',');//取出data中的数据
                        // let a = [];//临时的number数据数组
                        // for (let i = 0; i < str.length; i++)//将string转换成number
                        //     a[i] = parseFloat(str[i]);
                        // NewData[i]['t_data'] = a;//数据数组归还给
                    const hour = NewData[i]['hour'];//按小时排序把数据传给OldData
                    OldData[hour] = eval(NewData[i]['t_data']);
                }
            }
        }
        return OldData
    }
}


export function ZKSFormat_NEW({upperData = null, middleData = null, bottomData = null, data, tableName}) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]['t_name'] === tableName) {
            let str = data[i]['t_data'].split(',');//取出data中的数据
            let a = [];//临时的number数据数组
            for (let i = 0; i < str.length; i++) {
                if (isNaN(str[i])) {//非数字
                    a[i] = str[i];
                } else {
                    a[i] = parseFloat(str[i]);
                }
            }//将string转换成number
            data[i]['t_data'] = a;
            const index = data[i]['hour'];
            switch (data[i]['t_type']) {
                case 1://上表
                    // data[i]['t_data'] = a;//数据数组归还给data
                    // const hour = NewData[i]['hour'];//按小时排序把数据传给result
                    // result[hour] = NewData[i];
                    upperData[index] = data[i];
                    break;
                case 2://下表
                    bottomData[index] = data[i];
                    break;
                case 3:
                    break;//中表
                default:
                    break;
            }
        }
    }
    return [upperData,bottomData,middleData]
}

// export function HuayanshiRibaoformat({upperData, data, tableName}) {
//     for (let i = 0; i < data.length; i++) {
//         if (data[i]['t_name'] === tableName) {
//             let str = data[i]['t_data'].split(',');//取出data中的数据
//             let a = [];//临时的number数据数组
//             for (let i = 0; i < str.length; i++) {
//                 if (isNaN(str[i])) {//非数字
//                     a[i] = str[i];
//                 } else {
//                     a[i] = parseFloat(str[i]);
//                 }
//             }//将string转换成number
//             data[i]['t_data'] = a;
//             const index = data[i]['hour'];
//             switch (data[i]['t_type']) {
//                 case 1://上表
//                     // data[i]['t_data'] = a;//数据数组归还给data
//                     // const hour = NewData[i]['hour'];//按小时排序把数据传给result
//                     // result[hour] = NewData[i];
//                     upperData[index] = data[i];
//                     break;
//                 case 2://下表
//                     bottomData[index] = data[i];
//                     break;
//                 case 3:
//                     break;//中表
//             }
//         }
//     }
//     return [upperData]
// }
    /**化验室指标数据格式整理
     * 参数顺序     当前起始值 当前终点值 数据库数据
     **/
    export function ZBFormat(startValue, endValue, NewData) {
        const a = NewData["startValue"].split(",");
        const b = NewData["endValue"].split(",");
        for (let i = 0; i < a.length; i++) {
            startValue[i] = parseFloat(a[i])
            // startValue[i] ? startValue[i] :
            endValue[i] = parseFloat(b[i])
            // endValue[i] ? endValue[i] :
        }
        //返回整理了格式之后的指标
        return [startValue, endValue]
    }


    /**设置标准页面格式整理
     * 参数顺序     新数据，起始值，终点值，修改用户，修改时间，修改原因,表格次序
     **/
    export function SetStandardFormat(data, startValue, endValue, username, time, reason, num) {
        const start = data['startValue'].split(',')//去除指标的逗号
        const end = data['endValue'].split(',')//去除指标的逗号
        const rea = data['reason'].split(',')
        //如果有次序(父页面一次获取标准时使用)
        if (num !== undefined) {
            username[num] = data['username']
            time[num] = data['createdAt']
            for (let i = 0; i < startValue.length; i++) {
                startValue[num][i] = parseFloat(start[i])
                endValue[num][i] = parseFloat(end[i])
                reason[num][i] = rea[i]
            }
        }
        //如果无次序(子页面单次获取标准时使用)
        else {
            username = data['username']
            time = data['createdAt']
            for (let i = 0; i < startValue.length || i < start.length; i++) {
                startValue[i] = parseFloat(start[i])
                endValue[i] = parseFloat(end[i])
                reason[i] = rea[i]
            }
        }
        return [startValue, endValue, username, time, reason]
    }

    /**化验室表格数据格式整理
     * 参数顺序     旧数据，新数据，表格简写名，表格上下表类型
     **/
    export function ZKSFormat(result, NewData, FormName, FormType) {


        //上表需要多返回指标数据
        if (FormType === 1) {
            for (let i = 0; i < NewData.length; i++) {

                //确定数据是同一表格的
                if (NewData[i]['t_name'] === FormName) {
                    //确定数据是想要的类型
                    if (NewData[i]['t_type'] === FormType) {
                        /**t_type=1是上表数据*/
                        let str = NewData[i]['t_data'].split(',');//取出data中的数据

                        let a = [];//临时的number数据数组
                        for (let i = 0; i < str.length; i++) {
                            if (isNaN(str[i])) {//非数字
                                a[i] = str[i];
                            } else {
                                a[i] = parseFloat(str[i]);
                            }
                        }//将string转换成number

                        console.log(6767)
                        console.log(NewData)
                        console.log(6767)

                        NewData[i]['t_data'] = a;//数据数组归还给NewData
                        const hour = NewData[i]['hour'];//按小时排序把数据传给result
                        result[hour] = NewData[i];
                    }
                }
            }
            return result
        } else if (FormType === 2) {
            for (let i = 0; i < NewData.length; i++) {
                //确定数据是同一表格的
                if (NewData[i]['t_name'] === FormName) {
                    //确定数据是想要的类型
                    if (NewData[i]['t_type'] === FormType) {
                        /**t_type=2是下表数据*/
                        const hour = NewData[i]['hour'];//按小时排序把数据传给OldData
                        result[hour] = eval(NewData[i]['t_data']);
                    }
                }
            }
            return result
        }
        return result
    }

    /**化验室表格数据格式整理
     * 参数顺序     旧数据，新数据，表格简写名，表格上下表类型
     **/
    export function HYSFormat_toString(OldData, NewData, FormName, FormType) {
        if (FormType === 1) {
            for (let i = 0; i < NewData.length; i++) {
                //确定数据是同一表格的
                if (NewData[i]['t_name'] === FormName) {
                    //确定数据是想要的类型
                    if (NewData[i]['t_type'] === FormType) {
                        /**t_type=1是上表数据*/
                        let str = NewData[i]['t_data'].split(',');//取出data中的数据
                        let a = [];//临时的number数据数组

                        a = str

                        NewData[i]['t_data'] = a;//数据数组归还给NewData
                        const hour = NewData[i]['hour'];//按小时排序把数据传给OldData
                        OldData[hour] = NewData[i];
                    }
                }
            }
            return OldData
        }
    }


    /**
     * 处理进厂原燃材料水分页面的数据
     * @param OldData
     * @param NewData
     * @param FormName
     * @param FormType
     * @constructor
     */
    export function HYSFormat_JCM(OldData, NewData, FormName, FormType) {
        if (FormType === 1) {
            for (let i = 0; i < NewData.length; i++) {
                //确定数据是同一表格的
                if (NewData[i]['t_name'] === FormName) {
                    //确定数据是想要的类型
                    if (NewData[i]['t_type'] === FormType) {
                        /**t_type=1是上表数据*/
                        let str = NewData[i]['t_data'].split(',');//取出data中的数据
                        let a = [];//临时的number数据数组

                        a = str

                        NewData[i]['t_data'] = a;//数据数组归还给NewData
                        const hour = NewData[i]['hour'];//按小时排序把数据传给OldData
                        OldData[hour] = NewData[i];
                    }
                }
            }
            return OldData
        }
    }

// module.exports = {
//     HYSFormat,
//     ZBFormat,
//     SetStandardFormat,
//     ZKSFormat,
//     HYSFormat_toString
// };