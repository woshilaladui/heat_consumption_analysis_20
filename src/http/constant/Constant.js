import {Service} from "./ServiceConstant";

/**
 * @author zm
 * @function 常量类
 */

const RequestMethod = {
    formData:0,
    jsonDta:1
}

const URL={
/*****************************************版本2******************************************/
    REQUEST_SUBMIT_TEMP_ROLES_V2: Service.ROOT_URL_V2+"/sys/userRole/setUserRoles",//更新用户角色
    REQUEST_SAVE_PERMISSION_V2: Service.ROOT_URL_V2+"/sys/permission/setPermissionByPermissionIds",//保存角色权限
    REQUEST_SUBMIT_TEMP_USER_INFO_V2: Service.ROOT_URL_V2+"/sys/user/updateUser",//更新用户基本信息
    REQUEST_UPDATE_PASSWORD: Service.ROOT_URL_V2+"/sys/user/updateUserPassword",//更新用户密码
    REQUEST_ENABLED_VALUE_V2: Service.ROOT_URL_V2+"/sys/user/lockUser",//锁定用户
    REQUEST_VERIFICATION_V2: Service.ROOT_URL_V2+"/verification",//获取验证码
    REQUEST_AUTHENTICATION_V2: Service.ROOT_URL_V2+"/authentication",//登陆
    REQUEST_GET_ALL_USERS_V2: Service.ROOT_URL_V2+"/sys/user/getAllUsers",//获取所有的用户
    REQUEST_GET_ALL_ROLE_V2: Service.ROOT_URL_V2+"/sys/userRole/getAllRoles",//获取所有的角色
    REQUEST_GET_CURRENT_USER_ROLE_V2: Service.ROOT_URL_V2+"/sys/userRole/getRolesByUsername",//获取当前用户的角色
    REQUEST_LOGOUT_V2: Service.ROOT_URL_V2+"/invalidateToken",//注销用户
    REQUEST_GET_CURRENT_ROLE_PERMISSION_V2: Service.ROOT_URL_V2+"/sys/permission/getRolePermissionByRoleId",//通过用户Id来查询其权限
    REQUEST_GET_CURRENT_PERMISSION_LIST_V2: Service.ROOT_URL_V2+"/sys/permission/getPermissionByUsername",//通过用户Id来查询其权限

    /*********************************用户类请求地址*************************************/
    REQUEST_LOGIN:Service.ROOT_URL + "/user/login",


    REQUEST_REGISTER:Service.ROOT_URL + "/user/register",

    //获取全部个人信息
    REQUEST_GET_ALL_USERS:Service.ROOT_URL + "/user/getAllUsers",

    //更新用户个人信息 （得有特定权限，不是自己更新信息的接口）
    REQUEST_UPDATE_USER:Service.ROOT_URL + "/user/updateUser",

    //批量导入用户的接口(excel导入)
    REQUEST_ADD_USERS:Service.ROOT_URL + "/user/addUsers",

    //TODO  暂无实现
    REQUEST_DELETE_USER:Service.ROOT_URL + "",

    //校验用户权限
    REQUEST_CHECK_PERMISSION:Service.ROOT_URL + "/user/getPermission",



    /*********************************化验室请求地址*************************************/

    //通过化验室表名和日期来查询该日期下的数据
    REQUEST_GET_HUAYANSHI_DATA_BY_TABLENAME_AND_DATE:Service.ROOT_URL_V2 + "/huayanshi/getHuaYanShiDataByTableNameAndDate",

    //化验室存储(包括暂存，存单行)接口
    REQUEST_SAVE_HUAYANSHI_DATA:Service.ROOT_URL_V2 + "/huayanshi/saveHuaYanShiData",

    //查看表单中查看电量表格数据
    REQUEST_GET_HUAYANSHI_ELEC_DATA:Service.ROOT_URL_V2 + "/huayanshi/getHuaYanShiDataDifferenceValueBytableNameAndDate",


    /*********************************中控室接口*************************************/

    //通过中控室表名和日期来查询该日期下的数据
    REQUEST_GET_ZHONGKONGSHI_DATA_BY_TABLENAME_AND_DATE:Service.ROOT_URL_V2 + "/zhongkongshi/getZhongKongShiDataByTableNameAndDate",

    //中控室存储(包括暂存，存单行)接口
    REQUEST_SAVE_ZHONGKONG_DATA:Service.ROOT_URL_V2 + "/zhongkongshi/saveZhongKongData",




    /*********************************标准获取地址*************************************/

    //获取全部标准
    REQUEST_GET_ALL_STANDARDS:Service.ROOT_URL + "/standard/getAllStandard",

    //通过表名获取当前表下所有的标准
    REQUEST_GET_STANDARDS_DATA_BY_TABLENAME:Service.ROOT_URL + "/standard/getStandardsDataByTableName",

    //通过表名获取当前表下最新的标准
    REQUEST_GET_STANDARD_DATA_BY_TABLENAME:Service.ROOT_URL + "/standard/getStandardDataByTableName",

    //设置标准
    REQUEST_SET_STANDARD:Service.ROOT_URL + "/standard/setStandard",





    /*********************************日志请求地址*************************************/

    //获取全部日志信息
    REQUEST_GET_ALL_LOGS:Service.ROOT_URL + "/logRecordController/getAllLogRecords",

    //查询某个人全部的日志信息
    REQUEST_GET_ALL_LOGS_BY_USERNAME:Service.ROOT_URL + "/logRecordController/getAllLogRecordsByUsername",

    //通过日期区间和用户名查询日志信息（两个参数非必填）
    REQUEST_GET_ALL_LOGS_BY_USERNAME_AND_DATE:Service.ROOT_URL + "/logRecordController/getAllLogsByUsernameOrDateBetween",

    //删除日志
    REQUEST_DELETE_LOGS:Service.ROOT_URL + "/logRecordController/deleteLogRecordById",


    /*********************************其他请求地址*************************************/
    //TODO 备份接口
    REQUEST_BACKUP:Service.ROOT_URL + "",

    //TODO 获取封面的背景图
    REQUEST_GET_BACKGROUND_PHOTOS:Service.ROOT_URL + "",

    REQUEST_SAVE_FEEDBACK_DATA:Service.ROOT_URL_V2+"/feedback/saveFeedBack",

}

