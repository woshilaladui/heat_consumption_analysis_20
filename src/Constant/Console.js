
const flag = true;

let emptyFunc = function(){}

let _log = function(value){
  if(flag){
    return console.log(value);
  }else{
    return emptyFunc;
  }
}
export default _log;