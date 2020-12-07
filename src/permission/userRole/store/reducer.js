import * as constants from './constants'
import moment from 'moment'

const defaultState = {
  //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
  date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
  requestFlag: true,//是否需要更新数据
  data: [],//用户数据
  roleData: [],//所有的角色数据
  userRoleData: [],//请求该用户的当前角色信息
  presentUser: {
  },//当前用户对象
  visible: false,
  visiblePassword:false,
  visibleNewUser:false,
  editItem: {},
  currentUserRoleArr: [],//当前用户角色的id数组
}

export default (state = defaultState, action) => {
  let data = []
  switch (action.type) {
    case constants.UPDATE_DATA_USER:
      return {
        ...state,//防止覆盖其他reducers函数返回的state
        data: action.data,
        requestFlag: false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
      }
    case constants.UPDATE_DATA_ROLES:
      return {
        ...state,
        roleData: action.data,
      }
    case constants.UPDATE_DATA_CURRENT_USER_ROLE:
      return {
        ...state,
        userRoleData: action.data,
        currentUserRoleArr: action.newDataArr,
        // visible: true
      }
    case constants.UPDATE_CURRENT_VISIBLE:
      return {
        ...state,
        visible: action.data
      }
    case constants.UPDATE_NEW_USER_CURRENT_VISIBLE:
      return {
        ...state,
        visibleNewUser: action.data
      }
    case constants.UPDATE_PRESENT_USER:
      return {
        ...state,
        presentUser: action.data,
      }
    case constants.SET_PERMISSION_ROLE_ITEM:
      return {
        ...state,
        editItem: action.item,
        visible: true
      }
    case constants.UPDATE_PERMISSION_ROLE_LIST:
      data = state.data;//拿到用户数组
      data.forEach(item => {
        if (item.id === action.item.id) {
          
            item.phone = action.item.phone
            item.username = action.item.username
          
        }
      })
      return {
        ...state,
        data: [...data]
        // data:data
      }
    // case constants.UPDATE_PRESENT_USER:
    //     return state.merge({
    //         'presentUser': action.data,
    //     });
    default:
      return state
  }


}