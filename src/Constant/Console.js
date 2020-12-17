
let consoleVersion = [0];

let emptyFunc = function(){}

let _log = function(version){
  if(consoleVersion.includes(version)){
    return console.log;
  }else{
    return emptyFunc;
  }
}
export default _log;