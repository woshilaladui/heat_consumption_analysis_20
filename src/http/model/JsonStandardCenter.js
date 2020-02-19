/*****************************************标准类json*****************************************/

export function getSaveStandardJson(
    tableName,
    startValue,
    endValue,
    reason,
    createdAt
){
    let tempData = [{
        tableName:tableName,
        startValue:startValue,
        endValue:endValue,
        reason:reason,
        createdAt:createdAt,
    }]

    return {
        "data": tempData
    };
}