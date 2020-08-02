import * as constants from './constants';
import {fromJS} from 'immutable';
import moment from 'moment';


const defaultState = fromJS({

    //注意日期格式 2020/2/27 YYYY/MM/DD 为后台识别日期
    date: moment().format("YYYY/MM/DD"),//moment().format("YYYY-MM-DD"),
    phone:'',
    password:'',
    // verificationCode:'',//验证码
    errorMessage: '',
    // verificationPhoto:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1879897701,486067871&fm=26&gp=0.jpg",




});
export default (state = defaultState, action) => {

    switch (action.type) {
        case constants.CHANGE_PHONE_NUM:
            console.log("passsworod")
            console.log(action.data)
            console.log("passsworod")
            return state.merge({
                'phone': action.data,
            });
        case constants.CHANGE_PASSWORD_NUM:
            return state.set('password', action.data);

        default:
            return state;
    }


}