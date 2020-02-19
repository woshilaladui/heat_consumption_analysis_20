import {Department, Section, Authority} from "./Constant";

/**
 *
 * @param t_name
 * @param date
 */
export function getHuaYSJsonData(tableName, date) {

    return {
        startdate: date,
        starthour: 0,
        enddate: date,
        endhour: 23,
        t_name: tableName,
        t_type: 0
    };
}

export function getAnalysisJsonData(tableName, date) {
    return {
        startdate: date,
        starthour: 0,
        enddate: date,
        endhour: 23,
        t_name: tableName,
        t_type: 0
    };
}

export function getZKSJsonData(tableName, date) {
    return {
        startdate: date,
        starthour: 0,
        enddate: date,
        endhour: 23,
        t_name: tableName,
        t_type: 0
    };
}

/**
 *
 * @param department 部门
 * @param section 科室
 * @param personType 操作人的权限
 * @param tableName 表名
 * @param date 时间
 * @param index 存放的行号，默认为0，代表全部表的数据都要存放
 * @param data 存放的数据
 * @param num 要存放的行数总数，默认为1，代表只存一行
 */
export function getJsonSaveData(
    {
        department,
        section,
        tableType = 1,//默认是上表
        tableName,
        date,
        index = 0,
        data,
        num = 1
    }) {

    let tempData = [{}]
    if (num === 1) {//暂存
        tempData = [{
            "date": date,
            "hour": index,//存放到第几列
            "t_department": department,//部门
            "t_section": section,//科室
            "t_name": tableName,
            "t_type": tableType,//上下表的类型
            "t_data": data[index]['t_data'].join(',')
        }]
    } else {//全部存放
        let j = 0;
        for (let i = 0; i < num; i++) {
            if (data[i]['t_data'].join(',') !== '') {
                tempData[j] = {
                    "date": date,
                    "hour": i,
                    "t_department": department,
                    "t_section": section,
                    "t_name": tableName,
                    "t_type": tableType,
                    "t_data": data[i]['t_data'].join(','),
                }
                j++;
            }
        }//end for
    }//end else
    return {
        "data": tempData
    };
}

/**
 * 返回化验室存储数据的json请求
 * @param tableName
 * @param date
 * @param index 为暂存时暂存的行号
 * @param data
 * @param num 默认值为1，若为1的时候说明只提交一行数据也就是暂存 否则是提交n行数据
 * @param tableType 默认为上表
 */
export function getHuaYSJsonSaveData({tableName, date, index = 0, data, num = 1, tableType = 1}) {

    return getJsonSaveData({
        department: Department.HuaYS,
        section: Section.Fluorescence,
        tableType: tableType,
        tableName: tableName,
        date: date,
        index: index,
        data: data,
        num: num
    })

}

export function getZKSJsonSaveData({tableName, date, index = 0, data, num = 1, tableType = 1}) {
    return getJsonSaveData({
        department: Department.ZhongKS,
        section: Section.Fluorescence,
        tableType: tableType,
        tableName: tableName,
        date: date,
        index: index,
        data: data,
        num: num
    })
}

export function getAnalysisJsonSaveData({tableName, date, index = 0, data, num = 1, tableType = 1}) {
    return getJsonSaveData({
        department: Department.HuaYS,
        section: Section.Analysis,
        tableType: tableType,//默认存为上表
        tableName: tableName,
        date: date,
        index: index,
        data: data,
        num: num
    })
}