const Table={

    ALL_TABLE:0,//所以表

    UPPER_TABLE :1,//上表

    BOTTOM_TABLE:2//下表
}

const Mark ={

    SUCCESS :0,

    ERROR:1,

    SUCCESS_NO_DATA:400,//返回结果成功，但是今天没有数据
}

const Standard ={

    HAVA:1,//有标准

    NONE:0//没有标准
}

const State ={

    IN:1,//在职

    OUT:0//离职
}

const AUTHORITY = {

    //无  游客
    AUTHORITY_NONE:0,

    //总经理
    AUTHORITY_MANAGER:1,

    //部门经理
    AUTHORITY_SECTION_MANAGER:2,

    //员工
    AUTHORITY_EMPLOYEE:3,
}

const DUTY = {

    //无
    DUTY_NONE:0,

    /**
     * 中控室主任
     *
     * 可以填写并查看中控室的所有表格，拥有中控室人员管理权限，中控室指标设置权限。
     */
    DUTY_ZK_MANAGER:1,

    /**
     * 总工程师
     *
     * 可以查看中控室的所有表格，拥有中控室部门的所有查看权限。
     */
    DUTY_ZK_ENGINEER:2,

    /**
     * 化验室主任
     *
     * 可以填写并查看化验室的所有表格，拥有化验室人员管理权限，化验室指标设置权限。
     */
    DUTY_HYS_MANAGER:3,

    /**
     * 中控室操作员
     *
     * 各操作员可以在自己值班期间填写和修改对应班次的中控室操作记录，同时拥有查询所有中控室表格的权限。
     */
    DUTY_EMPLOYEE_ZK_OPERATOR:50,

    /**
     * 实地操作员(仅针对手机web版本)
     *
     * 对于特殊的数据，在手机web上进行填写和修改。
     */
    DUTY_EMPLOYEE_SD_OPERATOR:51,

    /**
     * 化验室荧光分析员
     *
     * 各操作员可以在自己值班期间填写和修改对应班次的化验室荧光分析部门的所有表格，并能查询所有化验室表格。
     */
    DUTY_EMPLOYEE_YG_ANALYST:61,

    /**
     * 化验室荧光控制员
     *
     * 各操作员可以在自己值班期间填写和修改对应班次的化验室荧光控制部门的所有表格，并能查询所有化验室表格。
     */
    DUTY_EMPLOYEE_YG_OPERATOR:62,

    /**
     * 化验室分析员
     *
     * 各操作员可以在自己值班期间填写和修改对应班次的化验室分析部门的所有表格，并能查询所有化验室表格。
     */
    DUTY_EMPLOYEE_HYS_ANALYST:71,

    /**
     * 化验室物检员
     *
     * 各操作员可以在自己值班期间填写和修改对应班次的化验室物检部门的所有表格，并能查询所有化验室表格。
     */
    DUTY_EMPLOYEE_HYS_OPERATOR:72

}

//部门
const Department = {

    DEPARTMENT_NONE:0,//无部门

    DEPARTMENT_HUAYS:1,//化验室

    DEPARTMENT_ZHKONGKS:2,//中控室

    DEPARTMENT_XINGZS:3//行政部门
}






export {
    URL,//请求路径
    Table,
    Mark,
    Standard,
    State,
    AUTHORITY,
    DUTY,
    Department,
    RequestMethod
}