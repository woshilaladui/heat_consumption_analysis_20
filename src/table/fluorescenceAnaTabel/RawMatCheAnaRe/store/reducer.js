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
    data: [//定义该页面的数据模板 30
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
        {data: []},//0点班的平均
        {data: []},//0点班的合格率

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
        {data: []},//8点班的平均
        {data: []},//8点班的合格率

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
        {data: []},//16点班的平均
        {data: []},//16点班的合格率

    ],
     modelData : [//定义该页面的数据模板 30
        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//0-7小时 0-7行
        {data: []},//0点班的平均
        {data: []},//0点班的合格率

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//8-15小时 12-19行
        {data: []},//8点班的平均
        {data: []},//8点班的合格率

        {data: []}, {data: []}, {data: []}, {data: []},
        {data: []}, {data: []}, {data: []}, {data: []},//16-23小时 24-31行
        {data: []},//16点班的平均
        {data: []},//16点班的合格率

    ],
    order: [2, 5, 6],//当前表格需要计算合格率的列数顺序
    startValue: [], //从数据库获取的标准
    endValue: [],
    person: window.localStorage.username, //传入的值班人员
    width:7,//需要计算合计的长度
    tableWidth:7,//表格总长度
    tableName: TableName.Limestone_SHS,//进厂石灰石原材料分析化学报告单
    allTime:[
        ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
        ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    ],

});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.UPDATE_DATA_RMA_SHS:
            // console.log("执行了Raw")
            // console.log(deepCopy(action.data))
            // console.log(action.data)
            // console.log("执行了Raw石灰石")

            return state.merge({
                'data': action.data,
                'requestFlag': false//切换页面时候不需要刷新数据了（当页面刷新的时候自动初始化为true）
            });
        case constants.CHANGE_TIME_CHOSE_RMA_SHS:
            return state.set('timeChose', action.timeChose);

        case constants.UPDATE_STANDARD_RMA_SHS://更新该表的标准
            return state.merge({
                'startValue': action.startValue,
                'endValue': action.endValue
            });

        default:
            return state;
    }


}