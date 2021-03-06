import {
  SET_ROLE_PERMISSION_TABLE_SELECTED_ID,
  SET_ROLE_PERMISSION_TABLE_SELECTED_ALL,
  SET_ROLE_PERMISSION_TABLE_SELECTED_ID_CURRENT,
  SET_PERMISSION_LIST_CURRENT
} from './constant'
import {requestSavePermission,requestGetPermissionList} from "../../../http/request/RequestUser";
import {message} from "antd";
import {requestGetCurrentRolePermission} from '../../../http/request/RequestUser';

export const setTableSelectedId = (data, status) => ({
  type: SET_ROLE_PERMISSION_TABLE_SELECTED_ID,
  data,
  status
})

export const setTableSelectAll = status => ({
  type: SET_ROLE_PERMISSION_TABLE_SELECTED_ALL,
  status
})
const setCurrentPermission = permissionIds => ({
  type: SET_ROLE_PERMISSION_TABLE_SELECTED_ID_CURRENT,
  permissionIds
})
const setCurrentPermissionList = permissionList => ({
  type: SET_PERMISSION_LIST_CURRENT,
  permissionList
})

export const getPermissionList = () => {
  return (dispatch) => {
    requestGetPermissionList()
      .then((response) => {
        dispatch(setCurrentPermissionList([response.data]))

    })
  }
}

//保存信息
export const savePermission = data => {
  return (dispatch) => {
    console.log("保存信息>>>>>", data)
    requestSavePermission(data)
      .then(response => {
          if (response['code'] === 0) {
            message.info(response['msg'])
          }
        }
      )
  }
}

export const GetCurrentRolePermission = roleId => {
  return (dispatch) => {
    requestGetCurrentRolePermission(roleId)
      .then(
        response => {
        dispatch(setCurrentPermission(response["data"]))
  })
  }
}