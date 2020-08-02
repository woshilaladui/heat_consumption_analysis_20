import {requestGetAllUsers_V2, requestChangeEnabledValue_V2,requestUserLogin_V2,requestGetAllRoles_V2,requestGetCurrentUserRole_V2} from "../../../http/request/RequestUser";
import {deepCopy} from "../../../Helper/Copy";

import * as constants from "./constants";


export const updateData = ({data}) => ({
    type: constants.UPDATE_DATA_USER,
    data: data
});//
export const updateRolesData = ({data}) => ({
    type: constants.UPDATE_DATA_ROLES,
    data: data
});
export const updateCurrentUserRoleData = ({data}) => ({
    type: constants.UPDATE_DATA_CURRENT_USER_ROLE,
    data: data
});

export const getData = (data) => {

    return (dispatch) => {
        requestGetAllUsers_V2()
            .then( (response) =>{
                if(response['code'] === 0){

                    //解析处理数据
                    let newData = deepCopy(response['data'])



                    dispatch(updateData({//将获取到的数据进行转发
                        data: newData
                    }));
                }
            })

    }
};//end getData


export const changeEnabledValue = (username,enabledValue) => {

    return (dispatch) => {
        requestChangeEnabledValue_V2(username,enabledValue)
            .then( (response) =>{
                if(response['code'] === 0){
                    requestGetAllUsers_V2()
                        .then( (response) =>{
                            if(response['code'] === 0){

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
                if(response['code'] === 0){

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
                if(response['code'] === 0){

                    //解析处理数据
                    let newData = deepCopy(response['data'])



                    dispatch(updateCurrentUserRoleData({//将获取到的数据进行转发
                        data: newData
                    }));
                }
            }
        )

    }
};