const JCYCL={//进场原材料 自动计算相关参数
    H2O_averageArg:1,//averageArg为均参，为1
    IL_averageArg:1,
    IL_firstArg:0.77,
    IL_secondArg:1.09, ///averageArg
    SiO2_averageArg:1,
    Al2O3_averageArg:1,
    Fe2O3_averageArg:1,
    CaO_averageArg:1,
    MgO_averageArg:1
}
const CMRYSL={//出磨生料自动计算相关参数
    H2O_averageArg:1,//averageArg为均参，为1
    IL_averageArg:1,
    IL_firstArg:0.77,
    IL_secondArg:1.09, ///averageArg
    SiO2_averageArg:1,
    Al2O3_averageArg:1,
    Fe2O3_averageArg:1,
    CaO_averageArg:1,
    MgO_averageArg:1,
    KH_CaO:1,
    KH_Fe2O3:-0.35,
    KH_Al2O3:-1.65,
    KH_SiO2:2.8,

}
export {
    JCYCL,
    CMRYSL
}