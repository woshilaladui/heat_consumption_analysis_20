import {RequestCenter} from "../request/RequestCenter"
import {RequestMethod, URL} from "../constant/Constant";
import {getUpdateUserInfJson} from "../model/JsonUserCenter"

/**
 * @author zm
 * @function 用户请求方法中心
 */

/*****************************************用户类请求******************************************/
export function requestUserLogin(
    phone,
    password
) {
    return new Promise((resolve, reject) => {

        //拼接请求体
        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('password', password);//获取当前的用户id

        RequestCenter({
            url:URL.REQUEST_LOGIN,
            formData:formData
        })
            .then((response) => {
                //直接回传

                //TODO 进一步处理数据 requestUserLogin
                resolve(response)
            })
            .catch()
    });

}

export function requestRegister(
    username,
    phone,
    password
){
    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('phone', phone);
        formData.append('password', password);//获取当前的用户id

        RequestCenter({
            url:URL.REQUEST_REGISTER,
            formData:formData
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestRegister
                resolve(response)
            })
            .catch()
    });
}

export function requestGetAllUsers(){
    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_GET_ALL_USERS,
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestGetAllUsers
                resolve(response)
            })
            .catch()
    });
}

//需高级别权限
export function requestUpdateUserInf(
    id,
    username,
    phone,
    state,
    department,
    duty,
    authority
){
    return new Promise((resolve, reject) => {

        RequestCenter({
            url:URL.REQUEST_UPDATE_USER,
            jsonData:getUpdateUserInfJson(//获取对应的json
                id,
                username,
                phone,
                state,
                department,
                duty,
                authority
            ),
            flag:RequestMethod.jsonDta,
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestUpdateUserInf
                resolve(response)
            })
            .catch()
    });
}

export function requestAddUsers(
    file
){
    return new Promise((resolve, reject) => {


        const formData = new FormData();
        formData.append('filename', file);

        RequestCenter({
            url:URL.REQUEST_ADD_USERS,
            formData:formData
        })
            .then((response) => {
                //直接回传 不进一步解析
                //TODO 进一步处理数据 requestAddUsers
                resolve(response)
            })
            .catch()
    });
}