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

export const  getVerificationPhoto = () => {
    return (dispatch) => {
        var xmlhttp;

        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp=new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){ 
                //获取返回的token 
                var kaptchaToken = xmlhttp.getResponseHeader("kaptchaToken"); 
                //存起来
                window.localStorage.kaptchaToken = kaptchaToken;
                //处理返回的图片流
                var blob = this.response;
                //新建src图片给到dom节点
                document.getElementById("verificationImg").src=window.URL.createObjectURL(blob);
            }
        }

        xmlhttp.open("GET",URL.REQUEST_VERIFICATION_V2,true);
        //用xhr的blob方式处理返回的图片流
        xmlhttp.responseType = "blob";
        xmlhttp.send();
    }
};


export const getData = (phone,password,verificationCode) => {
    return (dispatch) => {
        requestUserLogin_V2(phone,password,verificationCode)
            .then( (data) =>{
                const d = new Date();
                if(data.code===0){
                    window.localStorage.token = data.data.token;
                    window.localStorage.user = data.data['user'];
                    window.localStorage.id = data.data['user']['id'];
                    window.localStorage.username = data.data['user']['username'];
                    window.localStorage.phone = data.data['user']['phone'];
                    window.localStorage.department = data.data['user']['departmentId'];
                    window.localStorage.detail = data.data['user']['detail'];
                    window.localStorage.authorization = 'nianshao ' + data.data.token;
                    window.localStorage.expiration = data.data.expiration;
                    window.localStorage.countDownTimeFlag = false;
                    window.localStorage.LastLoginDate= data.data.userLoginLog.LastLoginDate;
                    window.localStorage.todoList= data.data.userLoginLog.todoList;
                    window.localStorage.roles = data.data['roles'];
                    window.location.replace(document.referrer);
                }else{
                    message.info(data.msg);
                }
            })
    }
};//end getData
