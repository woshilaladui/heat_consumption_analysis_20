/**
 * @author zm
 * @function 拷贝方法
 */


//深拷贝
export function deepCopy(Object){
    return JSON.parse(JSON.stringify(Object))
}