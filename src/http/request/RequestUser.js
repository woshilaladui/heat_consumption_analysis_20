import {RequestCenter, RequestCenter_V2, RequestCenter_V2_Test} from "../request/RequestCenter"
import {RequestMethod, URL} from "../constant/Constant";
import {getUpdateUserInfJson, getRolesJsonData} from "../model/JsonUserCenter";
import axios from 'axios';

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
      url: URL.REQUEST_LOGIN,
      formData: formData
    })
      .then((response) => {
        //直接回传

        //TODO 进一步处理数据 requestUserLogin
        resolve(response['data'])
      })
      .catch()
  });

}

export function requestUserLogin_V2(
  phone,
  password,
  verificationCode
) {
  return new Promise((resolve, reject) => {

    //拼接请求体
    const formData = new FormData();
    formData.append('username', phone);
    formData.append('password', password);
    formData.append('captchaCode', verificationCode);
    console.log(formData.get("captchaCode"));
    RequestCenter_V2_Test({
      url: URL.REQUEST_AUTHENTICATION_V2,
      formData: formData
    })
      .then((response) => {
        //直接回传
        console.log("response1");
        console.log(response);
        console.log("response1");

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
) {
  return new Promise((resolve, reject) => {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('password', password);//获取当前的用户id

    RequestCenter({
      url: URL.REQUEST_REGISTER,
      formData: formData
    })
      .then((response) => {
        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestRegister
        resolve(response)
      })
      .catch()
  });
}

export function requestGetAllUsers() {
  return new Promise((resolve, reject) => {

    RequestCenter({
      url: URL.REQUEST_GET_ALL_USERS,
    })
      .then((response) => {
        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  });
}

export function requestGetAllUsers_V2() {
  return new Promise((resolve, reject) => {

    RequestCenter_V2({
      url: URL.REQUEST_GET_ALL_USERS_V2,
      method: 'GET'
    })
      .then((response) => {

        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  });
}

//
export function requestSubmitTempRoles(id, rolesArr) {
  return new Promise((resolve, reject) => {

    RequestCenter_V2({
      url: URL.REQUEST_SUBMIT_TEMP_ROLES_V2,
      jsonData: getRolesJsonData(id, rolesArr),
      flag: RequestMethod.jsonDta,
    })
      .then((response) => {

        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  })
}

export function requestSubmitTempUserInfo(id, username, phone) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const time = new Date();
    formData.set('id', id);
    formData.set('username', username)
    formData.set('phone', phone)
    formData.set('updatedAt', time)
    RequestCenter_V2({
      url: URL.REQUEST_SUBMIT_TEMP_USER_INFO_V2,
      formData: formData
    })
      .then((response) => {

        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  })
}

export function requestChangeEnabledValue_V2(username, enabledValue) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('enabled', enabledValue);
    RequestCenter_V2({
      url: URL.REQUEST_ENABLED_VALUE_V2,
      formData: formData
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
) {
  return new Promise((resolve, reject) => {

    RequestCenter({
      url: URL.REQUEST_UPDATE_USER,
      jsonData: getUpdateUserInfJson(//获取对应的json
        id,
        username,
        phone,
        state,
        department,
        duty,
        authority
      ),
      flag: RequestMethod.jsonDta,
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
) {
  return new Promise((resolve, reject) => {

    const formData = new FormData();
    formData.append('filename', file);

    RequestCenter({
      url: URL.REQUEST_ADD_USERS,
      formData: formData
    })
      .then((response) => {
        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestAddUsers
        resolve(response)
      })
      .catch()
  });
}

//校验用户权限
export function requestCheckPermission() {

  return new Promise((resolve, reject) => {

    RequestCenter({
      url: URL.REQUEST_CHECK_PERMISSION,

    })
      .then((response) => {
        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestAddUsers


        resolve(response['data'].permission)
      })
      .catch()
  });

}

//获取验证码图片
export function requestGetVerificationPhoto() {

  return new Promise((resolve, reject) => {

    axios({
      url: URL.REQUEST_VERIFICATION_V2,
      method: 'get',
      headers: {
        //"Content-Type": "application/json",
        'authorization': window.localStorage.authorization,//携带token
      }
    })
      .then((response) => {
        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestAddUsers


        resolve(response)
      })
      .catch()
  });

}

export function requestGetAllRoles_V2() {
  return new Promise((resolve, reject) => {

    RequestCenter_V2({
      url: URL.REQUEST_GET_ALL_ROLE_V2,
      method: 'GET'
    })
      .then((response) => {

        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  });
}

export function requestGetCurrentUserRole_V2(username) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('username', username);
    RequestCenter_V2({
      url: URL.REQUEST_GET_CURRENT_USER_ROLE_V2,
      method: 'POST',
      formData: formData
    })
      .then((response) => {

        //直接回传 不进一步解析
        //TODO 进一步处理数据 requestGetAllUsers
        resolve(response)
      })
      .catch()
  });
}

export function requestSavePermission(data) {
  return new Promise((resolve, reject) => {
    RequestCenter_V2({
      url: URL.REQUEST_SAVE_PERMISSION_V2,
      method: 'POST',
      jsonData: data,
      flag: RequestMethod.jsonDta
    })
      .then(response =>{
          resolve(response)
        }
      )
  })
}