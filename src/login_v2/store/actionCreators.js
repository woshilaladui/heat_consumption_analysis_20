import * as constants from './constants';
import {message} from "antd";
import { URL} from "../../http/constant/Constant";

import {requestUserLogin, requestGetVerificationPhoto, requestUserLogin_V2} from "../../http/request/RequestUser";






export const changePhone = (data) => ({
    type: constants.CHANGE_PHONE_NUM,
    data: data
});
export const changePassword = (data) => ({
    type: constants.CHANGE_PASSWORD_NUM,
    data: data
});
export const changePhoneVerificationCode = (data) => ({
    type: constants.CHANGE_VERIFICATION_CODE,
    data: data
});

/**
 *

 */

export const   getVerificationPhoto = () => {
    // return (dispatch) => {
    //     requestGetVerificationPhoto()
    //         .then((responsePhoto)=>{
    //             console.log("responsePhoto")
    //             console.log(responsePhoto)
    //             console.log("responsePhoto")
    //         })
    // }
    return (dispatch) => {

    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()

    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("verificationImg").src=URL.REQUEST_VERIFICATION_V2;
            //拿到html的doom结点进行更新src操作

        }
    };
    xmlhttp.open("GET",URL.REQUEST_VERIFICATION_V2,true);
    xmlhttp.send();
    }
};


export const getData = (phone,password,verificationCode) => {


    return (dispatch) => {


        requestUserLogin_V2(phone,password,verificationCode)
            .then( (data) =>{

                const d = new Date();


                if(data.code===0)
                {

                    window.localStorage.token = data.data.token;
                window.localStorage.user = data.data['user'];
                window.localStorage.id = data.data['user']['id'];
                window.localStorage.username = data.data['user']['username'];
                window.localStorage.phone = data.data['user']['phone'];
                // window.localStorage.password = data['user']['password'];
                // window.localStorage.state = data['user']['state'];
                window.localStorage.department = data.data['user']['departmentId'];
                // window.localStorage.duty = data['user']['duty'];
                // window.localStorage.authority = data['user']['authority'];
                window.localStorage.detail = data.data['user']['detail'];
                //
                window.localStorage.authorization = 'nianshao ' + data.data.token;
                window.localStorage.expiration = data.data.expiration;
                window.localStorage.countDownTimeFlag = false;
                window.localStorage.LastLoginDate= data.data.userLoginLog.LastLoginDate;
                window.localStorage.todoList= data.data.userLoginLog.todoList;
                window.localStorage.roles = data.data['roles'];
                // message.info(typeof(window.localStorage.roles))
                // message.info(typeof(data.data['roles']))
                // window.localStorage.time = d.getTime();
                    window.location.href='/'
                    }else {
                    message.info(data.msg);
                }
            })

        // requestGetZhongKongShiDataByTableNameAndDate(
        //     date,
        //     tableName,
        //     data
        // ).then((response) => {
        //
        //
        //     if(response['code'] === 0){
        //
        //         //解析处理数据
        //         let newData = deepCopy(response['data'])
        //
        //         let result = ZhongKongShiFormat(
        //             data,
        //             newData,
        //             tableName
        //         );
        //
        //         dispatch(updateData({//将获取到的数据进行转发
        //             data: result
        //         }));
        //     }
        // });//end requestGetHuaYanShiDataByTableNameAndDate
    }
};//end getData








/**
 *
 * @param index 默认值为0  传入非默认值的时候代表存某一行数据，否则表示存全部数据
 * @param tableType
 * @param tableName
 * @param date
 * @param data
 * @param num 在存全部数据时侯生效，num表示总共要提交的数据量
 * @returns {Function}
 */
// export function saveData({index = 0, tableType = 1, tableName, date, data, num = 1}) {
//     return (dispatch) => {
//         ZKSSave(
//             URL.ZKS_SAVE,
//             getZKSJsonSaveData({//获取封装好的请求头
//                 tableType: tableType,//上表
//                 tableName: tableName,
//                 date: date,
//                 index: index,
//                 data: data,
//                 num: num
//             }))
//             .then((response) => {
//                 if(num ===1)
//                     message.info('暂存成功');
//                 else//为整体提交
//                     message.info('提交成功');
//
//                 if (tableType === 1){//上表
//                     if(num ===1)//存一行数据的时候只修改该行的操作者
//                         updateOperator({Data: data, index: index})
//                     else//为总体提交的时候则当该行数据不为空的时候提交数据
//                         updateOperator({Data: data, num: 24})//该表上表有24行数据
//                     dispatch(updateUpperData(data))//最后转发给updateUpperData来更新数据
//
//                 }
//
//                 else if (tableType === 2)//下表
//                     dispatch(updateBottomData(data))
//             })
//             .catch(
//                 //TODO  中控室烧成系统运行记录 的actionCreators的异常处理
//             )
//     }
// }