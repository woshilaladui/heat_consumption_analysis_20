export function deepCopy(Object){
    return JSON.parse(JSON.stringify(Object))
}