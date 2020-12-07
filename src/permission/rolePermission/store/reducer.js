import {
  SET_ROLE_PERMISSION_TABLE_SELECTED_ID,
  SET_ROLE_PERMISSION_TABLE_SELECTED_ALL, SET_ROLE_PERMISSION_TABLE_SELECTED_ID_CURRENT,SET_PERMISSION_LIST_CURRENT
} from './constant'

const defaultState = {
  permissionIds: [],
  permissionList:[],
}

let tableSelectIds = []

export default (state = defaultState, action) => {
  let list = []
  switch (action.type) {
    case SET_ROLE_PERMISSION_TABLE_SELECTED_ID:
      list = serverArray(state.permissionList)
      console.log("List")
      console.log(list)
      console.log("List")
      const item = list.find(x => x.id === action.data.id)//找到选中的那栏
      console.log("item")
      console.log(item)
      console.log("item")
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
    case SET_PERMISSION_LIST_CURRENT:
      return {
        ...state,
        permissionList: action.permissionList
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
 * @param {*} list 返回一个以各个节点为首节点的带子节点的数组
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