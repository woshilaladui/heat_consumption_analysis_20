/**
 * @author zm
 * @function 标准类json中心
 */


/*****************************************标准类json*****************************************/

export function getSaveStandardJson(
    tableName,
    startValue,
    endValue,
    reason,
    createdAt,
    person
){
    let tempData = [{
        tableName:tableName,
        startValue:startValue,
        endValue:endValue,
        reason:reason,
        username:person,
    }]

    return tempData

}