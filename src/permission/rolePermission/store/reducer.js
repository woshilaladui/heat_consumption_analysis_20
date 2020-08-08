import {
  SET_ROLE_PERMISSION_TABLE_SELECTED_ID,
  SET_ROLE_PERMISSION_TABLE_SELECTED_ALL,
} from './constant'

const defaultState = {
  permissionIds: [],
  permissionList: [
    {
      id: 1,
      name: "全部权限",
      order: 1,
      request: "/",
      type: "菜单",
      children: [
        {
          id: 101,
          name: "权限管理",
          order: 10,
          request: "/sys/permission",
          type: "菜单",
          children: [
            {
              id: 1011,
              name: "获取该用户全部权限",
              order: 13,
              request: "/sys/permission/getPermissionByUsername",
              type: "权限",
            },
            {
              id: 1012,
              name: "设置权限",
              order: 14,
              request: "/sys/permission/setPermissionByPermissionIds",
              type: "权限",
            },
          ]
        },
        {
          id: 102,
          name: "角色管理",
          order: 16,
          request: "/sys/userRole",
          type: "菜单",
          children: [
            {
              id: 1021,
              name: "获取该用户全部的角色信息",
              order: 17,
              request: "/sys/userRole/getRolesByUsername",
              type: "权限",
            },
            {
              id: 1022,
              name: "设置角色",
              order: 18,
              request: "/sys/userRole/setUserRoles",
              type: "权限",
            },
            {
              id: 1023,
              name: "获取全部角色信息",
              order: 19,
              request: "/sys/userRole/getAllRoles",
              type: "权限",
            },
            {
              id: 1024,
              name: "更新角色信息",
              order: 20,
              request: "/sys/userRole/updateRole",
              type: "权限",
            },
          ]
        },
        {
          id: 103,
          name: "用户管理",
          order: 21,
          request: "/sys/user",
          type: "菜单",
          children: [
            {
              id: 1031,
              name: "添加用户",
              order: 22,
              request: "/sys/user/addUser",
              type: "权限",
            },
            {
              id: 1032,
              name: "获取全部用户信息",
              order: 23,
              request: "/sys/user/getAllUsers",
              type: "权限",
            },
            {
              id: 1033,
              name: "更新用户信息",
              order: 24,
              request: "/sys/user/updateUser",
              type: "权限",
            },
            {
              id: 1034,
              name: "删除用户",
              order: 25,
              request: "/sys/user/deleteUser",
              type: "权限",
            },
            {
              id: 1035,
              name: "锁定用户",
              order: 26,
              request: "/sys/user/lockUser",
              type: "权限",
            },
            {
              id: 1036,
              name: "注销用户",
              order: 64,
              request: "/invalidateToken",
              type: "权限",
            },
          ]
        },
        {
          id: 104,
          name: "中控室权限",
          order: 27,
          request: "/zhongkongshi",
          type: "菜单",
          children: [
            {
              id: 1041,
              name: "通过表名和日期来获取中控室数据",
              order: 28,
              request: "/zhongkongshi/getZhongKongShiDataByTableNameAndDate",
              type: "权限",
            },
            {
              id: 1042,
              name: "保存中控室的数据",
              order: 29,
              request: "/zhongkongshi/saveZhongKongData",
              type: "权限",
            },
            {
              id: 1043,
              name: "获取全部中控室数据",
              order: 30,
              request: "/zhongkongshi/getAllZhongKongShiDatas",
              type: "权限",
            },
          ]
        },
        {
          id: 105,
          name: "标准",
          order: 40,
          request: "/standard",
          type: "菜单",
          children: [
            {
              id: 1051,
              name: "获取全部标准信息",
              order: 41,
              request: "/standard/getAllStandard",
              type: "权限",
            },
            {
              id: 1052,
              name: "设置标准",
              order: 42,
              request: "/standard/setStandard",
              type: "权限",
            },
            {
              id: 1053,
              name: "获取该表所有标准信息",
              order: 43,
              request: "/standard/getStandardsDataByTableName",
              type: "权限",
            },
            {
              id: 1054,
              name: "通过表名来获取当前最新的标准",
              order: 44,
              request: "/standard/getStandardDataByTableName",
              type: "权限",
            },
          ]
        },
        {
          id: 106,
          name: "化验室权限",
          order: 60,
          request: "/huayanshi",
          type: "菜单",
          children: [
            {
              id: 1061,
              name: "通过表名和日期来获取化验室的数据",
              order: 61,
              request: "/huayanshi/getHuaYanShiDataByTableNameAndDate",
              type: "权限",
            },
            {
              id: 1062,
              name: "保存化验室数据",
              order: 62,
              request: "/huayanshi/saveHuaYanShiData",
              type: "权限",
            },
            {
              id: 1063,
              name: "获取全部化验室数据",
              order: 63,
              request: "/huayanshi/getAllHuaYanShiDatas",
              type: "权限",
            },
          ]
        },
        {
          id: 107,
          name: "日志管理",
          order: 80,
          request: "/logRecordController",
          type: "菜单",
          children: [
            {
              id: 1071,
              name: "获取全部日志信息",
              order: 81,
              request: "/logRecordController/getAllLogRecords",
              type: "权限",
            },
            {
              id: 1072,
              name: "通过用户名和时间区间来获取日志",
              order: 82,
              request: "/logRecordController/getAllLogsByUsernameOrDateBetween",
              type: "权限",
            },
            {
              id: 1073,
              name: "批量删除日志",
              order: 83,
              request: "/logRecordController/deleteLogRecordById",
              type: "权限",
            },
          ]
        },
      ]
    }
  ]
}

let tableSelectIds = []

export default (state = defaultState, action) => {
  let list = []
  switch (action.type) {
    case SET_ROLE_PERMISSION_TABLE_SELECTED_ID:
      list = serverArray(state.permissionList)
      const item = list.find(x => x.id === action.data.id)
      treatmentOptions(item, action.status)
      return {
        ...state,
        permissionIds: [...tableSelectIds]
      }
    case SET_ROLE_PERMISSION_TABLE_SELECTED_ALL:
      list = serverArray(state.permissionList)
      return {
        ...state,
        permissionIds: action.status ? list.map(x => x.id) : []
      }
    default:
      return state
  }
}



/**
 * 展开列表数据
 * @param {*} list 
 */
const serverArray = list => {
  const tableList = []
  const getList = ary => {
    ary.forEach(item => {
      tableList.push(item)
      if (item.children) {
        getList(item.children)
      }
    })
  }
  getList(list)
  return tableList
}

/**
 * 对列表进行筛选
 * @param {*} item 
 * @param {*} status 
 */
const treatmentOptions = (item, status) => {
  const list = serverArray([item])

  list.forEach(item => {
    const index = tableSelectIds.findIndex(x => x === item.id)
    if (status) {
      if (index === -1) {
        tableSelectIds.push(item.id)
      }
    } else {
      if (index !== -1) {
        tableSelectIds.splice(index, 1)
      }
    }
  })
}