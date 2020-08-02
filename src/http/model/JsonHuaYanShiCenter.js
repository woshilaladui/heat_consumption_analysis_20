import moment from 'moment';
/**
 * @author zm
 * @function 化验室类json中心
 */

/*****************************************化验室类json*****************************************/


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
export function getSaveHuaYanShiDataJson(
    {
        date,
        index,
        departmentId,
        tableName,
        userId,
        data,//为化验室该表的集合数据
        num = 1,//默认提交单行数据
    }
) {
    let tempData = [{}];
    let newDate =moment().format("YYYY-MM-DD")
    // let NewDateNum = moment( date.toString()).format('x')
    // let newDate =moment(NewDateNum).format("YYYY-MM-DD")
    // console.log('1111111')
    // console.log(date.toString())
    // console.log(NewDateNum)
    // console.log(newDate)
    // console.log('1111111')
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
    return  tempData

}