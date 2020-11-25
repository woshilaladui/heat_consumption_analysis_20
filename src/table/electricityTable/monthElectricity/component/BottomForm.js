import React, {Component} from 'react';
import {Input, Table, Button, DatePicker} from 'antd';
import moment from 'moment';
import * as actionCreators from "../store/actionCreators";
import {connect} from "react-redux";
import {deepCopy} from "../../../../Helper/Copy";

const { Column, ColumnGroup } = Table;

class BottomForm extends Component {

    /**点击暂存之后上传当前行的数据到后台**end**/
    render() {
        /**
         *
         * data是页面数据
         *
         * Data 是拷贝data之后的数据
         *
         */
        /**中间八行的数据输入**start**/
        const dataSource = [];
        const {data, person, date} = this.props;
        const Data = deepCopy(data);
        const value = Data['0']['data'];

        let scxj = value[0]-(value[1]+value[2]+value[3]+value[4]+value[5]+value[6]);
        let ylxj = value[7]-(value[8]+value[9]+value[10]+value[11]+value[12]+value[13]+value[14]);

        Input.defaultProps = {
            disabled:!this.props.searchFlag,
            style:this.props.searchFlag ? { } : {opacity:"1", color:"black"}, 
        }

        dataSource.push({
            // key:1,
            TT: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(value[18]) ? null : value[18]}
                    />
                </span>,
            SCXJ: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(scxj) ? null : scxj}
                    />
                </span>,
            WW: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(value[19]) ? null : value[19]}
                    />
                </span>,
            YLXJ: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(ylxj) ? null : ylxj}
                    />
                </span>,
            YYLL: <span>
                    <Input
                        defaultValue={''}
                        value={isNaN(value[20]) ? null : value[20]}
                    />
                </span>,
        })

        /**中间八行的数据输入**end**/

        return (
            <Table bordered pagination={false} dataSource={dataSource}>
                <Column title="窑头" colSpan='1' dataIndex="TT" key="TT" />
                <Column title="烧成车间小计" dataIndex="SCXJ" key="SCXJ" />
                <Column title="窑尾" dataIndex="WW" key="WW" />
                <Column title="生料车间小计" dataIndex="YLXJ" key="YLXJ" />
                <Column title="原料" dataIndex="YYLL" key="YYLL" />
            </Table>
        );
    }

}

//定义映射
const mapStateToProps = (state) => {
    return {
        data: state.getIn(['monthElectricity', 'data']),
        person: state.getIn(['monthElectricity', 'person']),
        tableName: state.getIn(['monthElectricity', 'tableName']),
        searchFlag:state.getIn(['searchTable', 'searchFlag']),
        date: state.getIn(['searchTable', 'date']),
    }
}

const mapDispathToProps = (dispatch) => {
    return {

        updateChange(NewData) {

            dispatch(actionCreators.updateData({data:deepCopy(NewData)}))
        },



        //上表暂存一行数据
        saveToHome(date, index, tableName, data) {


            dispatch(actionCreators.saveData({
                tableType:"",
                date:date,
                index:index,
                tableName:tableName,
                data:data
            }))
        },

    }//end return
}


export default connect(mapStateToProps, mapDispathToProps)(BottomForm);