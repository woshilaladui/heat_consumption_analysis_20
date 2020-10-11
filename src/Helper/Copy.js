/**
 * @author zm
 * @function 拷贝方法
 */


//深拷贝
export function deepCopy(Object){
    if (Object){
    return JSON.parse(JSON.stringify(Object))}
    else {
        console.log("Object")
        console.log(Object)
        console.log("Object")
        return Object
    }
}