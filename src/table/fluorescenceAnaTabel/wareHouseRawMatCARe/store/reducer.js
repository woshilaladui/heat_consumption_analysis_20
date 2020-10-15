import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';
import {TableName} from "../../../../Constant/TableNameConstant"
import {deepCopy} from "../../../../Helper/Copy";

const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    requestFlag: true,//是否需要更新数据
    timeChose: 0,//默认0点班
    data: [//定义该页面的数据模板
        {data: []}, {data: []}, {data: []}, {data: []},


        {data: []}, {data: []}, {data: []}, {data: []},


        {data: []}, {data: []}, {data: []}, {data: []},


    ],
    order: [10,11,12],//当前表格需要计算合格率的列数顺序
    startValue: [], //从数据库获取的标准
    endValue: [],
    person: window.localStorage.username, //传入的值班人员
    width:7,
    tableWidth:13,//表格总长度
    tableName: TableName.Limestone_CaCO3,//仓下石灰石
    allTime : [
        ['石灰石','岩砂','粉煤灰(湿)','铁粉'],
        ['石灰石','岩砂','粉煤灰(湿)','铁粉'],
        ['石灰石','岩砂','粉煤灰(湿)','铁粉']
    ]

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_RMC:
            return state.merge({
                'data': action.data,
                'requestFlag': false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_RMC:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_STANDARD_RMC://更新该表的标准
            return state.merge({
                'startValue': action.startValue,
                'endValue': action.endValue
            });

        default:
            return state;
    }


}