import * as constants from './constants';
import {message} from "antd";

//导入中控室的请求方法
import {
    requestCheckPermission,
} from "../../../http/request/RequestUser"
import {AUTHORITY, Department, DUTY, State} from "../../../http/constant/Constant";



/**
 * 修改时间选项
 * @param timeChose
 * @returns {{timeChose: *, type: string}}
 */
export const updatePermission = ({permission}) => ({
    type: constants.UPDATE_PERMISSION,
    permission: permission
});

export const updateDisplay = ({pageDisplay}) =>({
    type:constants.UPDATE_DISPLAY,
    pageDisplay:pageDisplay
});

export const getUserPermission = ({})=>{

    return(dispatch)=>{
        requestCheckPermission()
            .then((permission)=>{
                //updatePermission({permission:permission})

                console.log("requestCheckPermission")
                console.log(permission)
                console.log(permission.username)
                console.log("requestCheckPermission")

                if(//TODO 加密本地信息
                    permission.username === window.localStorage.username &&
                    permission.state == window.localStorage.state == State.IN &&
                    permission.department == window.localStorage.department &&
                    permission.duty == window.localStorage.duty &&
                    permission.authority == window.localStorage.authority
                ){//本地信息没有修改



                    if(permission.authority === AUTHORITY.AUTHORITY_MANAGER){//总经理
                        dispatch(updateDisplay({pageDisplay: ['', '', '', '', '', '', '','','']}));


                    }else {
                        switch (permission.department) {//校验属于哪个部门
                            case Department.DEPARTMENT_NONE://无部门
                                dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']}));

                                break;
                            case Department.DEPARTMENT_HUAYS://化验室
                                //继续校验 该用户的具体职务

                                switch (permission.duty) {
                                    case DUTY.DUTY_ZK_MANAGER://化验室主任
                                        dispatch(updateDisplay({pageDisplay: ['', 'none', '', '', '', '', '']}));

                                        break;
                                    case DUTY.DUTY_EMPLOYEE_YG_ANALYST://化验室荧光分析员
                                        dispatch(updateDisplay({pageDisplay: ['none', 'none', '', 'none', 'none', 'none', '']}));

                                        break;
                                    case DUTY.DUTY_EMPLOYEE_YG_OPERATOR://化验室荧光控制员
                                        dispatch(updateDisplay({pageDisplay: ['none', 'none', '', 'none', 'none', 'none', '']}));

                                        break;

                                    case DUTY.DUTY_EMPLOYEE_HYS_ANALYST://化验室分析员
                                        dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', '', 'none', 'none', '']}));

                                        break;

                                    case DUTY.DUTY_EMPLOYEE_HYS_OPERATOR://化验室物检员
                                        dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', '', 'none', 'none', '']}));

                                        break;
                                    default:
                                        dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', 'none', 'none', 'none', 'none']}));
                                }
                                break;
                            case Department.DEPARTMENT_ZHKONGKS://中控室

                                switch (permission.duty) {
                                    case DUTY.DUTY_ZK_MANAGER://中控主任
                                        dispatch(updateDisplay({ pageDisplay: ['', '', 'none', 'none', 'none', '', '']}));

                                        break;
                                    case DUTY.DUTY_ZK_ENGINEER://总工程师
                                        //可以查看中控室的所有表格，拥有中控室部门的所有查看权限。
                                        dispatch(updateDisplay({pageDisplay: ['', '', 'none', 'none', 'none', '', '']}));

                                        break;
                                    case DUTY.DUTY_EMPLOYEE_ZK_OPERATOR:
                                        dispatch(  updateDisplay({pageDisplay: ['', '', 'none', 'none', 'none', 'none', 'none']}));

                                        break;
                                    case DUTY.DUTY_EMPLOYEE_SD_OPERATOR:
                                        dispatch(updateDisplay({pageDisplay: ['', '', 'none', 'none', 'none', 'none', 'none']}));

                                        break;
                                    default:

                                        break;
                                }

                                break;
                            case Department.DEPARTMENT_XINGZS://行政部门
                                dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', 'none', 'none', 'none', '']}));

                                break;
                            default:
                                break;
                        }
                    }

                }else {
                    dispatch(updateDisplay({pageDisplay: ['none', 'none', 'none', 'none', 'none', 'none', 'none']}));

                }

            });
    }


}
//
//
// export const updateData = ({data}) => ({
//     type: constants.UPDATE_DATA_BSO,
//     data: data
// });
//
//
// /**
//  *
//  * @param date
//  * @param tableName
//  * @param data 传过来的是这个界面的模板
//  * @returns {Function}
//  */
// export const getData = (date, tableName, data) => {
//     return (dispatch) => {
//
//         requestGetHuaYanShiDataByTableNameAndDate(
//             date,
//             tableName,
//             data
//         ).then((response) => {
//
//             dispatch(updateData({//将获取到的数据进行转发
//                 data: response
//             }));
//         });//end requestGetHuaYanShiDataByTableNameAndDate
//     }
// };//end getData


// export function saveData(
//     {
//         tableType = 1,//上表
//         date,
//         index,
//         tableName,
//         data,
//         num = 1//默认为1即为存放单行数据
//     }
// ) {
//
//     return(dispatch) =>{
//         requestSaveHuaYanShiData({
//             date: date,
//             index: index,
//             duty: window.localStorage.duty,
//             tableName: tableName,
//             authority: window.localStorage.authority,
//             data: data,
//             num: num
//         }).then((response) => {
//
//             //处理是否提交成功
//             if (response == Mark.SUCCESS && num == 1) {
//                 message.info('暂存成功');
//             } else if (response == Mark.SUCCESS && num > 1) {
//                 message.info('提交成功');
//             } else {
//                 message.info('存放失败');
//             }
//
//             //更新数据
//             if (tableType === Table.UPPER_TABLE) {//上表
//                 if (num === 1)//存一行数据的时候只修改该行的操作者
//                     updateOperator({
//                         data: data,
//                         index: index,
//                         num:num
//                     })
//                 else//为总体提交的时候则当该行数据不为空的时候提交数据
//                     updateOperator({
//                         data: data,
//                         num: 36
//                     })//该表上表有36行数据
//
//                 dispatch(updateData({data:data}))//最后转发给updateData来更新数据
//
//             }else {
//                 dispatch(updateData({data:data}))
//             }
//
//         });//end requestSaveHuaYanShiData
//     }
//
// }


