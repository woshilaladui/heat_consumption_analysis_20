/**
 *
 *定义常量
 *
 */

const URL={
    //化验室的请求路径
    HUAYS_QUERY:"/api/HuaYS/query",//化验室查询
    HUAYS_CHECK:"/api/HuaYS/check",//化验室检验
    HUAYS_STANDARD : "/api/standard/query",//化验室查询标准
    HUAYS_SAVE :"/api/HuaYS/save",//化验室存储

    HUAYSRB_QUERY:"api/HuaYS/queryDailyNews",//化验室日报数据

    /**
     * 中控室的请求路径
     */
    ZKS_QUERT:"/api/ZhongKS/query",//中控室查询
    ZKS_SAVE:"/api/ZhongKS/save",//中控室存储
}

const Table={
    ALL_TABLE:0,//所以表
    UPPER_TABLE :1,//上表
    BOTTOM_TABLE:2//下表
}

const Mark ={
    SUCCESS :0,
    ERROR:1
}

const Standard ={
    HAVA:1,//有标准
    NONE:0//没有标准

}

const State ={
    IN:1,//在职
    OUT:0//离职
}


//部门
const Department = {
    NONE:0,//无部门
    HuaYS:1,//化验室
    ZhongKS:2,//中控室
    XingZS:3//行政部门
}

//科室
const Section = {
    NONE:0,
    Headquarters:1,//总部科室
    Fluorescence:2,//荧光科室
    Analysis:3,//分析科室
    PhCheck:4//物检科室
}

const Authority ={
    NONE:0,
    Operator:1,//操作员 操作有时限
    Engineer:2,//工程师
    Director:3,//主任
    Manager:4//经理
}

export {
    URL,//请求路径
    Table,//表的类型（如 上表，下表啥的）
    Mark,//标记是否请求成功
    Standard,//标准
    State,//在职状态
    Department,//部门
    Section,//科室
    Authority//权限

}