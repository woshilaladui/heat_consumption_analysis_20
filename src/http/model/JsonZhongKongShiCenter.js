/**
 * @author zm
 * @function 中控室类json中心
 */

/*****************************************中控室类json*****************************************/
import moment from "moment";

/**
 *
 * @param date
 * @param index 指的是具体是第几行数据，反应再化验室表格中代指第几小时
 * @param department
 * @param duty
 * @param tableName
 * @param authority
 * @param data
 * @param num
 */
export function getSaveZhongKongShiDataJson(
    {
        date,
        index,
        departmentId,
        tableName,
        userId,
        data,
        num
    }
) {

    let tempData = [{}];
    let newDate =moment().format("YYYY-MM-DD")
    if(num === 1){
        tempData = [{
            date:newDate,
            index:index,
            departmentId:departmentId,
            tableName:tableName,
            userId:userId,
            data:data[index]['data'].join(',')
        }];
    }else {

        let j = 0;
        for (let i = 0; i < num; i++) {
            if (data[i]['data'].join(',') !== '') {
                tempData[j] = {
                    "date": newDate,
                    "index": i,
                    "departmentId": departmentId,
                    "userId": userId,
                    "tableName": tableName,
                    "data": data[i]['data'].join(','),
                }
                j++;
            }
        }//end for

    }
    return tempData

}