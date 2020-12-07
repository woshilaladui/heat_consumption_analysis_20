/**
 * @author ch
 * @function 各种判断
 */

//根据传入的角色数据，判断是普通员工 true 还是 非普通员工 false
export function roleJudge(roleString){
    //先转成数组
    let rolesArr = roleString.split(',');
    console.log(rolesArr);
    if(
        rolesArr.includes("1") || 
        rolesArr.includes("2") || 
        rolesArr.includes("3") || 
        rolesArr.includes("4")
    ){
        //非普通员工
        return false;
    }else{
        //普通员工
        return true;
    }
}