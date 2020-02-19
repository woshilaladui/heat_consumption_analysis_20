

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
        department,
        duty,
        tableName,
        authority,
        data,//为化验室该表的集合数据
        num = 1,//默认提交单行数据
    }
) {

    let tempData = [{}];

    if(num === 1){
        tempData = [{
            date:date,
            index:index,
            department:department,
            duty:duty,
            tableName:tableName,
            authority:authority,
            data:data[index]['t_data'].join(',')
        }];
    }else {

        let j = 0;
        for (let i = 0; i < num; i++) {
            if (data[i]['t_data'].join(',') !== '') {
                tempData[j] = {
                    "date": date,
                    "index": i,
                    "department": department,
                    "duty": duty,
                    "tableName": tableName,
                    "authority": authority,
                    "data": data[i]['t_data'].join(','),
                }
                j++;
            }
        }//end for

    }
    return {
        "data": tempData
    };
}