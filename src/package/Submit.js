import {HYSFormat,ZKSFormat} from "./Format";


export function getOldData(url,jsondata,t_name,standrdFlag,oldData,tempData) {

    fetch(url, {
        method: "POST",
        body: JSON.stringify(jsondata), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json",
            'authorization': window.localStorage.authorization,
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data['code'] === 0) {//判定是否成功
                let upperData = oldData,temp ;
                console.log(787)
                console.log(data)
                console.log(787)
                //是否有指标
                if(standrdFlag){
                    temp = HYSFormat(upperData, data['data'], t_name, 1);
                    upperData = temp[0];
                    tempData = upperData;
                    console.log(797)
                    console.log(upperData)
                    console.log(797)
                }else{
                    temp = ZKSFormat(upperData,data['data',t_name,1]);
                    upperData = temp;

                }
                //return upperData;
            }
        })
        .catch(error => console.error('Error:', error))



}



