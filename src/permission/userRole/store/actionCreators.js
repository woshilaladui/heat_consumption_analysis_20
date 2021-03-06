import {
    requestGetAllUsers_V2,
    requestChangeEnabledValue_V2,
    requestUserLogin_V2,
    requestResetPassword,
    requestGetAllRoles_V2,
    requestGetCurrentUserRole_V2,
    requestSubmitTempUserInfo,
    requestSubmitTempRoles,
    requestSubmitNewUserInfo
} from "../../../http/request/RequestUser";
import { deepCopy } from "../../../Helper/Copy";

import * as constants from "./constants";
import { message } from "antd";


export const updateData = ({ data }) => ({
    type: constants.UPDATE_DATA_USER,
    data: data
});//
export const updateRolesData = ({ data }) => ({
    type: constants.UPDATE_DATA_ROLES,
    data: data
});
export const updateCurrentUserRoleData = ({ data, newDataArr }) => ({
    type: constants.UPDATE_DATA_CURRENT_USER_ROLE,
    data: data,
    newDataArr: newDataArr
});
const updateCurrentVisible = ({ data }) => ({
    type: constants.UPDATE_CURRENT_VISIBLE,
    data: data
});

const updateNewUserCurrentVisible = ({ data }) => ({
    type: constants.UPDATE_NEW_USER_CURRENT_VISIBLE,
    data: data
});

export const updatePresentUserData = (presentUserData) => ({
    type: constants.UPDATE_PRESENT_USER,
    data: presentUserData
});
//
export const ChangePresentUsername = (presentUsername) => ({
    type: constants.UPDATE_PRESENT_USERNAME,
    data: presentUsername
});
export const ChangeVisible = (visible) => {
    return (dispatch) => {

        if (visible) {
            dispatch(updateCurrentVisible({ data: false }))
        } else {
            dispatch(updateCurrentVisible({ data: true }))
        }
    }
}

export const ChangeNewUserVisible = (visible) => {

    return (dispatch) => {

        if (visible) {
            dispatch(updateNewUserCurrentVisible({ data: false }))
        } else {
            dispatch(updateNewUserCurrentVisible({ data: true }))
        }
    }
}
//submitTempInfo submitRolesSelect

export const submitRolesSelect = (id, rolesArr) => {
    return (dispatch) => {
        console.log("执行了submitRolesSelect")
        requestSubmitTempRoles(id, rolesArr)
            .then((response) => {
                console.log("response")
                console.log(response)
                console.log("response")
                if (response['code'] === 0) {
                    message.info(response.msg)
                } else {
                    message.info(response.msg)
                }
            })
    }
};

export const submitNewUser = (username,phone,department,detail) => {
    return (dispatch) => {
        requestSubmitNewUserInfo(username,phone,department,detail)
          .then((res) => {
              message.info(res.msg)
          })
          .then(() => {
              window.location.reload();
          })
    }
}

export const submitTempInfo = (id, username, phone) => {
    return (dispatch) => {
        requestSubmitTempUserInfo(id, username, phone)
            .then((response) => {
                if (response['code'] === 0) {
                    // message.info(response.msg)
                } else {
                    message.info(response.msg)
                }
            })
    }
};


export const getData = (data) => {

    return (dispatch) => {
        requestGetAllUsers_V2()
            .then((response) => {
                if (response['code'] === 0) {

                    //解析处理数据
                    let newData = deepCopy(response['data'])


                    dispatch(updateData({//将获取到的数据进行转发
                        data: newData
                    }));
                }
            })

    }
};//end getData


export const changeEnabledValue = (username, enabledValue) => {

    return (dispatch) => {

        const testEnabledValue =(enabledValue===true?0:1);
        requestChangeEnabledValue_V2(username, testEnabledValue)
            .then((response) => {
                if (response['code'] === 0) {
                    requestGetAllUsers_V2()
                        .then((response) => {
                            if (response['code'] === 0) {

                                //解析处理数据
                                let newData = deepCopy(response['data'])


                                dispatch(updateData({//将获取到的数据进行转发
                                    data: newData
                                }));
                            }
                        })
                    //解析处理数据
                    // let newData = deepCopy(response['data'])
                    //
                    //
                    //
                    // dispatch(updateData({//将获取到的数据进行转发
                    //     data: newData
                    // }));
                }
            })

    }
};//end getData  changeEnabledValue


export const getAllRole = (data) => {
    return (dispatch) => {
        requestGetAllRoles_V2().then(
            (response) => {
                if (response['code'] === 0) {

                    //解析处理数据
                    let newData = deepCopy(response['data'])


                    dispatch(updateRolesData({//将获取到的数据进行转发
                        data: newData
                    }));
                }
            }
        )

    }
};

export const getCurrentUserRole = (username) => {
    return (dispatch) => {
        requestGetCurrentUserRole_V2(username).then(
            (response) => {
                if (response['code'] === 0) {

                    //解析处理数据
                    let newData = deepCopy(response['data'])
                    let newCurrentUserIdArr = [];//填充当前用户角色数组
                    newData.map((item, index) => {
                        return newCurrentUserIdArr.push(item.id)
                    });
                    dispatch(updateCurrentUserRoleData({//将获取到的数据进行转发
                        data: newData,
                        newDataArr: newCurrentUserIdArr
                    }));
                }
            }
        )

    }
};
export const resetPassword = (id) =>{
    return(dispatch) => {
        requestResetPassword(id)
          .then((res) =>{
                // console.log(res)
                // console.log(res)
                // console.log(res)
              if (res.code == 0){
                  message.info("密码重置为123456")
              }else {
                  message.info(res.msg)
              }
            }
          )

    }
}

// export const resetPassword = id => ({
//     type: constants.RESET_PASSWORD,
//     id
// })

export const setEditItem = item => ({
    type: constants.SET_PERMISSION_ROLE_ITEM,
    item
})

export const updateRoleList = item => ({
    type: constants.UPDATE_PERMISSION_ROLE_LIST,
    item
})


