import * as constants from './constants';

import {
    requestGetAllUsers
} from "../../../http/request/RequestUser";

import {Mark} from "../../../http/constant/Constant";


export const updateData = ({user}) => ({
    type: constants.UPDATE_DATA_STAFF,
    user: user
});

const updateDataUserInformationVisible = (userInformationVisible) => ({
    type: constants.UPDATE_DATA_USER_INF_VISIBLE,
    userInformationVisible:userInformationVisible
});

const updateDataUserCreateVisible = (userCreateVisible) => ({
    type: constants.UPDATE_DATA_USER_CREATE_VISIBLE,
    userCreateVisible:userCreateVisible
});

const setUserInformation = ({presentUser}) => ({
    type: constants.SET_USER_INFORMATION,
    presentUser:presentUser
});

export const doSetUserInformation = (presentUser)=>{

    return(dispatch)=>{

        dispatch(setUserInformation({presentUser:presentUser}));

    }

};

export const changeDataUserInformationVisible = (userInformationVisible) =>{

    return(dispatch)=>{

        if(userInformationVisible){
            dispatch(updateDataUserInformationVisible(false));
        }else {
            dispatch(updateDataUserInformationVisible(true));
        }

    }
};

export const changeDataUserCreateVisible = (userCreateVisible) =>{

    return(dispatch)=>{

        if(userCreateVisible){
            dispatch(updateDataUserCreateVisible(false));
        }else {
            dispatch(updateDataUserCreateVisible(true));
        }

    }
};

export const updataList = (dutyList,stateList,departmentList,typeList)=>({
    type:constants.INIT_TABLE,
    dutyList:dutyList,
    stateList:stateList,
    departmentList:departmentList,
    typeList:typeList
});

export const initTable = () =>{

    return (dispatch) => {
        let dutyList = new Array(100);
        let stateList = new Array(10);
        let departmentList = new Array(10);
        let typeList = new Array(10);

        dutyList[0] = '无';
        dutyList[1] = '中控室主任';
        dutyList[2] = '总工程师';
        dutyList[3] = '化验室主任';
        dutyList[50] = '中控室操作员';
        dutyList[51] = '实地操作员';
        dutyList[61] = '化验室荧光分析员';
        dutyList[62] = '化验室荧光控制员';
        dutyList[71] = '化验室分析员';
        dutyList[72] = '化验室物检员';

        stateList[0] = '离职';
        stateList[1] = '在岗';

        departmentList[0] = '无';
        departmentList[1] = '化验室';
        departmentList[2] = '中控室';
        departmentList[3] = '行政部门';

        typeList[0] = '无';
        typeList[1] = '总经理';
        typeList[2] = '部门经理';
        typeList[3] = '员工';

        dispatch(updataList(dutyList,stateList,departmentList,typeList));
    }



};


export const getData = () => {
    return (dispatch) => {

        requestGetAllUsers()
            .then((response)=>{

                if(response['code'] === Mark.SUCCESS){

                    console.log("user user user");
                    console.log(response['data']);
                    console.log(response['data']['user']);
                    console.log("user user user");
                    dispatch(
                        updateData(
                                {user:response['data']['user']}
                            )
                    );

                }

        });//end requestGetAllUsers

        // requestGetHuaYanShiDataByTableNameAndDate(
        //     date,
        //     tableName,
        //     data
        // ).then((response) => {
        //
        //     if(response['code'] === 0){
        //         //解析处理数据
        //         //解析数据
        //         let newData = deepCopy(response['data']);
        //         let result = HuaYanShiFormat(
        //             data,
        //             newData,
        //             tableName
        //         );
        //
        //         dispatch(updateData({//将获取到的数据进行转发
        //             data: result[0]
        //         }));
        //
        //         //更新标准
        //         dispatch(updateStandard(result[1], result[2]));
        //     }
        //
        //
        //
        // });//end requestGetHuaYanShiDataByTableNameAndDate
    }
};//end getData


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
//
//
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
//             if(response['code'] === Mark.SUCCESS){
//                 message.info('提交成功');
//             }else {
//                 message.info('存放失败');
//             }
//
//
//
//             //更新数据
//             if (tableType === Table.UPPER_TABLE) {//上表
//                 if (num === 1)//存一行数据的时候只修改该行的操作者
//                     updateOperator({
//                         data: data,
//                         index: index,
//                         num:num
//                     });
//                 else//为总体提交的时候则当该行数据不为空的时候提交数据
//                     updateOperator({
//                         data: data,
//                         num: 30
//                     });//该表有30行数据
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
