/**
 *
 * 各个表格顺序
 *
 */


const HuaYSOrder_JC ={//化验室进场原材料顺序
    SF:0,
    IL:1,
    SiO2:2,
    Al2O3:3,
    Fe2O3:4,
    CaO:5,
    MgO:6,
    HJ:7
};

const HuaYSOrder_CX ={//仓下原材料顺序
    FuZhuoShui:0,
    BuRongWu:1,
    LL:2,

};


const HuaYSOrder_CMRYSL ={//出磨/入窑洞生料
    SF:0,
    IL:1,
    SiO2:2,
    Al2O3:3,
    Fe2O3:4,
    CaO:5,
    MgO:6,
    HJ:7,
    K2O:8,
    KH:9,
    N:10,
    P:11

};

const HuaYSOrder_RMC = {//出窑熟料全分析汇总表/出厂熟料全分析汇总表

    SJ:0,
    SiO2:1,
    Al2O3:2,
    Fe2O3:3,
    CaO:4,
    MgO:5,
    HJ:6,
    fCaO:7,
    KH:8,
    KH_:9,
    N:10,
    P:11,
    C3S:12,
    C2S:13,
    C3A:14,
    C4AF:15
};

/**
 * 分析表格
 */
//
const AnalysisOrder_YS = {//原材料分析表格原始记录表
    IL:0,
    SiO2:1,
    Al2O3:2,
    Fe2O3:3,
    CaO:4,
    MgO:5,
    SO3:6,
    Na2O:7,
    K2O:8,
    Cl:9
};

const AnalysisOrder_RawMaterial ={//出磨生料分析原始记录 /入窑生料分析原始记录
    IL:0,
    SiO2:1,
    Al2O3:2,
    Fe2O3:3,
    CaO:4,
    MgO:5,
    SO3:6,
    Na2O:7,
    K2O:8,
    CL_:9
};

const AnalysisOrder_UpRipeMaterial = {//出窑熟料化学分析单/出厂熟料化学分析单 上半部分
    IL:0,
    SiO2:1,
    Al2O3:2,
    Fe2O3:3,
    CaO:4,
    MgO:5,
    SO3:6,
    Na2O:7,
    K2O:8,
    CL_:9
};

const AnalysisOrder_DownRipeMaterial = {//出窑熟料化学分析单/出厂熟料化学分析单 下半部分
    KH_:0,
    KH:1,
    N:2,
    P:3,
    C2S:4,
    C3S:5,
    C3A:6,
    C4AF:7
};


/**
 * 中控室表格
 */

const ZhongKSOrder_CMS = {//出磨生料荧光分析及配比记录
    SiO2:2,
    Al2O3:3,
    Fe2O3:4,
    CaO:5,
    MgO:6,
    KH:10,
    SM:11,
    IM:12,
    SHS:0,
    SY:1,
    TF:2,
    FMH:3,
    XD:1,
    SF:3,
};

/**
 * 入窑生料荧光分析及检测记录 表从入窑生料化学分析报告单 中的数据中的下标和荧光分析中原始记录
 * @type {{CaO: number, SF: number, MgO: number, IM: number, SM: number, XD: number, KH: number, SiO2: number, Al2O3: number, Fe2O3: number}}
 */
const ZhongKSOrder_RYS = {//
    SiO2:2,
    Al2O3:3,
    Fe2O3:4,
    CaO:5,
    MgO:6,
    KH:10,
    SM:11,
    IM:12,
    XD:4,
    SF:6,
};

/**
 * 熟料荧光分析及检测记录 从出窑熟料全分析汇总表 和原始记录的下标
 * @type {{SiO2: *}}
 */
const ZhongKSOrder_FAD = {//中控室
    SiO2:1,
    Al2O3:2,
    Fe2O3:3,
    CaO:4,
    MgO:5,
    KH:8,//KH
    SM:10,//N
    IM:11,//P
    LSZ:4,//立升重 荧光原始记录表中
    fCaO:0,
};

const ZhongKSOrder_CRO={//控制室原始记录
    fcao:0,
    CMSL_XD:1,
    CMSL_900K:2,
    CMSL_SF:3,
    RMSL_XD:4,
    RMSL_900K:5,
    RMSL_SF:6,
    MF_XD:7,
    MF_SF:8,

}


export {
    HuaYSOrder_JC,
    HuaYSOrder_CX,
    AnalysisOrder_YS,
    AnalysisOrder_RawMaterial,
    AnalysisOrder_UpRipeMaterial,
    AnalysisOrder_DownRipeMaterial,
    HuaYSOrder_CMRYSL,
    ZhongKSOrder_CMS,
    ZhongKSOrder_RYS,
    ZhongKSOrder_FAD,
    HuaYSOrder_RMC,
    ZhongKSOrder_CRO
}