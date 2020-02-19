import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({
    requestFlag_HYS_RB:true,
    isGetData:false,
    RMA_SHS: [//进厂石灰石的数据
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //表格数据
    RMA_SY: [//进厂砂岩泥数据
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RAO_SHS: [//石灰石原始记录
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RAO_SY: [//砂岩泥原始记录
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RMA_FMHg: [//干煤粉灰
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ], //干煤粉灰
    RMA_TF: [//铁粉
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RMA_FMHs: [//湿煤粉灰
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},

        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RAO_FMHg: [//粉煤灰干原始记录
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RAO_FMHs: [//粉煤灰湿原始记录
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    RAO_TF: [//铁粉原始记录
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],
    CX_CaCO3: [
        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},


        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []},


        {t_data: []}, {t_data: []}, {t_data: []}, {t_data: []}
    ],//仓下石灰石
    date_HYS_RB: moment().format("YYYY-MM-DD"),
    ceshi:[1,2,3],
    CJSHSjunzhi:[],
    CJSYNjunzhi:[],
    CJTFjunzhi:[],
    CJFMHsjunzhi:[],
    CJFMHgjunzhi:[],
    CX_SHS_Average:[],
    CX_FMH_Average:[],
    CX_STF_Average:[],
    CX_SY_Average:[],
    t_name_HYS_RB:"HuayanshiRIbao"
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.UPDATE_DATA_RMA_SHS:
            return state.set('CJSHSjunzhi', action.CJSHSjunzhi);
        case constants.UPDATE_DATA_RAO_SHS_YSJL:
            return state.set('RAO_SHS', action.RAO_SHS);
        case constants.UPDATE_DATA_RMA_SY:
            return state.set('CJSYjunzhi', action.CJSYjunzhi);
        case constants.UPDATE_DATA_RAO_SY_YSJL:
            return state.set('RAO_SY', action.RAO_SY);
        case constants.UPDATE_DATA_RMA_FMHg:
            return state.set('CJFMHgjunzhi', action.CJFMHgjunzhi);
        case constants.UPDATE_DATA_RAO_FMHg_YSJL:
            return state.set('RAO_FMHg', action.RAO_FMHg);
        case constants.UPDATE_DATA_RMA_FMHs:
            return state.set('CJFMHsjunzhi', action.CJFMHsjunzhi);
        case constants.UPDATE_DATA_RAO_FMHs_YSJL:
            return state.set('RAO_FMHs', action.RAO_FMHs);
        case constants.UPDATE_DATA_RMA_TF:
            return state.set('CJTFjunzhi', action.CJTFjunzhi);
        case constants.UPDATE_DATA_RAO_TF_YSJL:
            return state.set('RAO_TF', action.RAO_TF);
        default:
            return state;
    }

}