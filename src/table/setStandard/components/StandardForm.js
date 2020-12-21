import React, {Component} from 'react';
import {InputNumber, Input, Table, DatePicker, message} from 'antd';
import {limitDecimals2, limitDecimals3} from '../../../package/Limit';
import * as actionCreators from "../../setStandard/store/actionCreators";
import {deepCopy} from "../../../Helper/Copy";
import {connect} from "react-redux";

class StandardForm extends Component {

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
    }

    handleStartValueChange = (value, indexL)=>{
        const {
            updateNewChangeStartValue,
            newStartValue,
        } = this.props;

        let tempNewStartValue = deepCopy(newStartValue);

        if(value != null){
            tempNewStartValue[indexL] = value;
            updateNewChangeStartValue(tempNewStartValue);
        }

    };

    handleEndValueChange = (value, indexL)=>{
        const {
            updateNewChangeEndValue,
            newEndValue,
        } = this.props;

        let tempNewEndValue = deepCopy(newEndValue);

        if(value != null){
            tempNewEndValue[indexL] = value;
            updateNewChangeEndValue(tempNewEndValue);
        }
    };

    handleReasonChange = (value, indexL)=>{
        const {
            updateNewChangeReason,
            newReason,
        } = this.props;

        let tempNewReason = deepCopy(newReason);

        if(value != null){
            tempNewReason[indexL] = value;
            updateNewChangeReason(tempNewReason);
        }
    };



    //时间选择框响应
    handleTimeChange = (event) => {
        if (!event) {
            return;
        }
        this.setState({
            Time: event
        })

    };

    render() {
        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }
        InputNumber.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        /** 表头**/
        const columns = [
            {
                title: '指标',
                key: 'Item',
                dataIndex: 'Item',
                // fixed: 'left',
                width: '6%'
            },
            {
                title: '原设置人员',
                dataIndex: 'OldPerson',
                key: 'OldPerson',
                width: '6%',//设置的表格长度
            },
            {
                title: '原起始值',
                dataIndex: 'OldStartValue',
                key: 'OldStartValue',
                width: '6%',//设置的表格长度
            },
            {
                title: '原终点值',
                key: 'OldEndValue',
                dataIndex: 'OldEndValue',
                width: '6%',//设置的表格长度
            },
            // {
            //     title: '原生效时间',
            //     key: 'OldTime',
            //     dataIndex: 'OldTime',
            //     width: '12%',
            // },
            {
                title: '原修改原因',
                key: 'OldReason',
                dataIndex: 'OldReason',
                width: '15%',
            },
            {
                title: '新标准起始值',
                key: 'NewStartValue',
                dataIndex: 'NewStartValue',
                width: '8%',
            },
            {
                title: '新终点值',
                key: 'NewEndValue',
                dataIndex: 'NewEndValue',
                width: '8%',//设置的表格长度
            },
            // {
            //     title: '新生效时间',
            //     key: 'NewTime',
            //     dataIndex: 'NewTime',
            //     width: '20%',
            // },
            {
                title: '修改原因',
                key: 'Reason',
                dataIndex: 'Reason',
                width: '20%',
            },
            // {
            //     title: '备注',
            //     key: 'Remark',
            //     dataIndex: 'Remark',
            //     width: '25%',
            // },
        ];

        /**限制输入数值位数的函数**start**/
        // const limitDecimals2 = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        // const limitDecimals3 = (value: string | number): string => {
        //     const reg = /^(\-)*(\d+)\.(\d\d\d).*$/;
        //     if (typeof value === 'string') {
        //         return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
        //     } else if (typeof value === 'number') {
        //         return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
        //     } else {
        //         return ''
        //     }
        // };
        /**限制输入数值位数的函数**end**/

        const dataSource = [];

        const {
            date,tableChose, allItem,oldStartValue,oldEndValue,oldReason,oldUsername,
            newStartValue,newEndValue,newReason,newUsername
        } = this.props;
        const AllItem = deepCopy(allItem);
        console.log("原设置人员")
        console.log(oldUsername)
        console.log(oldStartValue)
        console.log(oldEndValue)
        console.log("原设置人员")
        /**表格数据输入**/
        for (let i = 0; i < AllItem[tableChose].length; i++) {

            dataSource.push(
                {
                    Item: <span>{AllItem[tableChose][i]}</span>,
                    OldPerson: <span>{oldUsername}</span>,
                    OldStartValue: <span>{isNaN(oldStartValue[i]) ? '' : oldStartValue[i]}</span>,
                    OldEndValue: <span>{isNaN(oldEndValue[i]) ? '' :oldEndValue[i]}</span>,
                    //OldTime: this.state.time,
                    OldReason: oldReason[i],
                    NewStartValue: <InputNumber
                        formatter={limitDecimals2}//限制输入数值位数
                        parser={limitDecimals2}//限制输入数值位数
                        value={newStartValue[i]}
                        step={0.01}
                        style={{width: 'auto'}}
                        onChange={event => this.handleStartValueChange(event, i)}
                    />,
                    NewEndValue: <InputNumber
                        formatter={limitDecimals3}//限制输入数值位数
                        parser={limitDecimals3}//限制输入数值位数
                        value={newEndValue[i]}
                        step={0.01}
                        style={{width: 'auto'}}
                        onChange={event => this.handleEndValueChange(event, i)}
                    />,

                    // NewTime: <div>
                    //     <DatePicker showTime={{format: 'HH:mm'}} value={date} format={'YYYY-MM-DD'}
                    //                 onChange={event => this.handleTimeChange(event)}
                    //     />
                    //
                    // </div>
                    // ,
                    Reason: <Input
                        value={newReason[i]}
                        onChange={event => this.handleReasonChange(event.target.value,  i)}
                    />,

                }
            )
        }

        //数据的自动处理显示部分


        return (
            <div>
                {/*表格填写*/}
                <Table columns={columns} bordered dataSource={dataSource} pagination={false}/>

            </div>
        );
    }

}
//定义映射
const mapStateToProps = (state) => {
    return {
        date:state.getIn(['setStandard', 'date']),
        tableChose:state.getIn(['setStandard', 'tableChose']),
        requestFlag:state.getIn(['setStandard', 'requestFlag']),
        person:state.getIn(['setStandard', 'person']),
        allItem:state.getIn(['setStandard', 'allItem']),
        tableNameList:state.getIn(['setStandard', 'tableNameList']),
        oldStartValue:state.getIn(['setStandard', 'oldStartValue']),
        oldEndValue:state.getIn(['setStandard', 'oldEndValue']),
        oldReason:state.getIn(['setStandard', 'oldReason']),
        oldUsername:state.getIn(['setStandard', 'oldUsername']),

        newStartValue:state.getIn(['setStandard', 'newStartValue']),
        newEndValue:state.getIn(['setStandard', 'newEndValue']),
        newReason:state.getIn(['setStandard', 'newReason']),
        newUsername:state.getIn(['setStandard', 'newUsername']),
        //allItem
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        updateNewChange(newStartValue,newEndValue,newReason) {

            dispatch(actionCreators.updateOldData(newStartValue,newEndValue,newReason));
        },

        updateNewChangeStartValue(newStartValue){
            dispatch(actionCreators.updateNewStartValue(newStartValue));
        },

        updateNewChangeEndValue(newEndValue){
            dispatch(actionCreators.updateNewEndValue(newEndValue));
        },

        updateNewChangeReason(newReason){
            dispatch(actionCreators.updateNewReason(newReason));
        }




    }//end return
};

export default connect(mapStateToProps, mapDispathToProps)(StandardForm);

