import {
  SET_ROLE_PERMISSION_TABLE_SELECTED_ID,
  SET_ROLE_PERMISSION_TABLE_SELECTED_ALL, SET_ROLE_PERMISSION_TABLE_SELECTED_ID_CURRENT,
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
          id: 10,
          name: "权限管理",
          order: 10,
          request: "/sys/permission",
          type: "菜单",
          children: [
            {
              id: 13,
              name: "获取该用户全部权限",
              order: 13,
              request: "/sys/permission/getPermissionByUsername",
              type: "权限",
            },
            {
              id: 14,
              name: "设置权限",
              order: 14,
              request: "/sys/permission/setPermissionByPermissionIds",
              type: "权限",
            },
          ]
        },
        {
          id: 16,
          name: "角色管理",
          order: 16,
          request: "/sys/userRole",
          type: "菜单",
          children: [
            {
              id: 17,
              name: "获取该用户全部的角色信息",
              order: 17,
              request: "/sys/userRole/getRolesByUsername",
              type: "权限",
            },
            {
              id: 18,
              name: "设置角色",
              order: 18,
              request: "/sys/userRole/setUserRoles",
              type: "权限",
            },
            {
              id: 19,
              name: "获取全部角色信息",
              order: 19,
              request: "/sys/userRole/getAllRoles",
              type: "权限",
            },
            {
              id: 20,
              name: "更新角色信息",
              order: 20,
              request: "/sys/userRole/updateRole",
              type: "权限",
            },
          ]
        },
        {
          id: 21,
          name: "用户管理",
          order: 21,
          request: "/sys/user",
          type: "菜单",
          children: [
            {
              id: 22,
              name: "添加用户",
              order: 22,
              request: "/sys/user/addUser",
              type: "权限",
            },
            {
              id: 23,
              name: "获取全部用户信息",
              order: 23,
              request: "/sys/user/getAllUsers",
              type: "权限",
            },
            {
              id: 24,
              name: "更新用户信息",
              order: 24,
              request: "/sys/user/updateUser",
              type: "权限",
            },
            {
              id: 25,
              name: "删除用户",
              order: 25,
              request: "/sys/user/deleteUser",
              type: "权限",
            },
            {
              id: 26,
              name: "锁定用户",
              order: 26,
              request: "/sys/user/lockUser",
              type: "权限",
            },
            {
              id: 64,
              name: "注销用户",
              order: 64,
              request: "/invalidateToken",
              type: "权限",
            },
          ]
        },
        {
          id: 27,
          name: "中控室权限",
          order: 27,
          request: "/zhongkongshi",
          type: "菜单",
          children: [
            {
              id: 28,
              name: "通过表名和日期来获取中控室数据",
              order: 28,
              request: "/zhongkongshi/getZhongKongShiDataByTableNameAndDate",
              type: "权限",
            },
            {
              id: 29,
              name: "保存中控室的数据",
              order: 29,
              request: "/zhongkongshi/saveZhongKongData",
              type: "权限",
            },
            {
              id: 30,
              name: "获取全部中控室数据",
              order: 30,
              request: "/zhongkongshi/getAllZhongKongShiDatas",
              type: "权限",
            },
          ]
        },
        {
          id: 40,
          name: "标准",
          order: 40,
          request: "/standard",
          type: "菜单",
          children: [
            {
              id: 41,
              name: "获取全部标准信息",
              order: 41,
              request: "/standard/getAllStandard",
              type: "权限",
            },
            {
              id: 42,
              name: "设置标准",
              order: 42,
              request: "/standard/setStandard",
              type: "权限",
            },
            {
              id: 43,
              name: "获取该表所有标准信息",
              order: 43,
              request: "/standard/getStandardsDataByTableName",
              type: "权限",
            },
            {
              id: 44,
              name: "通过表名来获取当前最新的标准",
              order: 44,
              request: "/standard/getStandardDataByTableName",
              type: "权限",
            },
          ]
        },
        {
          id: 60,
          name: "化验室权限",
          order: 60,
          request: "/huayanshi",
          type: "菜单",
          children: [
            {
              id: 61,
              name: "通过表名和日期来获取化验室的数据",
              order: 61,
              request: "/huayanshi/getHuaYanShiDataByTableNameAndDate",
              type: "权限",
            },
            {
              id: 62,
              name: "保存化验室数据",
              order: 62,
              request: "/huayanshi/saveHuaYanShiData",
              type: "权限",
            },
            {
              id: 63,
              name: "获取全部化验室数据",
              order: 63,
              request: "/huayanshi/getAllHuaYanShiDatas",
              type: "权限",
            },
          ]
        },
        {
          id: 80,
          name: "日志管理",
          order: 80,
          request: "/logRecordController",
          type: "菜单",
          children: [
            {
              id: 81,
              name: "获取全部日志信息",
              order: 81,
              request: "/logRecordController/getAllLogRecords",
              type: "权限",
            },
            {
              id: 82,
              name: "通过用户名和时间区间来获取日志",
              order: 82,
              request: "/logRecordController/getAllLogsByUsernameOrDateBetween",
              type: "权限",
            },
            {
              id: 83,
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
      // console.log("List")
      // console.log(list)
      // console.log("List")
      const item = list.find(x => x.id === action.data.id)//找到选中的那栏
      // console.log("item")
      // console.log(item)
      // console.log("item")
      let tempTableSelectIds = MergeArray(state.permissionIds,tableSelectIds);
      tableSelectIds = tempTableSelectIds;
      treatmentOptions(item, action.status)
      return {
        ...state,
        permissionIds: [...tableSelectIds]
      }
    case SET_ROLE_PERMISSION_TABLE_SELECTED_ID_CURRENT:
      return {
        ...state,
        permissionIds: action.permissionIds
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


const MergeArray = (arr1,arr2)=>{
  var _arr = new Array();
  for(var i=0;i<arr1.length;i++){
    _arr.push(arr1[i]);
  }
  for(var i=0;i<arr2.length;i++){
    var flag = true;
    for(var j=0;j<arr1.length;j++){
      if(arr2[i]==arr1[j]){
        flag=false;
        break;
      }
    }
    if(flag){
      _arr.push(arr2[i]);
    }
  }
  return _arr;
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
  const list = serverArray([item])//以选中那栏为根节点的数据json

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