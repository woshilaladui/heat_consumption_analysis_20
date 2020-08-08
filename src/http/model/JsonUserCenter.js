/**
 * @author zm
 * @function 用户类json中心
 */

/*****************************************用户类json*****************************************/

export function getUpdateUserInfJson(
    id,
    username,
    phone,
    state,
    department,
    duty,
    authority
) {

    let tempData = [{
        id:id,
        username:username,
        phone:phone,
        state:state,
        department:department,
        duty:duty,
        authority:authority
    }]


    return {
        "data": tempData
    };

}
//
export function getRolesJsonData(
    id,
    rolesArr
) {

    let tempRoleData = {
        userId:id,
        roleIds:rolesArr
    }


    return tempRoleData

}